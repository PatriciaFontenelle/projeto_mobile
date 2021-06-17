import color from 'color';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ListItem, Input, Button, Icon } from 'react-native-elements';
import DisciplinaRepository from '../../database/disciplina';
import { showToast } from '../../Funcs/funcs';

const ListaDisciplinas = (props) => {
    const [lista, setLista] = useState([]);
    const [listaOriginal, setListaOriginal] = useState([]);


    useEffect(() => {
        const disciplinaRepository = new DisciplinaRepository();
        disciplinaRepository.RetrieveAll((error, result) => {
            if (error) {
                console.log(error);
            }

            result.sort((a, b) => a.name > b.name ? 1 : -1);
            setLista(result);
            setListaOriginal(result)
        })
    }, [])

    const textChanged = (value) => {
        if (value === '') {
            setLista(listaOriginal);
            return;
        }
        const newList = lista.filter((disciplina) => disciplina.name.includes(value) || disciplina.teacher_name.includes(value));
        newList.sort((a, b) => a.name > b.name ? 1 : -1)
        setLista(newList)
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.btnContainer}>
                <Input
                    containerStyle={{ backgroundColor: 'white', marginTop: 20, width: 350 }}
                    placeholder="Buscar"
                    leftIcon={{ type: 'font-awesome', name: 'search' }}
                    onChangeText={value => textChanged(value)}
                />
                <Button buttonStyle={styles.btnAdd}
                    icon={
                        <Icon
                            name="add"
                            color="white"
                        />
                    }
                    onPress={(() => props.navigation.navigate(('CadastroDisciplina')))}
                />
            </View>

            {lista.map((disciplina) => (
                <ListItem key={disciplina._id} bottomDivider onPress={() => props.navigation.navigate('ConsultaDisciplina', { disciplina: disciplina })}>
                    <ListItem.Content>
                        <ListItem.Title>{disciplina.name}</ListItem.Title>
                        <ListItem.Subtitle>{disciplina.teacher_name}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            ))}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        justifyContent: 'space-between'
    },
    btnAdd: {
        width: 40,
        borderRadius: 50,
        marginTop: 5
    }
})

export default ListaDisciplinas;