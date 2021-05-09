import React, { useState } from 'react';
import { Text, View, Button } from 'react-native'


const Home = ({navigation}) => {

    return (
            <View>
                <Button title="CADASTROS" onPress={() => navigation.navigate('CadastrosMenu')}/>
            </View>
    )
}

export default Home;