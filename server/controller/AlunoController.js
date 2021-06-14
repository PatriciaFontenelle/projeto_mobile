export default class AlunoController {
    Init(server, repository) {
        server.post('/cadastroAluno', (req, res) => {
            repository.Save(req.body.aluno, (error, result) => {
                if(error) {
                    return res.status(500).send({});
                }
                return res.status(201).send({})
            })
        })
    }
}