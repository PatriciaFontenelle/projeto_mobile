import SQLite from 'react-native-sqlite-storage';


export const editar_nota = (data, onSuccess, onError) => {
    const query = 'UPDATE nota SET av1=?, av2=?, av3=? WHERE aluno_id=? AND disciplina_id=?'
    const params = [data.av1, data.av2, data.av3, data.aluno_id, data.disciplina_id]

    runQuery(query, params, onSuccess, onError);
}

export const lancar_nota = (data, onSuccess, onError) => {
    const query = 'INSERT INTO nota (aluno_id, disciplina_id, av1, av2, av3) VALUES (?,?,?,?,?)'
    const params = [data.aluno_id, data.disciplina_id, data.av1, data.av2, data.av3]
    
    runQuery(query, params, onSuccess, onError);
}

export const consultar_nota = (aluno_id, disciplina_id, onSuccess, onError) => {
    const query = 'SELECT * FROM nota WHERE aluno_id = ? AND disciplina_id = ?';
    const params = [aluno_id, disciplina_id]

    runQuery(query, params, onSuccess, onError)
}

function runQuery(query, params, onSuccess, onError) {
    debugger;
    const open = () => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS aluno(id PRIMARY KEY, name VARCHAR(100), last_name VARCHAR(100), email VARCHAR(100), birth_date VARCHAR(10))', [], () => { }, (e) => { console.log('Erro: ' + e.message) })
            tx.executeSql('CREATE TABLE IF NOT EXISTS disciplina(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), teacher_name VARCHAR(100))', [], () => {}, (e) => { console.log('Erro: ' + e.message) })
            tx.executeSql('CREATE TABLE IF NOT EXISTS nota(id INTEGER PRIMARY KEY AUTOINCREMENT, aluno_id VARCHAR(8), disciplina_id INTEGER, av1 REAL, av2 REAL, av3 REAL, FOREIGN KEY(aluno_id) REFERENCES aluno(id), FOREIGN KEY(disciplina_id) REFERENCES disciplina(id))', [], () => {}, (e) => { console.log('Erro: ' + e.message) })
            tx.executeSql(query,
                params,
                onSuccess,
                onError)
        })
    }

    const db = SQLite.openDatabase({ name: 'mobile_db.db', createFromLocation: 1 }, open, (error) => { console.log(error) });

}