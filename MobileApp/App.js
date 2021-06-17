import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast, {BaseToast} from 'react-native-toast-message';

import Home from './pages/home/Home';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';

import CadastroAluno from './pages/alunos/CadastroAluno';
import ConsultaAluno from './pages/alunos/ConsultaAluno';
import ListaAlunos from './pages/alunos/ListaAlunos';
import CadastroDisciplina from './pages/disciplinas/CadastroDisciplina';
import ConsultaDisciplina from './pages/disciplinas/ConsultaDisciplina';
import ListaDisciplinas from './pages/disciplinas/ListaDisciplinas';
import LancarNota from './pages/notas/LancarNota';
import Login from './pages/login/Login';
import CadastroUsuario from './pages/login/CadastroUsuario';

const Stack = createStackNavigator();

const theme = {
  Icon: {
    color: 'gray'
  },
  Input: {
    labelStyle: { color: 'gray' },
    containerStyle: { backgroundColor: 'white' },
    inputContainerStyle: {borderBottomColor: 'gray', backgroundColor: 'white'}
  },
  Button: {
    buttonStyle: {
      alignSelf: 'center',
      marginTop: 20,
      width: 200,
      backgroundColor: '#5cbe83'}
  },
}

const App = () => {
  return (
    <>
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: '#fff',
                borderBottomColor: '#5cbe83',
                borderBottomWidth: 3,
              },
              headerTintColor: '#5cbe83',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              cardStyle: { backgroundColor: 'white' }
            }}
          >
            <Stack.Screen
              name="Home"
              component={Home}
                options={{ title: 'HOME', headerLeft: null }}
            />
            <Stack.Screen
              name="CadastroAluno"
              component={CadastroAluno}
              options={{ title: 'CADASTRAR ALUNO' }}
            />
            <Stack.Screen
              name="ConsultaAluno"
              component={ConsultaAluno}
              options={{ title: 'ALUNO' }}
            />
            <Stack.Screen
              name="ListaAlunos"
              component={ListaAlunos}
              options={{ title: 'ALUNOS' }}
            />
            <Stack.Screen
              name="CadastroDisciplina"
              component={CadastroDisciplina}
              options={{ title: 'CADASTRAR DISCIPLINA' }}
            />
            <Stack.Screen
              name="ConsultaDisciplina"
              component={ConsultaDisciplina}
              options={{ title: 'DISCIPLINA' }}
            />
            <Stack.Screen
              name="ListaDisciplinas"
              component={ListaDisciplinas}
              options={{ title: 'DISCIPLINAS' }}
            />
            <Stack.Screen
              name="LancarNota"
              component={LancarNota}
              options={{ title: 'NOTAS' }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CadastroUsuario"
              component={CadastroUsuario}
              options={{ title: 'CADASTRO' }}
            />
            
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
    
    <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}

export default App