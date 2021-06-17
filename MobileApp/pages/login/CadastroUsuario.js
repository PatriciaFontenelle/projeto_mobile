import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import UserRepository from '../../database/user';
import {showToast, validarEmail} from '../../Funcs/funcs';

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

    const validarSenha = (senha) => {
        if(senha.length < 6) {
            setErroSenha("A senha deve conter no mínimo 6 caracteres.");
            return;
        }

        setErroSenha('');
        setSenha(senha);
    }
    
    const conferirEmail = (email) => {
        if(!validarEmail(email)){
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
        if(erroSenha !== '' || erroConfirmaSenha !== '' || erroEmail !== '') {
            showToast('error', 'Erro!', 'Por favor, verifique se todos os campos estão corretos.');
            return;
        }
        if(nome === '' || sobrenome === '' || email === '' || senha === '' || confirmaSenha === '') {
            showToast('error', 'Erro!', 'Todos os campos devem ser preenchidos!');
            return;
        }

        const user = {
            name: nome,
            last_name: sobrenome,
            email: email,
            password: senha
        }

        const userRepository = new UserRepository();
        userRepository.EmailIsRegistered(email, (error, result) => {
            if (result) {
                showToast('error', 'Erro', 'O e-mail informado já está sendo utilizado por outro usuário!')
                return;
            } else {
                userRepository.Save(user, (error, result) => {
                    if (error) {
                        console.log(error);
                        return;
                    }

                    showToast(undefined, 'Sucesso!', 'Usuário cadastrado.')

                    navigation.navigate('Login');
                })
            }
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
                onChangeText={(value) => conferirEmail(value)}
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

