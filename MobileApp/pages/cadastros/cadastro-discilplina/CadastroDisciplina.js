import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

const CadastroDisciplina = () => {
    const [nome, setNome] = useState('');
    const [professor, setProfessor] = useState('');

    const onSave = () => {
        console.log('Salvou')
    }

    return (    
        <View>
            <Input
                label="Nome da Disciplina"
                onChangeText={(value) => setNome(value)}
            />
            
            <Input
                label="Professor"
                onChangeText={(value) => setProfessor(value)}
            />

            <Button title="Salvar" onPress={onSave}/>
        </View>
    )
}

export default CadastroDisciplina;