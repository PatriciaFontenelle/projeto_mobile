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

        console.log('Token');
        console.log(token)

        jwt.verify(token, SECRET, function (err, decoded) {
            if(err) {
                console.log("Deu ruim");
                console.log(err)
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
            console.log('dsidhiubxhuhsfbuiaxheiueahfiuabhfiuo')
            this.Authenticate(req, (authResult) => {
                console.log(authResult)
                if(!authResult.auth) {
                    return res.status(401).send({ error: authResult.message, result: null })
                }
                repository.Save(req.body.aluno, (error, result) => {
                    if(error) {
                        console.log(error)
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
                    console.log(error)
                    return res.status(500).send({error: error, result: null});
                }
                return res.status(201).send({ error: null, result})
            })
        })

        //EXCLUIR ALUNO
        server.delete('/aluno', (req, res) => {
            this.Authenticate(req, (authResult) => {
                console.log(authResult)
                if(!authResult.auth){
                    return res.status(401).send({ error: authResult.message, result: null })
                }
            })
            repository.Delete(req.headers["x-student-id"], (error, result) => {
                if(error) {
                    console.log('deu ruiiiim')
                    console.log(error)
                    return res.status(500).send({error: error, result: null});
                }
                console.log("Result")
                console.log(result)
                return res.status(201).send({ error: null, result})
            })
        })

        //EDITAR CADASTRO ALUNO
        server.post('/alunoUpdate', (req, res) => {
            console.log("Testeee2")
            this.Authenticate(req, (authResult) => {
                console.log("Testeeee1")
                if(!authResult.auth){
                    return res.status(401).send({ error: authResult.message, result: null })
                }
            })
            console.log("Testeeee3")
            console.log(req.body.name)
            console.log(req.body.last_name)
            console.log(req.body._id)
            console.log(req.body.email)
            repository.Update(req.body, (error, result) => {
                console.log('req.')
                if(error) {
                    console.log(error)
                    return res.status(500).send({error: error, result: null});
                }
                return res.status(201).send({ error: null, result})
            })
        })
    }
}