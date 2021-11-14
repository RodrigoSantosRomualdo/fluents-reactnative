import React, { useState,useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, AppRegistry } from 'react-native';
import { useFormik } from 'formik';
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

    const Home = () => {
        const [, { logout }] = useAuth()
      
        return (
          <View>
            <Text>Home</Text>
            <Button title="Sair" onPress={logout} />
          </View>
        )
      }

    const Router = () => {
        const [store] = useStore()
        console.log('[store]: ', store)
        if (!store.rehydrated) {
            return <ActivityIndicator style={{flex: 1, color: '#43bc70'}} />
        }
        console.log('[store]: ', store.auth)
        return store.auth ? <Home /> : <Login />
    }

    return (
        <StoreProvider>
            <Router/>
        </StoreProvider>
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
