import React from 'react';
import { View, Text, Button } from 'react-native';

const CadastroMenu = ({navigation}) => {
    return (    
        <View>
            <Button title="CADASTROS ALUNOS" onPress={() => navigation.navigate('CadastrarAluno')} />
            <Button title="CADASTROS DISCIPLINA" onPress={() => navigation.navigate('CadastrarDisciplina')} />
            <Text>Cadastro Menu</Text>
        </View>
    )
}

export default CadastroMenu;