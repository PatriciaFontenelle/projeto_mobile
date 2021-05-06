import React from 'react';
import { Button, TextPropTypes, StyleSheet } from 'react-native';

const DefaultButton = (props) => {
    return (
        <Button
            color={'#09103A'}
            buttonStyle={styles.btn}
            title={props.children}
            onPress={props.onClick}
        />
    )
}

export default DefaultButton;

const styles = StyleSheet.create({
    btn: {
        fontWeight: "bold",
        fontSize: 60
    }
})