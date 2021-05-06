import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/home/Home';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CadastroMenu from './pages/cadastros/cadastro-menu/CadastroMenu'
import CadastroAlunos from './pages/cadastros/cadastro-alunos/CadastroAlunos'
import { ThemeProvider } from 'react-native-elements';

const Stack = createStackNavigator();

const theme = {
  Input: {
    labelStyle: {color: 'gray'}
  },
  Button: {
    color: '#09103A'
  }
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: 'Home' }}
            />
            <Stack.Screen
              name="Cadastros"
              component={CadastroAlunos}
              options={{ title: 'Cadastros' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App