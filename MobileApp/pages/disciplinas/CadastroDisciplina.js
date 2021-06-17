import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import DisciplinaRepository from '../../database/disciplina';
import { showToast } from '../../Funcs/funcs';

const CadastroDisciplina = ({navigation}) => {
    const [nome, setNome] = useState('');
    const [professor, setProfessor] = useState('');

    const onSave = () => {
        if (nome == '' || professor == '') {
            showToast('error', 'Erro!', 'Por favor, preencha todos os campos.')

            return;
        }
        const data = {
            name: nome,
            teacher_name: professor
        }

        const disciplinaRepository = new DisciplinaRepository();
        disciplinaRepository.Cadastrar(data, (error, result) => {
            if (error) {
                console.log(error)
                showToast('error', 'Erro!', 'Não foi possível cadastrar a discilplina. Por favor, tente novamente.');
                return;
            }

            showToast(undefined, 'Sucesso!', 'Disciplina cadastrada.')

            navigation.navigate('Home');

        })
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