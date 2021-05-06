import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';


const CadastroAlunos = (props) => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState(new Date());
    
    
    return (
        <ScrollView style={styles.container}>
            <Input
                label='Nome'
                inputContainerStyle={styles.inputBorder}
                labelStyle={styles.input}
                onChangeText={value => setNome(value)}
            />
            
            <Input
                label='Sobrenome'
                onChangeText={value => setSobrenome(value)}
            />
            
            <Input
                label='Matrícula'
                onChangeText={value => setMatricula(value)}
            />
            
            <Input
                label='E-mail'
                onChangeText={value => setEmail(value)}
            />
            <Text style={styles.dataNascimento}>Data de Nascimento</Text>
            <DatePicker
                style={styles.datePicker}
                date={dataNascimento}
                mode='date'
                locale="pt-BR"
                onDateChange={setDataNascimento}
                format="DD-MM-YYYY"
                label="Teste"
                fadeToColor='none'
            />

            <Text>{nome} - {matricula}</Text>
            <Text>{email}</Text>
            <Text>{dataNascimento.getDate()}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    dataNascimento: {
        color: 'gray',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 10
    },

    datePicker: {
        marginRight: 'auto',
        marginLeft: 'auto'
    },

    inputBorder: {
        borderBottomColor: 'gray',
    },

    input: {
        color: 'gray'
    }

})

export default CadastroAlunos;