import SECRET from "../infra/Secret.js";
import jwt from "jsonwebtoken";

export default class AlunoDisciplinaController {
    Authenticate(req, callback) {
        const token = req.headers["x-access-token"];
        
        if(!token) {
            return callback({
                auth: false, 
                message: "Nenhum token informado!"
            });
        }

        jwt.verify(token, SECRET, function (err, decoded) {
            if(err) {
                return callback({
                    auth: false,
                    message: "Token inválido!"
                })
            }

            callback({
                auth: true,
                message: ""
            })
        })
    }

    Init(server, repository){
        //CADASTRAR UMA NOTA
        server.post('/nota', (req, res) => {
            this.Authenticate(req, (authResult) => {
                if(!authResult.auth) {
                    return res.status(401).send({ error: authResult.message, result: null })
                }
                repository.Save(req.body, (error, result) => {
                    if(error) {
                        return res.status(500).send({error: error, result: null});
                    }
                    return res.status(201).send({error: null, result: result})
                })
            })
            
        })

        //CARREGAR NOTA
        server.get('/nota', (req, res) => {
            this.Authenticate(req, (authResult) => {
                if(!authResult.auth) {
                    return res.status(401).send({ error: authResult.message, result: null })
                }
            })
            repository.Get(JSON.parse(req.headers["x-data"]), (error, result) => {
                if(error) {
                    return res.status(500).send({error: error, result: null});
                }
                return res.status(201).send({ error: null, result})
            })
        })

        //EXCLUIR NOTA
        server.delete('/nota', (req, res) => {
            this.Authenticate(req, (authResult) => {
                if(!authResult.auth){
                    return res.status(401).send({ error: authResult.message, result: null })
                }
            })
            repository.Delete(req.headers["x-id"], (error, result) => {
                if(error) {
                    return res.status(500).send({error: error, result: null});
                }
                return res.status(201).send({ error: null, result})
            })
        })

        //EDITAR CADASTRO NOTA
        server.post('/notaUpdate', (req, res) => {
            this.Authenticate(req, (authResult) => {
                if(!authResult.auth){
                    return res.status(401).send({ error: authResult.message, result: null })
                }
            })
            repository.Update(req.body, (error, result) => {
                if(error) {
                    return res.status(500).send({error: error, result: null});
                }
                return res.status(201).send({ error: null, result})
            })
        })

    }
}