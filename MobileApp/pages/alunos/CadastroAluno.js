import React, {useState} from 'react';
import { ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import AlunoRepository from '../../database/aluno';
import { showToast, validarEmail } from '../../Funcs/funcs';

const CadastroAluno = ({navigation}) => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [email, setEmail] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState(new Date());

    const conferirEmail = (email) => {
        if (!validarEmail(email)) {
            setErroEmail("E-mail inválido!");
            return;
        }
        setErroEmail('');
        setEmail(email);
    }
    
    const onSave = () => {
        if (nome === '' || sobrenome === '' || email === '' || dataNascimento === '' || matricula === '') {
            Alert.alert(
                "Erro!",
                "Por favor, preencha todos os campos!",
                [{
                    text: 'Ok'
                }]
            )

            return
        }

        if (erroEmail !== '') {
            showToast('error', 'Erro!', 'Por favor, verifique o e-mail digitado.');
            return;
        }

        const dataNascimentoFormatted = dataNascimento.getDate() + '/' + (dataNascimento.getMonth() + 1) + '/' + dataNascimento.getFullYear();

        const data = {
            name: nome,
            last_name: sobrenome,
            _id: matricula,
            email: email,
            birth_date: dataNascimentoFormatted
        }

        const alunoRepository = new AlunoRepository();

        alunoRepository.Cadastrar(data, (err, result) => {
            console.log('dnsjadnsajkd');
            console.log(err)
            if (err) {
                let message = "Ocorreu um erro e o cadastro não foi feito. Por favor, tente novamente."
                
                if (err.code === 11000) {
                    showToast("error", "Erro!", "Essa matrícula já está sendo usada por outro aluno.");
                    return;
                }

                Alert.alert(
                    'ERRO',
                    message,
                    [
                        {
                            text: 'Ok',
                        },
                    ],
                    { cancelable: false },
                );
            }
            showToast(undefined, 'Sucesso!', 'O aluno foi cadastrado.');
            navigation.navigate('Home');
        })
    }

    return (    
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
                label="Matrícula"
                onChangeText={(value) => setMatricula(value)}
            />
            <Input
                label="E-mail"
                errorMessage={erroEmail}
                errorStyle={{color: 'red'}}
                onChangeText={(value) => conferirEmail(value)}
            />
            <Text style={styles.dataNascimento}>Data de Nascimento: </Text>
            <DatePicker
                style={{alignSelf: "center"}}
                date={dataNascimento}
                format="DD/MM/YYYY"
                mode="date"
                locale="pt-BR"
                fadeToColor="none"
                onDateChange={(date) => setDataNascimento(date)}
            />
            <Button title="SALVAR" onPress={onSave}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    dataNascimento: {
        marginLeft: 10,
        color: 'gray',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    container: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20
    }
})

export default CadastroAluno;