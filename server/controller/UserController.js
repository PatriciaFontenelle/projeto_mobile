import bcrypt from 'bcryptjs';
import { response } from 'express';
import jwt from 'jsonwebtoken';
import SECRET from '../infra/Secret.js';

export default class UserController {
    Init(server, repository) {
        server.post("/auth", (req, res) => {
            const token = req.headers["x-access-token"];
            
            if(!token) {
                return res.status(500).send({
                    auth: false, 
                    message: "Nenhum token informado!"
                });
            }
    
            console.log('Token');
            console.log(token)
    
            jwt.verify(token, SECRET, function (err, decoded) {
                if(err) {
                    console.log("Deu ruim");
                    console.log(err)
                    
                    return res.status(401).send({
                        auth: false, 
                        message: "Token inválido!"
                    });
                }
    
                res.status(200).send({ auth: true, token: token })
            })
        })
        server.post("/login", (req, res) => {
            console.log("hdeuhdeuhdude");
            console.log(req.body.email);
            console.log("req");
            console.log(req.body)
            repository.FindByEmail(req.body.email, (error, user) => {
                if(error) {
                    console.log('Erro 1:' + error);
                    return res.status(500).send({});
                }
                
                console.log(user)

                if(!user) {
                    console.log('Erro 2')
                    return res.status(401).send({ auth: false, token: null })
                }
                console.log(user.password);
                console.log(req.body.password)
                const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                console.log(passwordIsValid)

                if(!passwordIsValid) {
                    console.log('Erro 2')
                    return res.status(401).send({ auth: false, token: null })
                }

                const token = jwt.sign({id: user._id}, SECRET, {
                    expiresIn: 86400,
                })

                console.log(user)
                res.status(200).send({ auth: true, token: token })
            });
        });

        server.post("/users", (req, res) => {
            console.log('lllllllll')
            const user = req.body;

            const newPassword = bcrypt.hashSync(user.password, 10);

            user.password = newPassword;

            repository.Save(user, (error, result) => {
                console.log('User');
                console.log(user)
                if(error) {
                    console.log(error);
                    return res.status(500).send({error});
                }
                return res.status(201).send({result})
            });
        });

        server.get("/users", (req, res) => {
            console.log('jnjnjnjknjknnj')
            const email = req.headers['x-mail'];
            console.log('Email: ');
            console.log(email)
            repository.FindByEmail(email, (error, result)=> {
                if(error) {
                    console.log(error);
                    return res.status(500).send({error: error, result: null})
                }
                console.log('Teste');
                console.log(result);
                return res.status(201).send({ error: null, result})
            })
        })

        return "";
    }
}