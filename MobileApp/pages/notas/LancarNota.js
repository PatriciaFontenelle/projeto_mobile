import { NavigationContainer } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { ScrollView, View, Text, StyleSheet, InteractionManager, Alert } from 'react-native';
import { Input, Button, BottomSheet, ListItem, Icon } from 'react-native-elements'
import { editar_nota, lancar_nota, consultar_nota } from '../../database/AlunoDisciplinaDB';
import { listar_disciplinas } from '../../database/DisciplinasDB';

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
        const onSuccess = (tx, results) => {
            let disciplinas = [];
            const rows = results.rows;
            for (let i = 0; i < rows.length; i++){
                disciplinas.push(rows.item(i))
            }

            setDisciplinas(disciplinas);
        }

        const onError = (e) => {
            console.log(e)
        }

        listar_disciplinas(onSuccess, onError)
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
        const onSuccess = (tx, result) => {
            console.log('Resultado: ' + result.rows.length)
            if (result.rows.length > 0) {
                const item = result.rows.item(0)
                console.log(item)
                setTipoQuery('Update')
                setAv1(item.av1.toFixed(2))
                setAv2(item.av2.toFixed(2))
                setAv3(item.av3.toFixed(2))
                setEditar(false)
            } else {
                setAv1(notaInicial.toFixed(2))
                setAv2(notaInicial.toFixed(2))
                setAv3(notaInicial.toFixed(2))
                setEditar(true)
                setTipoQuery('Insert')
            }
        }

        const onError = (e) => {
            console.log(e);
        }

        consultar_nota(aluno.id, d.id, onSuccess, onError);
        setDisciplina(d);
        setIsVisible(false);
    }

    const onSave = () => {
        const data = {
            aluno_id: aluno.id,
            disciplina_id: disciplina.id,
            av1: av1,
            av2: av2,
            av3: av3
        }

        const onSuccess = (tx, result) => {
            Alert.alert(
                'Sucesso!',
                'A nota foi lançada com sucesso!',
                [
                    {
                        text: 'Ok',
                        onPress:(() => props.navigation.navigate('Home'))
                    }
                ]
            )
        }

        const onError = (e) => {
            Alert.alert(
                'Erro!',
                'A nota não foi lançada. Por favor, tente novamente.',
                [
                    {
                        text: 'Ok'
                    }
                ]
            )
        }

        if (tipoQuery === 'Insert') {
            lancar_nota(data, onSuccess, onError)
        } else if (tipoQuery === 'Update') {
            editar_nota(data, onSuccess, onError)
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
                rightIcon={{ type: 'font-awesome', name: 'search', onPress: () => setIsVisible(true) }}
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
                    <ListItem key={d.id} onPress={() => onSelectDisciplina(d)}>
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