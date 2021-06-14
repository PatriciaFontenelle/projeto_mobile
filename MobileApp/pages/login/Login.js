import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import logo from '../../assets/logo.jpeg';
import UserTeste from '../../database/user';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { Constants } from 'react-native-unimodules';

const showToast = (message, title="", type="success", duration=3000, position="bottom") => {
    Toast.show({
        type: type,
        position: position,
        text1: title,
        text2: message,
        visibilityTime: duration,
        autoHide: true
    })
}

export default class App extends Component {
    state = {
        email: '',
        senha: ''
    }

    componentDidMount(){
        console.log(Constants.systemFonts);
    }
    
    constructor(props) {
        super(props);
        this.clicou = this.clicou.bind(this);
        this.cadastrar = this.cadastrar.bind(this);
        this.login = this.login.bind(this);
    }

    clicou() {
        if (this.state.email === 'appmobile@email.com' && this.state.senha === '123456') {
            this.props.navigation.navigate('Home')
        } else {
            alert('Usuário ou senha incorretos. Por favor, tente novamente.')
        }
    }

    cadastrar() {
        this.props.navigation.navigate('CadastroUsuario');
    }

    login() {
        const userTeste = new UserTeste();
        userTeste.Login(this.state.email, this.state.senha, async(result, error) => {
            console.log('Result: ' + result)
            
            if(error) {
                console.log(error)
                return;
            }


            if(!result.auth) {
                showToast('Usuário ou senha incorretos.', 'Erro', 'error');
                return;
            }

            await SecureStore.setItemAsync('token', result.token);
            console.log('token gerado: ' + result.token);
            this.props.navigation.navigate('Home');
        })
        console.log('Login')

    }
    
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={logo}
                    style={styles.logo}
                />
                <Input
                    labelStyle={styles.input}
                    inputContainerStyle={styles.inputContainer}
                    placeholder="E-mail"
                    onChangeText={value => this.setState({email: value.toLowerCase()})}
                />
                <Input
                    labelStyle={styles.input}
                    inputContainerStyle={styles.inputContainer}
                    secureTextEntry={this.state.senha !== '' ? true : false}
                    placeholder="Senha"
                    onChangeText={value => this.setState({ senha: value })}
                />
                <Button
                    title="Login"
                    onPress={this.login}
                    buttonStyle={styles.botaoLogin}
                />
                <Button 
                    buttonStyle={styles.botaoCadastrar} 
                    title="Cadastrar" 
                    titleStyle={{color: '#5cbe83'}} 
                    onPress={this.cadastrar}
                />
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom:30
    },
    input: {
        color: '#5cbe83',
        alignSelf: "center"

    },
    inputContainer: {
        color: '#5cbe83',
        borderBottomColor: '#5cbe83',
        borderBottomWidth: 2,
        width: 300,
        alignSelf: "center"
    },
    botaoCadastrar: {
        color: '#5cbe83',
        backgroundColor: 'white',
        borderColor: '#5cbe83',
        borderWidth: 2
    },
    botaoLogin: {
        marginTop:0,
        borderColor: '#5cbe83',
        borderWidth: 2
    },
})