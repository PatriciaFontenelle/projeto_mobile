export default class AlunoRepository {
    Cadastrar(aluno, callback) {
        return fetch('http://10.0.2.2:8080/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                aluno
            })
        })
        .then((res) => res.json())
        .then((json) => {
            callback(json, '')
        })
        .catch((e) => {
            callback({}, e)
        })
    }
}