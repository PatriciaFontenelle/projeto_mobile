import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, InteractionManager, Alert } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import AlunoRepository from '../../database/aluno';
import { showToast, validarEmail } from '../../Funcs/funcs';

const ConsultaAluno = (props) => {
    const { aluno } = props.route.params;

    const notaPadrao = 0;

    const [editar, setEditar] = useState(false);
    const [nome, setNome] = useState(aluno.name);
    const [sobrenome, setSobrenome] = useState(aluno.last_name);
    const [email, setEmail] = useState(aluno.email);
    const [erroEmail, setErroEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState(aluno.birth_date);

    const conferirEmail = (email) => {
        setEmail(email);
        if (!validarEmail(email)) {
            setErroEmail('E-mail inválido.');
            return;
        }
        setErroEmail('');
    }

    const onSave = () => {

        if (erroEmail !== '') {
            showToast('error', 'Erro', 'Por favor, verifique o e-mail digitado.');
            return;
        }

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
            name: nome,
            last_name: sobrenome,
            _id: aluno._id,
            email: email,
            birth_date: dataNascimento
        }
        
        const alunoRepository = new AlunoRepository();
        alunoRepository.Update(data, (error, result) => {
            if (error) {
                console.log(error);
                showToast('error', 'Erro!', 'As alterações não foram salvas. Por favor, tente novamente.');
                return;
            }

            showToast(undefined, 'Sucesso!', 'As alterações foram salvas.')
            props.navigation.navigate('Home');
        })
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
                    onPress: () => deleteStudent()
                }
            ],

        )
        
    }

    const deleteStudent = () => {
        const alunoRepository = new AlunoRepository();
        alunoRepository.Delete(aluno._id, (error, result) => {
            console.log(!error)
            console.log(error)
            if (error) {
                console.log(error);
                showToast("error", "Erro!", "O cadastro não foi excluído. Por favor, tente novamente.");
                return;
            }
            console.log('Testteee')
            console.log(result)

            showToast(undefined, 'Sucesso!', `O cadastro do aluno ${nome} ${sobrenome} foi excluído.`);
            props.navigation.navigate("Home")
        })
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
                value={aluno._id}
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
                errorMessage={erroEmail}
                errorStyle={{color: 'red'}}
                onChangeText={value => conferirEmail(value)}
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