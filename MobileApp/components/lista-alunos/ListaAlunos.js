import React, {useEffect, useState} from 'react';
import { ScrollView, View, Button, Text } from 'react-native';
import { ListItem, Input } from 'react-native-elements';

const ListaAlunos = ({navigation}) => {
    console.log('teste')
    const data = [
        {
            nome: 'Patrícia',
            sobrenome: 'Fontenelle',
            matricula: '01020706',
            email: 'patricia.fontenelle@hotmail.com',
            dataNascimento: new Date()
        },
        {
            nome: 'Richard',
            sobrenome: 'Soares',
            matricula: '10207060',
            email: 'richard@hotmail.com',
            dataNascimento: new Date()
        },
        {
            nome: 'Paloma',
            sobrenome: 'Cruz',
            matricula: '56214596',
            email: 'paloma@hotmail.com',
            dataNascimento: new Date()
        },
    ]
    
    data.sort((a, b) => a.nome > b.nome ? 1 : -1);

    const [lista, setLista] = useState(data);

    const textChanged = (value) => {
        const newList = exemplo.filter((aluno) => aluno.nome.includes(value) || aluno.matricula.includes(value));
        newList.sort((a, b) => a.nome > b.nome ? 1:-1)
        setLista(newList)
    }
    
    const selectAluno = (aluno) => {
        navigation.navigate('LancarNota');
    }
    
    return (
        <ScrollView>
            <Input
                placeholder="Buscar"
                leftIcon={{ type: 'font-awesome', name: 'search' }}
                onChangeText={value => textChanged(value)}
            />
           {lista.map((aluno) => (
               <ListItem key={aluno.matricula} bottomDivider onPress={() => navigation.navigate('LancarNota', {aluno: aluno})}>
                <ListItem.Content>
                    <ListItem.Title>{aluno.nome}</ListItem.Title>
                    <ListItem.Subtitle>{aluno.matricula}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            ))}
            
        </ScrollView>
    )
}

export default ListaAlunos;