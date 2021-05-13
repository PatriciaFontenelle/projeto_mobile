import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, InteractionManager, Alert } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import { editar_aluno, deletar_aluno } from '../../database/AlunosDB';

const ConsultaAluno = (props) => {
    const { aluno } = props.route.params;

    const notaPadrao = 0;

    const [editar, setEditar] = useState(false);
    const [nome, setNome] = useState(aluno.name);
    const [sobrenome, setSobrenome] = useState(aluno.last_name);
    const [email, setEmail] = useState(aluno.email);
    const [dataNascimento, setDataNascimento] = useState(aluno.birth_date);

    const onSave = () => {

        if (nome === '' || sobrenome === '' || email === '' || dataNascimento === '' || aluno.id === '') {
            Alert.alert(
                "Erro!",
                "Por favor, preencha todos os campos!",
                [{
                    text: 'Ok'
                }]
            )
            
            return
        }

        const data = {
            nome: nome,
            sobrenome: sobrenome,
            matricula: aluno.id,
            email: email,
            dataNascimento: dataNascimento
        }

        const onError = (err) => {
            console.log(err)
            let message = "Ocorreu um erro e a alteração não foi feita. Por favor, tente novamente."

            Alert.alert(
                'Erro!',
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
                'Sucesso!',
                'Alteração salva!',
                [
                    {
                        text: 'Ok',
                        onPress: () => props.navigation.navigate('Home'),
                    },
                ],
                { cancelable: false },
            );
        }


        editar_aluno(data, onSuccess, onError);
    }

    const onDelete = () => {

        Alert.alert(
            'ATENÇÃO!',
            'Essa ação não pode ser desfeita. Tem certeza que deseja excluir o cadastro do aluno ' + nome + ' ' + sobrenome + '?',
            [
                {
                    text: 'Não',
                },
                {
                    text: 'Sim',
                    onPress: () => {
                        const onError = (e) => {
                            Alert.alert(
                                'Erro!',
                                'Erro ao excluir cadastro. Por favor, tente novamente.',
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
                                'Sucesso!',
                                'Cadastro excluído!',
                                [
                                    {
                                        text: 'Ok',
                                        onPress: () => props.navigation.navigate('Home'),
                                    },
                                ],
                                { cancelable: false },
                            );
                        }

                        deletar_aluno(aluno.id, onSuccess, onError)
                    }
                },
            ],

        )
        
    }

    

    const formatDate = (date) => {
        const splittedDate = date.split('/');
        console.log(splittedDate[2] + '-' + splittedDate[1] + '-' + splittedDate[0])

        return new Date(splittedDate[2],(splittedDate[1] -1),splittedDate[0])
    }

    return (
        <ScrollView style={styles.container}>
            <Input
                label="Matrícula"
                value={aluno.id}
                disabled={true}
            />
            <Input
                label="Nome"
                value={nome}
                disabled={!editar}
                onChangeText={value => setNome(value)}
            />
            <Input
                label="Sobrenome"
                value={sobrenome}
                disabled={!editar}
                onChangeText={value => setSobrenome(value)}
            />
            <Input
                label="Email"
                value={email}
                disabled={!editar}
                onChangeText={value => setEmail(value)}
            />
            
            
            {editar ?
                <View>
                    <Text style={styles.dataNascimento}>Data de Nascimento: </Text>
                    <DatePicker
                        date={formatDate(dataNascimento)}
                        format="DD/MM/YYYY"
                        mode="date"
                        locale="pt-BR"
                        fadeToColor="none"
                        onDateChange={(date) => setDataNascimento(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear())}
                    />
                    <Button disabled={!editar} title="SALVAR" onPress={onSave} />
                </View>
                :
                <View>
                    <Input
                        label="Data de Nascimento"
                        value={dataNascimento}
                        disabled={!editar}
                    />
                    <View style={styles.btnsContainer}>
                        <Button buttonStyle={styles.btnEditar} disabled={editar}
                            onPress={() => setEditar(true)}
                            icon={
                                <Icon
                                    name="edit"
                                    size={30}
                                    color="white"
                                />
                            }
                        />

                        <Button buttonStyle={styles.btnDelete}
                            onPress={onDelete}
                            icon={
                                <Icon
                                    name="delete"
                                    size={30}
                                    color="white"
                                />
                            }
                        />
                    </View>
                </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input: {
        alignSelf: 'center'
    },
    aprovado: {
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 24,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20
    },
    btnEditar: {
        width: 50,
        margin: 10
    },
    btnDelete: {
        backgroundColor: 'red',
        width: 50
    },
    btnsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
        marginRight: 20
    },
    dataNascimento: {
        marginLeft: 10,
        color: 'gray',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    }
})
export default ConsultaAluno;