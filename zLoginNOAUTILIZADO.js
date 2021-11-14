import React, { useState,useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, AppRegistry } from 'react-native';
import { useFormik } from 'formik';
import * as apiLogin from '../../services/apiLogin';
import { useAuth } from '../../services/auth';

export default function Login() {
    const [state, setSate] = useState(false);
    const [, setAuth] = useAuth() // TALVEX é setAuth


    const formik = useFormik({
        initialValues: {
            username: "test",
            password: "test"
        },
        onSubmit: async (values) => {
            try {
                const { data } = await apiLogin.login(values);
                console.log(data)
                setAuth(data);
            } catch (error) {
                setSate('Login ou senha inválidos')
            }
        },
    })

    return(
        <View>
            <Text>PAGE LOGINN</Text>

            {state && <Text>{state}</Text>}
            <TextInput 
            style={styles.input}
            placeholder="USER"
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
            />
            
            <TextInput
            style={styles.input}
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            placeholder="SENHA"
            keyboardType="numeric"
            />

            <TouchableOpacity style={{backgroundColor: '#43bc70' , width: '93%', alignItems: 'center', 
            justifyContent: 'center', padding: 12, margin: 12, borderRadius: 5  }} 
            onPress={formik.handleSubmit}>
               {formik.isSubmitting ? <ActivityIndicator color="#FFF"/> : <Text>Entrar</Text>}
            </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
})
