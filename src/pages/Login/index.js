import React, { useState,useEffect} from 'react';
import { useFormik } from 'formik';
import { Provider as ParerProvider, Card, TextInput, Button} from 'react-native-paper';
import { Alert, SafeAreaView, StyleSheet, View, Text,Modal,Pressable, ScrollView } from 'react-native';
import { useAsyncStorage } from '@react-native-community/async-storage'
import * as apiLogin from '../../services/apiLogin';
import { useAuth } from '../../services/auth';
import { StoreProvider, useStore } from '../../services/store';
import { loginStyl } from './loginStyle';
import { theme } from '../../../appStyle';
import { HeaderComponent } from '../../components/Header';
import { registerStyle } from '../Register/regidterStyle';

export default function Login() {
    
    const [modalVisibleRegister, setModalVisibleRegister] = useState(false);
    const [modalVisibleForgot, setModalVisibleForgot] = useState(false);

    

    useEffect(() => {
        (async() => {

        
        })();
    },[])
    

    const logando = () => {
        Alert.alert("Login")
    }

    const irRegister = () => {
        console.log('REGISTER')
        setModalVisibleRegister(true)
        
    }

    const irForgot = () => {
        console.log('forgot() ');
        setModalVisibleForgot(true)
    }

    

    const Login = () => {
        return(
           <View style={loginStyl.container}>
               {
                    // INICIO REGISTRAR USUARIO
                }
               <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    visible={modalVisibleRegister}
                    onRequestClose={() => {
                        setModalVisibleRegister(!modalVisibleRegister);
                    }}
                >
                    <View >
                    <View >
                    <SafeAreaView>
                <ScrollView>
                    <HeaderComponent title="Register"/>
                    <View style={registerStyle.container}>
                        <TextInput label="Name"/>
                        <TextInput label="Email" keyboardType="email-address"/>
                        <TextInput label="Password" secureTextEntry={true}/>
                        <TextInput label="Confirm password" secureTextEntry={true} right={<TextInput.Icon name="eye-off-outline" color={registerStyle.icon.color}/>} />

                        <Button mode="contained" style={registerStyle.button} onPress={() => irRegister()}>Register</Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
                        <Pressable
                        
                        onPress={() => setModalVisibleRegister(!modalVisibleRegister)}
                        >
                        </Pressable>
                    </View>
                    </View>
                </Modal>
                
                </View>

                {
                    // INICIO RECUPERAR SENHA
                }

                <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    visible={modalVisibleForgot}
                    onRequestClose={() => {
                        setModalVisibleForgot(!modalVisibleForgot);
                    }}
                >
                    <View >
                    <View >
                    <SafeAreaView>
                <ScrollView>
                    <HeaderComponent title="Forgot Password"/>
                    <View style={registerStyle.container}>
                        <TextInput label="Email" keyboardType="email-address"/>

                        <Button mode="contained" style={registerStyle.button} onPress={() => forgot()}>Forgot</Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
                        <Pressable
                        
                        onPress={() => setModalVisibleForgot(!modalVisibleForgot)}
                        >
                        </Pressable>
                    </View>
                    </View>
                </Modal>
                
                </View>

                {
                    // INICIO LOGIN
                }

               <View style={loginStyl.view}>
                    
                <Card>
                        <Card.Title title="Fluents" titleStyle={loginStyl.cardTitle} ></Card.Title>
                        <Card.Content>
                            <TextInput label="Email" keyboardType="email-address"></TextInput>
                            <TextInput label="Password" secureTextEntry={true}></TextInput>
                            <Button uppercase={false} style={loginStyl.cardButton} onPress={irForgot}>Forgot password</Button>
                            <Button mode="contained" style={loginStyl.cardButton} onPress={logando}>Login</Button>
                            <Button style={loginStyl.cardButton} onPress={() => irRegister()}>Register</Button>


                        </Card.Content>
                </Card>

                
               </View>

           </View>
        )
    }


    const Router = () => {
        const user = true;
        /*if () {
            return <ActivityIndicator style={{flex: 1, color: '#43bc70'}} />
        } */
        return  <Login />
    }

    return (
        <ParerProvider theme={theme} >
        <Login/>
        </ParerProvider>
    )

    
}


const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
        centeredView: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22
        },
        modalView: {
          margin: 20,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 35,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5
        },
        button: {
          borderRadius: 20,
          padding: 10,
          elevation: 2
        },
        buttonOpen: {
          backgroundColor: "#F194FF",
        },
        buttonClose: {
          backgroundColor: "#2196F3",
        },
        textStyle: {
          color: "white",
          fontWeight: "bold",
          textAlign: "center"
        },
        modalText: {
          marginBottom: 15,
          textAlign: "center"
        }
})



/* 

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