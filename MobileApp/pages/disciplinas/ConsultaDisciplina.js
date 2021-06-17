import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, InteractionManager, Alert } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import { showToast } from '../../Funcs/funcs';
import DisciplinaRepository from '../../database/disciplina';
import AlunoDisciplinaRepository from '../../database/notas';

const ConsultaDisciplina = (props) => {
    const { disciplina } = props.route.params;

    const notaPadrao = 0;

    const [editar, setEditar] = useState(false);
    const [nome, setNome] = useState(disciplina.name);
    const [professor, setProfessor] = useState(disciplina.teacher_name);

    const onSave = () => {

        if (nome === '' || professor === '') {
            showToast('error', 'Erro!', 'Por favor, preencha todos os campos.')

            return
        }

        const data = {
            name: nome,
            teacher_name: professor,
            _id: disciplina._id,
        }

        const disciplinaRepository = new DisciplinaRepository();
        disciplinaRepository.Update(data, (error, result) => {
            if (error) {
                console.log(error);
                showToast('error', 'Erro!', 'Não foi possível salvar as alterações. Por favor, tente novamente.');
                return;
            }

            showToast(undefined, 'Sucesso!', 'As alterações foram salvas.');
            props.navigation.navigate('Home');
        })
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
                    onPress: () => deletarDisciplina()
                },
            ],
        )
    }

    const deletarDisciplina = () => {
        const notaRepository = new AlunoDisciplinaRepository();
        notaRepository.Delete(disciplina._id, (error, result) => {
            if (error) {
                console.log(error);
                return;
            }
        })
        const disciplinaRepository = new DisciplinaRepository();
        disciplinaRepository.Delete(disciplina._id, (error, result) => {
            if (error) {
                console.log(error);
                showToast('error', 'Erro!', 'Não foi possível excluir a disciplina. Por favor, tente novamente.');
                return;
            }

            showToast(undefined, 'Sucesso!', 'Disciplina excluída.')
            props.navigation.navigate('Home');
        })
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