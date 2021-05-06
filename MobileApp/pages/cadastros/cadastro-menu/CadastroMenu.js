import React from 'react';
import { View, Button, Text } from 'react-native';
import DefaultButton from '../../../components/botoes/DefaultButton'

const CadastroMenu = (props) => {
    const navigation = props.navigation;

    function goBack() {
        navigation.replace('Home');
    }

    return (
        <View>
            <Text>Cadastro Menu</Text>
            <DefaultButton onClick={goBack}>Voltar</DefaultButton>
        </View>
    )
}

export default CadastroMenu