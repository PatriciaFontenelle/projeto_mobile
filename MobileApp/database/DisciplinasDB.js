import SQLite from 'react-native-sqlite-storage';
import { Alert } from 'react-native'

let db;

export const cadastrar_disciplina = (data, onSuccess, onError) => {
    const query = 'INSERT INTO disciplina (name, teacher_name) VALUES (?, ?)';
    const params = [data.nome, data.professor];
    runQuery(query, params, onSuccess, onError);
}

export const consultar_disciplina = (id, onSuccess, onError) => {
    const query = 'SELECT * FROM disciplina WHERE id = ?';
    const params = [id];
    runQuery(query, params, onSuccess, onError);
}

export const listar_disciplinas = (onSuccess, onError) => {
    const query = 'SELECT * FROM disciplina';
    const params = [];
    runQuery(query, params, onSuccess, onError);
}

export const editar_disciplina = (disciplina, onSuccess, onError) => {
    const query = 'UPDATE disciplina SET name=?, teacher_name=? WHERE id=?';
    const params = [disciplina.nome, disciplina.professor, disciplina.id];

    runQuery(query, params, onSuccess, onError);
}

export const deletar_disciplina = (id, onSuccess, onError) => {
    const query = 'DELETE FROM disciplina WHERE id=?';
    const params = [id];
    runQuery(query, params, onSuccess, onError);
}

function runQuery(query, params, onSuccess, onError) {
    debugger;
    const open = () => {
        db.transaction((tx) => {
            console.log('teste')
            tx.executeSql('CREATE TABLE IF NOT EXISTS disciplina(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), teacher_name VARCHAR(100))', [], () => { console.log('Criou') }, (e) => { console.log('Erro: ' + e.message) })
            tx.executeSql(query,
                params,
                onSuccess,
                onError)
        })
    }

    db = SQLite.openDatabase({ name: 'mobile_db.db', createFromLocation: 1 }, open, (error) => { console.log(error) });

}