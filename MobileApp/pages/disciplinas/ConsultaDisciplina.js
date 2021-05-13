import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, InteractionManager, Alert } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import { editar_disciplina, deletar_disciplina } from '../../database/DisciplinasDB';

const ConsultaDisciplina = (props) => {
    const { disciplina } = props.route.params;

    const notaPadrao = 0;

    const [editar, setEditar] = useState(false);
    const [nome, setNome] = useState(disciplina.name);
    const [professor, setProfessor] = useState(disciplina.teacher_name);

    const onSave = () => {

        if (nome === '' || professor === '') {
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
            professor: professor,
            id: disciplina.id,
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


        editar_disciplina(data, onSuccess, onError);
    }

    const onDelete = () => {

        Alert.alert(
            'ATENÇÃO!',
            'Essa ação não pode ser desfeita. Tem certeza que deseja excluir o cadastro da disciplina ' + nome + '?',
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

                        deletar_disciplina(disciplina.id, onSuccess, onError)
                    }
                },
            ],

        )

    }

    return (
        <ScrollView style={styles.container}>
            <Input
                label="Nome"
                value={nome}
                disabled={!editar}
                onChangeText={value => setNome(value)}
            />
            <Input
                label="Professor"
                value={professor}
                disabled={!editar}
                onChangeText={value => setProfessor(value)}
            />


            {editar ?
                <Button disabled={!editar} title="SALVAR" onPress={onSave} />
                :
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
export default ConsultaDisciplina;