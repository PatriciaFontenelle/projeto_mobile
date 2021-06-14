import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native'
import { Button } from 'react-native-elements';
import logo from '../../assets/logo.jpeg';
import * as SecureStore from 'expo-secure-store';


const Home = ({navigation}) => {

    useEffect(async() => {
        const token = await SecureStore.getItemAsync('token');
        console.log('token resgatado: ' + token);
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={styles.logo}
                    source={logo}
                />
            </View>
            <View >
                <Button title="ALUNOS" onPress={() => navigation.navigate('ListaAlunos', { nextScreen: 'ConsultaAluno' })}/>
                <Button title="DISCIPLINAS" onPress={() => navigation.navigate('ListaDisciplinas')} />
                <Button title="NOTAS" onPress={() => navigation.navigate('ListaAlunos', { nextScreen: 'LancarNota'})} />
                <Button buttonStyle={styles.btnSair} title="SAIR" onPress={() => navigation.navigate('Login')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    logo: {
        height: 120,
        width: 120,
        alignSelf: 'center',
        marginBottom: 30
    },
    btnSair: {
        backgroundColor: 'red',
    }
})

export default Home;