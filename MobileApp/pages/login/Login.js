import React from 'react'
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import logo from '../../assets/logo.jpeg';
import UserRepository from '../../database/user';
import * as SecureStore from 'expo-secure-store';
import {showToast, validarEmail} from '../../Funcs/funcs';

export default class App extends React.Component {
    state = {
        email: '',
        senha: '',
        erroEmail: '',
        mostrarSenha: false,
    }
    
    constructor(props) {
        super(props);
        this.cadastrar = this.cadastrar.bind(this);
        this.login = this.login.bind(this);
        this.conferirEmail = this.conferirEmail.bind(this);
    }

    async componentDidMount() {
        const token = await SecureStore.getItemAsync('token');

        if (token) {
            const userRepository = new UserRepository();
            userRepository.Authenticate(token, (error, result) => {
                if (error) {
                    console.log(error);
                    return;
                }

                this.props.navigation.navigate('Home');
            })
        }
    }

    cadastrar() {
        this.props.navigation.navigate('CadastroUsuario');
    }

    conferirEmail(email) {
        if (!validarEmail(email)) {
            this.setState({ erroEmail: 'E-mail inválido!' })
            return;
        }
        this.setState({erroEmail: '', email})
    }

    login() {
        if (this.state.erroEmail !== '') {
            showToast('error', 'Erro', 'Verifique o seu e-mail!');
            return;
        }
        const userRepository = new UserRepository();
        userRepository.Login(this.state.email, this.state.senha, async(result, error) => {            
            if(error) {
                console.log(error)
                return;
            }


            if(!result.auth) {
                showToast('error', 'Erro', 'Usuário ou senha incorretos' );
                return;
            }
            const isAvailable = SecureStore.isAvailableAsync();
            await SecureStore.setItemAsync('token', result.token);
            this.props.navigation.navigate('Home');
        })
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
                    errorMessage={this.state.erroEmail}
                    errorStyle={{ color: 'red', width: 300, alignSelf: 'center' }}
                    onChangeText={value => this.conferirEmail(value)}
                />
                <Input
                    labelStyle={styles.input}
                    inputContainerStyle={styles.inputContainer}
                    secureTextEntry={this.state.senha !== '' && !this.state.mostrarSenha ? true : false}
                    placeholder="Senha"
                    onChangeText={value => this.setState({ senha: value })}
                    rightIcon={
                        this.state.mostrarSenha ?
                            <Icon
                                name="eye-slash"
                                type="font-awesome"
                                onPress={() => this.setState({ mostrarSenha: false })}
                            />
                            :
                            <Icon
                                name="eye"
                                type="font-awesome"
                                onPress={() => this.setState({mostrarSenha: true})}
                            />
                    }
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