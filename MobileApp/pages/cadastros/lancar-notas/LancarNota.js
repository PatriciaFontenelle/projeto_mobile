import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, InteractionManager } from 'react-native';
import { Input, Button } from 'react-native-elements'
import ListaAlunos from '../../../components/lista-alunos/ListaAlunos';

const LancarNota = ({ route }) => {
    const { aluno } = route.params;

    const notaAv1 = 8;
    const notaAv2 = 9;
    const notaAv3 = 0;

    const [editar, setEditar] = useState(true);
    const [aprovado, setAprovado] = useState(true);
    const [media, setMedia] = useState(0);
    const [av1, setAv1] = useState(notaAv1.toFixed(2));
    const [av2, setAv2] = useState(notaAv2.toFixed(2));
    const [av3, setAv3] = useState(notaAv3.toFixed(2));
    
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
    
    return (    
        <View style={styles.container}>
            <View>
                <Input
                    inputContainerStyle={styles.input}
                    label="AV1"
                    value={av1}
                    disabled={editar}
                    onChangeText={value => setAv1(value)}
                />
                <Input
                    inputContainerStyle={styles.input}
                    label="AV2"
                    value={av2}
                    disabled={editar}
                    onChangeText={value => setAv2(value)}
                />
                <Input
                    inputContainerStyle={styles.input}
                    label="AV3"
                    value={av3}
                    disabled={editar}
                    onChangeText={value => setAv3(value)}
                />
        
                <Input
                    label="Média"
                    value={media}
                    disabled={editar}
                />
            </View>
            <View>
                <Button buttonStyle={styles.botao} title="Editar" onPress={() => setEditar(false)}/>
            </View>
            <Text style={styles.aprovado}>{aprovado ? 'APROVADO' : 'REPROVADO'}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: 50,
        backgroundColor: 'white',
    },
    aprovado: {
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 24,
        fontWeight: 'bold'
    },
    botao: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 200,
        backgroundColor: 'red'
    },
    container: {
        display: 'flex',
        marginTop: 20,
        textAlign: 'center'
    }
})
export default LancarNota;