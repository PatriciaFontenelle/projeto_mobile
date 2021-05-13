import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { cadastrar_disciplina } from '../../database/DisciplinasDB';

const CadastroDisciplina = ({navigation}) => {
    const [nome, setNome] = useState('');
    const [professor, setProfessor] = useState('');

    const onSave = () => {
        if (nome == '' || professor == '') {
            Alert.alert(
                'Erro!',
                'Por favor, preencha todos os campos.',
                [
                    {
                        text: 'Ok'
                    }
                ]
            )

            return;
        }
        const data = {
            nome,
            professor
        }

        const onError = (err) => {
            console.log(err)
            let message = "Ocorreu um erro e o cadastro não foi feito. Por favor, tente novamente."

            Alert.alert(
                'Erro!',
                message,
                [
                    {
                        text: 'Ok',
                    },
                ],
                { cancelable: false },
            );
        }

        const onSuccess = (tx, results) => {
            console.log(results)
            Alert.alert(
                'Sucesso!',
                'Disciplina cadastrada!',
                [
                    {
                        text: 'Ok',
                        onPress: () => navigation.navigate('Home'),
                    },
                ],
                { cancelable: false },
            );
        }

        cadastrar_disciplina(data, onSuccess, onError)
    }

    return (    
        <View style={styles.container}>
            <Input
                label="Nome da Disciplina"
                onChangeText={(value) => setNome(value)}
            />
            
            <Input
                label="Professor"
                onChangeText={(value) => setProfessor(value)}
            />

            <Button title="SALVAR" onPress={onSave}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
})

export default CadastroDisciplina;