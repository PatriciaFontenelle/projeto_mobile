export default class UserTeste {
    Login(email, password, callback) {
        return fetch('http://10.0.2.2:8080/login', {
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
            callback(json, '')
        })
        .catch((e) => {
            callback({}, e)
        })
    }

    Save(user, onSuccess, onError) {
        return fetch('http://10.0.2.2:8080/users', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
        .then(() => {
            onSuccess()
        })
        .catch((e) => {
            alert(JSON.stringify(e));
            onError(e);
        })
    }
}