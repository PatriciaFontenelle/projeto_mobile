import React, { useState } from 'react';
import { Text, View, Button } from 'react-native'
import DefaultButton from '../../components/botoes/DefaultButton'


const Home = (props) => {
    const navigation = props.navigation;

    const changePage = (page) => {
        navigation.replace(page)
    }

    return (
            <View>
                <Button title="Cadastro" onPress={() => { changePage('Cadastros') }} />
                <Button title="Consulta" onPress={() => { setButtonText('Consulta') }} />
            </View>
    )
}

export default Home;