import SECRET from "../infra/Secret.js";
import jwt from "jsonwebtoken";

export default class DisciplinaController {
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
        //CADASTRAR UMA DISCIPLINA
        server.post('/disciplina', (req, res) => {
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

        //CARREGAR TODOS AS DISCIPLINAS
        server.get('/disciplina', (req, res) => {
            this.Authenticate(req, (authResult) => {
                if(!authResult.auth) {
                    return res.status(401).send({ error: authResult.message, result: null })
                }
            })
            repository.GetAll((error, result) => {
                if(error) {
                    return res.status(500).send({error: error, result: null});
                }
                return res.status(201).send({ error: null, result})
            })
        })

        //EXCLUIR DISCIPLINA
        server.delete('/disciplina', (req, res) => {
            this.Authenticate(req, (authResult) => {
                if(!authResult.auth){
                    return res.status(401).send({ error: authResult.message, result: null })
                }
            })
            repository.Delete(req.headers["x-disciplina-id"], (error, result) => {
                if(error) {
                    return res.status(500).send({error: error, result: null});
                }
                return res.status(201).send({ error: null, result})
            })
        })

        //EDITAR CADASTRO DISCIPLINA
        server.post('/disciplinaUpdate', (req, res) => {
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