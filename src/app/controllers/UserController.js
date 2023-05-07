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

            const name = req.body.nameRegistro;
            const email = req.body.emailRegistro;
            const password = req.body.passwordRegistro;

            const salt = bcryptjs.genSaltSync();

            const user = {
                "name": name,
                "email": email,
                "password": bcryptjs.hashSync(password, salt)
            };

            const exist = await User.findOne({
                "email": email
            });

            if (exist) {
                return res.status(403).send()
            };

            //Enviar o cadastro de contas para uma fila
            const queue = await Queue.add({ user })
            return res.status(200).send(user);
        } catch (err) {
            return res.status(402).send();
        }
    },
    async login(req, res) {
        if (req.body.emailLogin == '' || req.body.passwordLogin == '' || req.body.emailLogin == null || req.body.passwordLogin == null) {
            return res.status(401).send();
        }
        const email = req.body.emailLogin;
        const password = req.body.passwordLogin;

        const usersFromCache = await Redis.get("getAllUsers");
        if (usersFromCache){
            const userCache = JSON.parse(usersFromCache);
            return res.status(200).send(userCache.find(perfil => perfil.email == email && bcryptjs.compareSync(password, perfil.password)));
        }

        const user = await User.findOne({
            "email": email
        });

        if (bcryptjs.compareSync(password, user.password)) {
            return res.status(200).send(user);
        }
        return res.status(402).send();

    },
    async consulta(req, res) {
        if (req.body.nameConsulta == '' || req.body.nameConsulta == null) {
            return res.status(401).send();
        }

        const name = req.body.nameConsulta;

        const usersFromCache = await Redis.get("getAllUsers");
        if (usersFromCache){
            const userCache = JSON.parse(usersFromCache);
            var arr = [];
            for(var i=0; i<userCache.length; i++) {
                if(userCache[i].name === name) {
                    arr.push(userCache[i]);
                }
            }
            return res.status(200).send(arr);
        }

        const user = await User.find({
            "name": name
        });
        if (user.length > 0) {
            return res.status(200).send(user);
        }
        return res.status(402).send();
    }
};
