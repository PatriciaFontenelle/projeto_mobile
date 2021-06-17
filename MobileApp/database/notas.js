import * as SecureStore from 'expo-secure-store';
import { SERVER_URL } from '../Funcs/Constants';

const getToken = async () => {
    const token = await SecureStore.getItemAsync('token');
    return token;
}

export default class AlunoDisciplinaRepository {
    async Cadastrar(nota, callback) {
        const token = await getToken();
        return fetch(SERVER_URL + 'nota', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify(nota)
        })
            .then((res) => res.json())
            .then((json) => {
                callback(json.error, json.result)
            })
            .catch((e) => {
                callback({}, e)
            })
    }

    async getNota(data, callback) {
        const token = await getToken();
        return fetch(SERVER_URL + 'nota', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                "x-access-token": token,
                "x-data": JSON.stringify(data)
            },
        })
            .then((res) => res.json())
            .then((json) => {
                callback(json.error, json.result)
            })
            .catch((e) => {
                callback({}, e)
            })
    }

    async RetrieveAll(callback) {
        const token = await getToken();
        return fetch(SERVER_URL + 'disciplina', {
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
                callback({}, e)
            })
    }

    async Delete(discilplina, callback) {
        const token = await getToken();
        return fetch(SERVER_URL + 'disciplina', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                "Content-type": 'application/json',
                "x-access-token": token,
                "x-disciplina-id": discilplina
            }
        })
            .then((res) => res.json())
            .then((json) => {
                console.log("Json");
                console.log(json)
                callback(json.error, json.result)
            })
            .catch((e) => {
                console.log('Erroou!')
                console.log(e)
                callback({}, e)
            })
    }

    async Update(disciplina, callback) {
        const token = await getToken();
        return fetch(SERVER_URL + 'disciplinaUpdate', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-type": 'application/json',
                "x-access-token": token,
            },
            body: JSON.stringify(disciplina)
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json)
                callback(json.error, json.result)
            })
            .catch((e) => {
                console.log(e)
                callback({}, e)
            })
    }
}