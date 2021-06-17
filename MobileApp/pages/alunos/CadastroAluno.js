import React, {useState} from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
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
        setEmail(email);
        if (!validarEmail(email)) {
            setErroEmail("E-mail inválido!");
            return;
        }
        setErroEmail('');
    }
    
    const onSave = () => {
        if (nome === '' || sobrenome === '' || email === '' || dataNascimento === '' || matricula === '') {
            showToast('error', 'Erro!', 'Todos os campos devem ser preenchidos!');
            return;
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

        alunoRepository.Cadastrar(data, (error, result) => {
            if (error) {                
                console.log(error)
                
                if (error.code === 11000) {
                    showToast("error", "Erro!", "Essa matrícula já está sendo usada por outro aluno.");
                    return;
                }

                showToast("error", "Erro!", "Ocorreu um erro e o cadastro não foi feito. Por favor, tente novamente.");
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