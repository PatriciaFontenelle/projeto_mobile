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

            jwt.verify(token, SECRET, function (err, decoded) {
                if(err) {
                    return res.status(401).send({
                        auth: false, 
                        message: "Token inválido!"
                    });
                }
    
                res.status(200).send({ auth: true, token: token })
            })
        })
        server.post("/login", (req, res) => {
            repository.FindByEmail(req.body.email, (error, user) => {
                if(error) {
                    return res.status(500).send({});
                }
       
                if(!user) {
                    return res.status(401).send({ auth: false, token: null })
                }
                const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

                if(!passwordIsValid) {
                    return res.status(401).send({ auth: false, token: null })
                }

                const token = jwt.sign({id: user._id}, SECRET, {
                    expiresIn: 86400,
                })

                res.status(200).send({ auth: true, token: token })
            });
        });

        server.post("/users", (req, res) => {
            const user = req.body;

            const newPassword = bcrypt.hashSync(user.password, 10);

            user.password = newPassword;

            repository.Save(user, (error, result) => {
                if(error) {
                    return res.status(500).send({error: error, result: null});
                }
                return res.status(201).send({ error: null, result: result})
            });
        });

        server.get("/users", (req, res) => {
            const email = req.headers['x-mail'];
            repository.FindByEmail(email, (error, result)=> {
                if(error) {
                    return res.status(500).send({error: error, result: null})
                }
                return res.status(201).send({ error: null, result})
            })
        })

        return "";
    }
}