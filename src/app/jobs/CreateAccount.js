import User from '../model/user';
import Redis from '../lib/Redis';


export default{
    key: 'CreateAccount',
    async handle({ data }){
        try {
            await User.create(data.user);

            const users = await User.find();
            await Redis.set("getAllUsers", (JSON.stringify(users)));

            console.log("Conta Criada com Sucesso!");
        }catch(err){
            console.log("Erro ao criar a conta!");
            console.log(err);
        }
    }
}