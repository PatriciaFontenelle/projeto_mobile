import Toast from 'react-native-toast-message';
import { StyleSheet } from 'react-native';

export function showToast(type = 'success', title, message, duration = 3000, position = 'top') {
    console.log('Toast')
    Toast.show({
        type: type,
        position: position,
        text1: title,
        text2: message,
        visibilityTime: duration,
        autoHide: true,
    })
}

export function validarEmail(email) {
    const r = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
    return r.test(email);
}
