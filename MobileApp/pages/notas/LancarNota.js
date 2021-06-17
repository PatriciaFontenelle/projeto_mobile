import { NavigationContainer } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { ScrollView, View, Text, StyleSheet, InteractionManager, Alert } from 'react-native';
import { Input, Button, BottomSheet, ListItem, Icon } from 'react-native-elements'
import DisciplinaRepository from '../../database/disciplina';
import AlunoDisciplinaRepository from '../../database/notas';
import { showToast } from '../../Funcs/funcs';

const LancarNota = (props) => {
    const { aluno } = props.route.params;

    const notaPadrao = 0;

    const [isVisible, setIsVisible] = useState(false)
    const [editar, setEditar] = useState(false);
    const [aprovado, setAprovado] = useState(true);
    const [media, setMedia] = useState(notaPadrao.toFixed(2));
    const [disciplinas, setDisciplinas] = useState([]);
    const [disciplina, setDisciplina] = useState({});
    const [av1, setAv1] = useState(notaPadrao.toFixed(2));
    const [av2, setAv2] = useState(notaPadrao.toFixed(2));
    const [av3, setAv3] = useState(notaPadrao.toFixed(2));
    const [tipoQuery, setTipoQuery] = useState('')

    useEffect(() => {
        const disciplinaRepository = new DisciplinaRepository();
        disciplinaRepository.RetrieveAll((error, result) => {
            if (error) {
                console.log(error);
            }

            console.log(result)
            result.sort((a, b) => a.name > b.name ? 1 : -1);
            setDisciplinas(result);
        })

    }, [])
    
    useEffect(() => {
        const a1 = parseFloat(av1)
        const a2 = parseFloat(av2)
        const a3 = parseFloat(av3)

        let m = 0;

        if (a3 > 0) {
            m = a3
        }

        m = (a1 + a2) / 2

        setMedia(m.toFixed(2))

    }, [av1, av2, av3])

    const onSelectDisciplina = (d) => {
        const notaInicial = 0;

        const data = {
            aluno: aluno._id,
            disciplina: disciplina._id
        }

        const alunoDisciplinaRepository = new AlunoDisciplinaRepository();
        alunoDisciplinaRepository.getNota(data, (error, result) => {
            if (error) {
                console.log(error);
                setEditar(true);
                return;
            }
            if (result.length === 0) {
                console.log('Testeeevxsdhgvchg')
            }

            if (result) {
                setTipoQuery('Update');
                setEditar(false);
                setAv1(result.av1);
                setAv2(result.av2);
                setAv3(result.av3);
            } else {
                setTipoQuery('Insert');
                setEditar(true);
                setAv1(notaInicial);
                setAv2(notaInicial);
                setAv3(notaInicial);
            }
        })

        setDisciplina(d);
        setIsVisible(false);
    }

    const onSave = () => {
        const data = {
            aluno_id: aluno._id,
            disciplina_id: disciplina._id,
            av1: av1,
            av2: av2,
            av3: av3
        }

        const alunoDisciplinaRepository = new AlunoDisciplinaRepository();
        alunoDisciplinaRepository.Cadastrar(data, (error, result) => {
            if (error) {
                console.log(error);
                showToast('error', 'Erro!', 'Não foi possível lançar a nota. Por favor, tente novamente.');
                return;
            }

            showToast(undefined, 'Sucesso!', 'As notas foram lançadas.');
            props.navigation.navigate('Home');
        })

        if (tipoQuery === 'Insert') {
            lancar_nota(data, onSuccess, onError)
        } else if (tipoQuery === 'Update') {
            editar_nota(data, onSuccess, onError)
        }
    }

    const getDisciplinas = () => {
        console.log(!disciplinas || disciplinas.length === 0)
        if (!disciplinas || disciplinas.length === 0) {
            Alert.alert(
                'Erro!',
                'Não existe nenhuma disciplina cadastrada. Por favor, faça um cadastro para prosseguir.',
                [
                    {
                        text: 'Ok',
                        onPress: () => props.navigation.navigate('Home')
                    }
                ]
            )
        } else {
            setIsVisible(true);
        }
    }
    
    return (    
        <ScrollView style={styles.container}>
            <Input
                label="Aluno(a)"
                value={aluno.name + ' ' + aluno.last_name}
                disabled={true}
            />
            <Input
                label="Disciplina"
                disabled={true}
                rightIcon={{ type: 'font-awesome', name: 'search', onPress: () => getDisciplinas() }}
                value={disciplina.name}
            />
            <Input
                inputContainerStyle={styles.input}
                label="AV1"
                value={av1}
                disabled={!editar}
                onChangeText={value => setAv1(value)}
            />
            <Input
                inputContainerStyle={styles.input}
                label="AV2"
                value={av2}
                disabled={!editar}
                onChangeText={value => setAv2(value)}
            />
            <Input
                inputContainerStyle={styles.input}
                label="AV3"
                value={av3}
                disabled={!editar}
                onChangeText={value => setAv3(value)}
            />
    
            <Input
                label="Média"
                value={media}
                disabled={!editar}
            />
            <BottomSheet
                isVisible={isVisible}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
            >
                {disciplinas.map((d) => (
                    <ListItem key={d._id} onPress={() => onSelectDisciplina(d)}>
                        <ListItem.Content>
                            <ListItem.Title>{d.name}</ListItem.Title>
                            <ListItem.Subtitle>{d.teacher_name}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>
            <Text style={styles.aprovado}>{parseFloat(media) >= 6 ? 'APROVADO' : 'REPROVADO'}</Text>

            {editar ? 
                <Button disabled={!editar} title="SALVAR" onPress={onSave}/>
                :
                <View style={styles.btnsContainer}>
                    <Button disabled={tipoQuery !== 'Update' || editar}
                        onPress={() => setEditar(true)}
                        icon={
                            <Icon
                                name="edit"
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
    btnsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    }
})
export default LancarNota;