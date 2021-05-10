import React, {useState} from 'react';
import { ScrollView, Text, StyleSheet, Button } from 'react-native';
import { Input } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import { create_student } from '../../../database/alunos/querys';
import { create } from 'react-test-renderer';

const CadastroAlunos = () => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState(new Date());

    function onSave() {
        const data = {
            nome: nome,
            sobrenome: sobrenome,
            matricula: matricula,
            email: email,
            dataNascimento: dataNascimento
        }

        create_student(data);
    }

    return (    
        <ScrollView>
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
    }
})

export default CadastroAlunos;