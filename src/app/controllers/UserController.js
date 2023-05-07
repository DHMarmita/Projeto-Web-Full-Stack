import Queue from '../lib/Queue';
import Redis from '../lib/Redis';
import User from '../model/user';
import bcryptjs from 'bcryptjs';

export default {
    async store(req, res) {
        try {
            //const {name, email, password} = req.body
            //const user = {name, email, password}

            if (req.body.nameRegistro == '' || req.body.emailRegistro == '' || req.body.passwordRegistro == '' || req.body.nameRegistro == null || req.body.emailRegistro == null || req.body.passwordRegistro == null) {
                return res.status(401).send();
            }

            await Redis.set("name", req.body.nameRegistro);
            await Redis.set("email", req.body.emailRegistro);
            await Redis.set("password", req.body.passwordRegistro);

            const salt = bcryptjs.genSaltSync();

            const user = {
                "name": await Redis.get("name"),
                "email": await Redis.get("email"),
                "password": bcryptjs.hashSync(await Redis.get("password"), salt)
            };

            const exist = await User.findOne({
                email: await Redis.get("email")
            });

            if (exist) {
                return res.status(403).send()
            };

            //Enviar o cadastro de contas para uma fila
            const queue = await Queue.add({ user })
            return res.status(200).send({ user });
        } catch (err) {
            return res.status(402).send();
        }
    },
    async login(req, res) {
        if (req.body.emailLogin == '' || req.body.passwordLogin == '' || req.body.emailLogin == null || req.body.passwordLogin == null) {
            return res.status(401).send();
        }
        await Redis.set("email", req.body.emailLogin);
        await Redis.set("password", req.body.passwordLogin);

        const user = await User.findOne({
            email: await Redis.get("email")
        });
        if (bcryptjs.compareSync(await Redis.get("password"), user.password)) {
            return res.status(200).send({ user });
        }
        return res.status(402).send();

    },
    async consulta(req, res) {
        if (req.body.nameConsulta == '' || req.body.nameConsulta == null) {
            return res.status(401).send();
        }

        await Redis.set("name", req.body.nameConsulta);

        const user = await User.find({
            name: await Redis.get("name")
        });
        if (user.length > 0) {
            return res.status(200).send({ user });
        }
        return res.status(402).send();
    }
};
