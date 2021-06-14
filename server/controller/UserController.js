import bcrypt from 'bcryptjs';
import { response } from 'express';
import jwt from 'jsonwebtoken';
import SECRET from '../infra/Secret.js';

export default class UserController {
    Init(server, repository) {
        server.post("/login", (req, res) => {
            repository.FindByEmail(req.body.email, (error, user) => {
                if(error) {
                    console.log('Erro 1:' + error);
                    return res.status(500).send({});
                }

                if(!user) {
                    console.log('Erro 2')
                    return res.status(401).send({ auth: false, token: null })
                }

                const passwordIsValid = req.body.password === user.password;

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
            repository.Save(req.body, (error, result) => {
                if(error) {
                    console.log(error);
                    return res.status(500).send({});
                }
                return res.status(201).send({})
            });
        });

        return "";
    }
}