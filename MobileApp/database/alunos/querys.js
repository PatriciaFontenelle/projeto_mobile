import SQLite from 'react-native-sqlite-storage';

let db;

export const create_student = (data) => {
    console.log(data.nome)
    console.log(data.sobrenome)
    console.log(data.email)
    console.log(data.matricula)
    console.log(data.dataNascimento)
    debugger;
    const open = () => {
        alert('success')
        db.transaction((tx) => {
            console.log('teste')
            tx.executeSql('SELECT * FROM ALUNO',
                [],
                (tx, results) => {
                    console.log('teste2')
                    if (results.rows.lenght > 0) {
                        console.log('teste3')
                    }
                },
                (err) => {
                    console.log(err)
                })
        })
    }

    db = SQLite.openDatabase({ name: 'mobile', createFromLocation: '~mobile_db.db' },open, (error) => {console.log(error)});

    
    // db.transaction(function (tx) {
    //     tx.executeSql(
    //         'INSERT INTO ALUNO (name, last_name, email, id, birth_date) VALUES (?, ?, ?, ?, ?)',
    //         [data.nome, data.sobrenome, data.email, data.matricula, data.dataNascimento],
    //         (tx, results) => {
    //             console.log('Results', results.rowsAffected);
    //             if (results.rowsAffected > 0) {
    //                 Alert.alert(
    //                     'OPERAÇÃO',
    //                     'REALIZADA COM SUCESSO!',
    //                     [
    //                         {
    //                             text: 'Ok',
    //                             onPress: () => navigation.navigate('Home'),
    //                         },
    //                     ],
    //                     { cancelable: false },
    //                 );
    //             } else alert('OCORREU UM ERRO INESPERADO NA OPERAÇÃO');
    //         },
    //     );
    // });
}