import React from 'react';
import { View } from 'react-native';
import { Header, Icon } from 'react-native-elements';

const HomeButto = (props) => {
    return (
        <Icon
            name='sc-telegram'
            type='evilicon'
            color='#517fa4'
            onPress={() => {console.log('Homee')}}
        />

    )
}

const Layout = (props) => {
    return (
        <View>
            <Header
                leftComponent={{icon:<HomeButto/>}}
                centerComponent={{ text:props.title, style:{color: "#FFF"}}}
                rightComponent={{icon:"home", color:"#FFF"}}
            />
            {props.children}
        </View>
    )
}

export default Layout;