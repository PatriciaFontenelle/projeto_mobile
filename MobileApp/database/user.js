import { SERVER_URL } from "../Funcs/Constants";

export default class UserRepository {
    Authenticate(token, callback) {
        return fetch(SERVER_URL + 'auth', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'x-access-token': token
            }
        })
        .then((res) => res.json())
        .then((json) => {
            callback(json.error, json.result);
        })
        .catch((e) => {
            callback(e, null)
        })
    }
    Login(email, password, callback) {
        return fetch( SERVER_URL + 'login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then((res) => res.json())
        .then((json) => {
            callback(json.error, json.result);
        })
        .catch((e) => {
            callback(e, null)
        })
    }

    Save(user, callback) {
        return fetch( SERVER_URL + 'users', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
        .then(() => {
            callback(json.error, json.result);
        })
        .catch((e) => {
            callback(e, null)
        })
    }

    EmailIsRegistered(email, callback) {
        return fetch(SERVER_URL + 'users', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'x-mail': email
            }
        })
        .then((res) => res.json())
        .then((json) => {
            callback(json.error, json.result);
        })
        .catch((e) => {
            callback(e, null)
        })
    }
}