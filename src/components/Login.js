import { View, Text, Image, Button, TextInput, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';


const Login = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onChangeEmail = (value) => {
        setEmail(value)
    }
    const onChangePassword = (value) => {
        setPassword(value)
    }

    console.log("email", email)
    console.log("password", password)

    const handleSubmit = () => {
        if (email === 'user_name' && password === 'password') {
            navigation.navigate('Machine')
        } else if (email != 'user_name') {
            //Alert.alert('Login Failed', 'Please check your user name.');
            navigation.navigate('Machine')
        } else if (password != 'password') {
            //Alert.alert('Login Failed', 'Please check your password.');
            navigation.navigate('Machine')
        } else {
            //Alert.alert('Login Failed', 'Please check your user name and password.');
            navigation.navigate('Machine')
        }

    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // Adjust this offset as needed
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: "https://marel.com/media/uqgbm0jn/marel_logo-1.png" }}
                    style={styles.imageStyle}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textinput_style}
                    onChangeText={onChangeEmail}
                    value={email}
                    placeholder='Type your user name'
                />
                <TextInput
                    style={styles.textinput_style}
                    onChangeText={onChangePassword}
                    value={password}
                    secureTextEntry={true}
                    placeholder='Type your password'
                />
                <View style={styles.buttonContainer}>
                    <Button
                        title="Login"
                        onPress={handleSubmit}
                        color="#013A71"
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 370,
    },
    imageContainer: {
        flex: 2, // Take 1 part of available space (top)
        justifyContent: 'center', // Vertically center the image
        alignItems: 'center', // Horizontally center the image
    },
    inputContainer: {
        flex: 3, // Take 1 part of available space (bottom)
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        width: 370,
        height: 250,
        resizeMode: 'contain',
    },
    textinput_style: {
        height: 48,
        width: 370,
        margin: 8,
        borderWidth: 1,
        padding: 10,
    },
});

export default Login