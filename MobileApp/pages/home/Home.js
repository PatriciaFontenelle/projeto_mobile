import React, { useState } from 'react';
import { Text, View, Button } from 'react-native'


const Home = ({navigation}) => {

    return (
            <View>
                <Button title="CADASTROS" onPress={() => navigation.navigate('CadastrosMenu')}/>
                <Button title="CONSULTAS" onPress={() => navigation.navigate('Cada')} />
                <Button title="LANÇAR NOTA" onPress={() => navigation.navigate('ListaAlunos')} />
            </View>
    )
}

export default Home;