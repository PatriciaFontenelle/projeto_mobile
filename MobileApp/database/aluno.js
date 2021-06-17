import * as SecureStore from 'expo-secure-store';
import { SERVER_URL } from '../Funcs/Constants';

const getToken = async () => {
    const token = await SecureStore.getItemAsync('token');
    return token;
}

export default class AlunoRepository {
    async Cadastrar(aluno, callback) {
        const token = await getToken();
        return fetch(SERVER_URL + 'aluno', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({
                aluno
            })
        })
        .then((res) => res.json())
        .then((json) => {
            callback(json.error, json.result)
        })
        .catch((e) => {
            callback(e, null)
        })
    }

    async RetrieveAll(callback) {
        const token = await getToken();
        return fetch(SERVER_URL + 'aluno', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-type": 'application/json',
                "x-access-token": token
            }
        })
        .then((res) => res.json())
        .then((json) => {
            callback(json.error, json.result)
        })
        .catch((e) => {
            callback(e, null)
        })
    }

    async Delete(aluno, callback) {
        const token = await getToken();
        return fetch(SERVER_URL + 'aluno', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                "Content-type": 'application/json',
                "x-access-token": token,
                "x-student-id": aluno
            }
        })
            .then((res) => res.json())
            .then((json) => {
                callback(json.error, json.result)
            })
            .catch((e) => {
                callback(e, null)
            })
    }

    async Update(aluno, callback) {
        const token = await getToken();
        return fetch(SERVER_URL + 'alunoUpdate', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-type": 'application/json',
                "x-access-token": token,
            },
            body: JSON.stringify(aluno)
        })
            .then((res) => res.json())
            .then((json) => {
                callback(json.error, json.result)
            })
            .catch((e) => {
                callback(e, null)
            })
    }
    
}