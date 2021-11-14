import React, { useState,useEffect} from 'react';
import { useFormik } from 'formik';
//import { Provider as ParerProvider, } from 'react-native-paper;'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAsyncStorage } from '@react-native-community/async-storage'
import * as apiLogin from '../../services/apiLogin';
import { useAuth } from '../../services/auth';
import { StoreProvider, useStore } from '../../services/store';

export default function Login() {
    const [state, setState] = useState(false);
    const [, { login }] = useAuth()


    const formik = useFormik({
        initialValues: {
            username: "test",
            password: "test"
        },
        onSubmit: async values => {
            try {
                const { data } = await apiLogin.login(values)
                login(data)
                console.log("AGORA FUNCIONOU AQUI API: ", data)
              } catch (error) {
                console.log('ERRO')
                setState('Login ou senha inválidos')
              }
        },
    })

    const Login = () => {
        return(
            <View>
            <Text>PAGE LOGIN</Text>

            {// state && <Text>{state}</Text>
            }
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


    const Router = () => {
        const user = true;
        /*if () {
            return <ActivityIndicator style={{flex: 1, color: '#43bc70'}} />
        } */
        return user ? <Login /> : <Login />
    }

    return (
        <Login/>
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



/* 
<View>
                <Text>PAGE LOGIN</Text>
    
                {// state && <Text>{state}</Text>
                }
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
    
            </View>*/