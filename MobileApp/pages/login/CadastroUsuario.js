import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import UserTeste from '../../database/user';

const CadastroUsuario = ({navigation}) => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erroSenha, setErroSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [erroConfirmaSenha, setErroConfirmaSenha] = useState('');

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

    const validarSenha = (senha) => {
        if(senha.length < 6) {
            setErroSenha("A senha deve conter no mínimo 6 caracteres.");
            return;
        }

        setErroSenha('');
        setSenha(senha);
    }
    
    const validarEmail = (email) => {
        const r = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
        if(!r.test(email)){
            setErroEmail("E-mail inválido. Por favor, verifique.");
            return
        }
        setEmail(email);
        setErroEmail('');
    }

    const conferirSenha = (confereSenha) => {
        if(confereSenha !== senha) {
            setErroConfirmaSenha("As senhas não conferem. Por favor, verifique.");
            return;
        }
        setErroConfirmaSenha('');
        setConfirmaSenha(confereSenha);
    }

    const salvar = () => {
        console.log('Salvar')
        if(erroSenha !== '' || erroConfirmaSenha !== '' || erroEmail !== '') {
            showToast('Por favor, verifique se todos os campos estão corretos.', 'Erro', 'error');
            return;
        }
        if(nome === '' || sobrenome === '' || email === '' || senha === '' || confirmaSenha === '') {
            showToast('Todos os campos devem ser preenchidos!', 'Erro', 'error')
            return;
        }

        const user = {
            name: nome,
            last_name: sobrenome,
            email: email,
            password: senha
        }

        console.log('1');
        const userTeste = new UserTeste();
        console.log('2');
        userTeste.Save(user, (result, error) => {
            if(error) {
                console.log(error);
                return;
            }

            console.log(result)
        })
        
        
    }
    return(
        <ScrollView style={styles.container}>
            <Input
                label="Nome"
                onChangeText={(value) => setNome(value)}
            />
            <Input 
                label="Sobrenome"
                onChangeText={(value) => setSobrenome(value)}
            />
            <Input 
                label="E-mail"
                onChangeText={(value) => validarEmail(value)}
                errorMessage={erroEmail}
                errorStyle={{ color: 'red' }}
            />
            <Input 
                label="Senha"
                onChangeText={(value) => validarSenha(value)}
                errorMessage={erroSenha}
                errorStyle={{ color: 'red' }}
                secureTextEntry={!mostrarSenha}
                rightIcon={
                    mostrarSenha ?
                    <Icon 
                        name="eye-slash" 
                        type="font-awesome"
                        onPress={() => setMostrarSenha(false)} 
                    />
                    :
                    <Icon 
                        name="eye" 
                        type="font-awesome"
                        onPress={() => setMostrarSenha(true)} 
                    />
                    }

            />
            <Input 
                label="Confirme a senha"
                onChangeText={(value) => conferirSenha(value)}
                errorMessage={erroConfirmaSenha}
                errorStyle={{ color: 'red' }}
                secureTextEntry={!mostrarSenha}
            />
            <Button title="Salvar" onPress={() => salvar()}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20
    }
})

export default CadastroUsuario;

