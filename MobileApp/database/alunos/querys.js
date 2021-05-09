import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'mobile_db.db' });


export const create_student = (props) => {
    debugger;
    console.log(props)
    db.transaction(function (tx) {
        tx.executeSql(
            'INSERT INTO ALUNO (usuario, senha, user_admin) VALUES (?,?,?)',
            [usuario, senha, userAdmin],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    Alert.alert(
                        'OPERAÇÃO',
                        'REALIZADA COM SUCESSO!',
                        [
                            {
                                text: 'Ok',
                                onPress: () => navigation.navigate('HomeScreen'),
                            },
                        ],
                        { cancelable: false },
                    );
                } else alert('OCORREU UM ERRO INESPERADO NA OPERAÇÃO');
            },
        );
    });
}