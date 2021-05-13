import React, {useState} from 'react';
import { ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import { cadastrar_aluno } from '../../database/AlunosDB';
import { create } from 'react-test-renderer';

const CadastroAluno = ({navigation}) => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState(new Date());

    
    function onSave() {

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

        const dataNascimentoFormatted = dataNascimento.getDate() + '/' + (dataNascimento.getMonth() + 1) + '/' + dataNascimento.getFullYear();
        console.log(dataNascimentoFormatted)
        const data = {
            nome: nome,
            sobrenome: sobrenome,
            matricula: matricula,
            email: email,
            dataNascimento: dataNascimentoFormatted
        }

        const onError = (err) => {
            console.log(err)
            let message = "Ocorreu um erro e o cadastro não foi feito. Por favor, tente novamente."
            if (err.message === "UNIQUE constraint failed: aluno.id (code 1555 SQLITE_CONSTRAINT_PRIMARYKEY)") {
                message = 'Erro: essa matrícula já está sendo utilizada por outro aluno.';
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

        const onSuccess = (tx, results) => {
            console.log(results)
            Alert.alert(
                'SUCESSO',
                'Aluno cadastrado!',
                [
                    {
                        text: 'Ok',
                        onPress: () => navigation.navigate('Home'),
                    },
                ],
                { cancelable: false },
            );
        }


        cadastrar_aluno(data, onSuccess, onError);
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
                onChangeText={(value) => setEmail(value)}
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