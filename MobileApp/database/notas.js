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
                callback(e, null)
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
                callback(e, null)
            })
    }

    async Delete(nota, callback) {
        const token = await getToken();
        return fetch(SERVER_URL + 'nota', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                "Content-type": 'application/json',
                "x-access-token": token,
                "x-id": nota
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

    async Update(nota, callback) {
        const token = await getToken();
        return fetch(SERVER_URL + 'notaUpdate', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-type": 'application/json',
                "x-access-token": token,
            },
            body: JSON.stringify(nota)
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