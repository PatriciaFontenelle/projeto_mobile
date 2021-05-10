import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/home/Home';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';

import CadastroMenu from './pages/cadastros/cadastro-menu/CadastroMenu'
import CadastroAlunos from './pages/cadastros/cadastro-alunos/CadastroAlunos'
import CadastroDisciplina from './pages/cadastros/cadastro-discilplina/CadastroDisciplina'
import LancarNota from './pages/cadastros/lancar-notas/LancarNota'
import ListaAlunos from './components/lista-alunos/ListaAlunos'
import { ScrollView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const theme = {
  Icon: {
    color: 'gray'
  },
  Input: {
    labelStyle: { color: 'gray' },
    inputContainerStyle: { background: 'red'}
  },
  Button: {
    color: '#09103A'
  },
  View: {
    style: {marginTop: 20}
  },
  ScrollView: {
    style: {marginTop: 20}
  }
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: 'Home' }}
            />
            <Stack.Screen
              name="CadastrosMenu"
              component={CadastroMenu}
              options={{ title: 'Cadastros' }}
            />
            <Stack.Screen
              name="CadastrarAluno"
              component={CadastroAlunos}
              options={{ title: 'Cadastrar Aluno' }}
            />
            <Stack.Screen
              name="CadastrarDisciplina"
              component={CadastroDisciplina}
              options={{ title: 'Cadastrar Disciplina' }}
            />
            <Stack.Screen
              name="LancarNota"
              component={LancarNota}
              options={{ title: 'Lançar Nota' }}
            />
            <Stack.Screen
              name="ListaAlunos"
              component={ListaAlunos}
              options={{ title: 'Lançar Nota' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App