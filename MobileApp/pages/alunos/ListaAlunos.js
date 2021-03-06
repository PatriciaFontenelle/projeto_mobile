import color from 'color';
import React, {useEffect, useState} from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ListItem, Input, Button, Icon } from 'react-native-elements';
import AlunoRepository from '../../database/aluno';

const ListaAlunos = (props) => {
    const [lista, setLista] = useState([]);
    const [listaOriginal, setListaOriginal] = useState([]);
    const [nextScreen, setNextScreen] = useState(props.route.params.nextScreen);

    useEffect(() => {
        const alunoRepository = new AlunoRepository();
        alunoRepository.RetrieveAll((error, result) => {
            if (error) {
                console.log(error);
                return;
            }

            let data = [];
            for (let aluno of result) {
                data.push(aluno)
            }
            data.sort((a, b) => a.name > b.name ? 1 : -1);
            setLista(data);
            setListaOriginal(data)
        })
    }, [])

    const textChanged = (value) => {
        if (value === '') {
            setLista(listaOriginal);
            return;
        }
        const newList = lista.filter((aluno) => aluno.name.includes(value) || aluno._id.includes(value));
        newList.sort((a, b) => a.name > b.name ? 1:-1)
        setLista(newList)
    }
    
    return (
        <ScrollView style={styles.container}>  
            
            {nextScreen === 'ConsultaAluno' ?
                <View style={styles.btnContainer}>
                    <Input
                        containerStyle={{backgroundColor: 'white', marginTop: 20, width: 350}}
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
                        onPress={(() => props.navigation.navigate(('CadastroAluno')))}
                    />
                    
                </View>
                :
                <Input
                    containerStyle={{ backgroundColor: 'white', marginTop: 20 }}
                    placeholder="Buscar"
                    leftIcon={{ type: 'font-awesome', name: 'search' }}
                    onChangeText={value => textChanged(value)}
                />
            }
            {lista.map((aluno) => (
               <ListItem key={aluno._id} bottomDivider onPress={() => props.navigation.navigate(nextScreen, {aluno: aluno})}>
                <ListItem.Content>
                    <ListItem.Title>{aluno.name}</ListItem.Title>
                    <ListItem.Subtitle>{aluno._id}</ListItem.Subtitle>
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

export default ListaAlunos;