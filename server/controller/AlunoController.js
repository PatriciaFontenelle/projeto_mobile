import SECRET from "../infra/Secret.js";
import jwt from "jsonwebtoken";

export default class AlunoController {
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

    Init(server, repository) {
        //CADASTRAR UM ALUNO
        server.post('/aluno', (req, res) => {
            this.Authenticate(req, (authResult) => {
                if(!authResult.auth) {
                    return res.status(401).send({ error: authResult.message, result: null })
                }
                repository.Save(req.body.aluno, (error, result) => {
                    if(error) {
                        return res.status(500).send({error: error, result: null});
                    }
                    return res.status(201).send({error: null, result: result})
                })
            })
            
        })

        //CARREGAR TODOS OS ALUNOS
        server.get('/aluno', (req, res) => {
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

        //EXCLUIR ALUNO
        server.delete('/aluno', (req, res) => {
            this.Authenticate(req, (authResult) => {
                if(!authResult.auth){
                    return res.status(401).send({ error: authResult.message, result: null })
                }
            })
            repository.Delete(req.headers["x-student-id"], (error, result) => {
                if(error) {
                    return res.status(500).send({error: error, result: null});
                }
                return res.status(201).send({ error: null, result})
            })
        })

        //EDITAR CADASTRO ALUNO
        server.post('/alunoUpdate', (req, res) => {
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