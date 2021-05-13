import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import logo from '../../assets/logo.jpeg';


export default class App extends Component {
    state = {
        email: '',
        senha: ''
    }
    
    constructor(props) {
        super(props);
        this.clicou = this.clicou.bind(this);
    }

    clicou() {
        if (this.state.email === 'appmobile@email.com' && this.state.senha === '123456') {
            this.props.navigation.navigate('Home')
        } else {
            alert('Usuário ou senha incorretos. Por favor, tente novamente.')
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={logo}
                    style={styles.logo}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email"
                    onChangeText={value => this.setState({email: value.toLowerCase()})}
                />
                <TextInput
                    style={styles.input}
                    textContentType="password"
                    secureTextEntry={true}
                    placeholder="Digite sua senha"
                    onChangeText={value => this.setState({ senha: value })}
                />
                <TouchableOpacity
                    style={styles.botao}
                    onPress={this.clicou}
                >
                    <Text style={styles.botaoText}>Login</Text>
                </TouchableOpacity>
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
        width: 300,
        height: 300,
    },
    input: {
        marginTop: 10,
        padding: 10,
        width: 300,
        backgroundColor: '#5cbe83',
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 4,
        color: 'white'

    },
    botao: {
        width: 300,
        height: 42,
        backgroundColor: '#5cbe83',
        marginTop: 10,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'

    },
    botaoText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
})