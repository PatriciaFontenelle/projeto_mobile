import SQLite from 'react-native-sqlite-storage';
import {Alert} from 'react-native'

let db;

export const cadastrar_aluno = (data, onSuccess, onError) => {
    const query = 'INSERT INTO aluno (name, last_name, email, id, birth_date) VALUES (?, ?, ?, ?, ?)';
    const params = [data.nome, data.sobrenome, data.email, data.matricula, data.dataNascimento];
    runQuery(query, params, onSuccess, onError);
}

export const consultar_aluno = (id, onSuccess, onError) => {
    const query = 'SELECT * FROM aluno WHERE id = ?';
    const params = [id];
    runQuery(query, params, onSuccess, onError);
}

export const listar_alunos = (onSuccess, onError) => {
    const query = 'SELECT * FROM aluno';
    const params = [];
    runQuery(query, params, onSuccess, onError);
}

export const editar_aluno = (aluno, onSuccess, onError) => {
    const query = 'UPDATE aluno SET name=?, last_name=?, email=?, birth_date=? WHERE id=?';
    const params = [aluno.nome, aluno.sobrenome, aluno.email, aluno.dataNascimento, aluno.matricula];

    runQuery(query, params, onSuccess, onError);
}

export const deletar_aluno = (id, onSuccess, onError) => {
    const query = 'DELETE FROM aluno WHERE id=?';
    const params = [id];
    runQuery(query, params, onSuccess, onError);
}

function runQuery(query, params, onSuccess, onError) {
    debugger;
    const open = () => {
        db.transaction((tx) => {
            console.log('teste')
            tx.executeSql('CREATE TABLE IF NOT EXISTS aluno(id PRIMARY KEY, name VARCHAR(100), last_name VARCHAR(100), email VARCHAR(100), birth_date VARCHAR(10))', [], () => { console.log('Criou') }, (e) => { console.log('Erro: ' + e.message) })
            tx.executeSql(query,
                params,
                onSuccess,
                onError)
        })
    }

    db = SQLite.openDatabase({ name: 'mobile_db.db', createFromLocation: 1 }, open, (error) => { console.log(error) });
    
}