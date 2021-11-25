// Speech to Text Conversion in React Native – Voice Recognition
import React, {useState, useEffect} from 'react';
import { Formik, useFormik } from 'formik';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Alert, SafeAreaView, Pressable, ScrollView, TouchableOpacity  } from 'react-native';
import { Provider as ParerProvider, Card, TextInput, Button} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native'
import { HeaderComponent } from './src/components/Header';
import Routes from './src/routes';
import Login from './src/pages/Login'
import Register from './src/pages/Register'
import storegeUser from './src/services/storegeUser';
import { loginStyl } from './src/pages/Login/loginStyle';
import { registerStyle } from './src/pages/Register/regidterStyle';
import apiUsers from './src/services/users';
//import useAsyncStorage  from '@react-native-community/async-storage'

export default function App({navigation}) {
	const [valivacao, setValidacao] = useState("ABHBSH8787)@#_+0878hJNsdn#$%¨¨&*8*&¨%sdsdsdddddddddddscsccccccccasdsccccccc#@5%%cccccsc")
	const [user, setUser] = useState()
	const [verificacaoLogin, setVerificacaoLogin] = useState()
	const [loading, setLoading] = useState(false)
	const [state, setState] = useState(false);
	const [createFailed,setCreateFailed] = useState();
	const [modalVisibleRegister, setModalVisibleRegister] = useState(false);
    const [modalVisibleForgot, setModalVisibleForgot] = useState(false);

	/*const buscarUser = async () => {
		
		const result = storegeUser.buscarUserLogin('store');
		console.log('result STORAGE: ', result)
	} */
	useEffect(() => {
		(async () => {
			console.log('useEffect ------->>>>>>>>>>.....')
			const regex_validation = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
			const validacaoConta = /([@]){1}/i;
			//storegeUser.armazenarUserLogin('store', 'rodrigo@gmail.com')
			storegeUser.removeUserLogin('store')
			const result = await storegeUser.buscarUserLogin('store');
			console.log('result STORAGE: ', result)
			console.log("É email válido? Resposta: " + validacaoConta.test(result))
			if (validacaoConta.test(result) === true) {
				console.log('ENTROU NO IF', result)
				
				await setUser(result)
				//if (user === undefined) { setUser() }
				//console.log('user', user)
			}
			setLoading(true)
			
			//buscarUser()
			console.log('USEEFFECT')
		})();
	}, [verificacaoLogin]) 

	
	const Carregando =  () => {
		return(
			<View style={{justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
				<ActivityIndicator size="large" color="#00ff00" />
				<Text>Carregando...</Text>
			</View>
		)
	} 

	const irRegister = () => {
        console.log('REGISTER ', )
        setModalVisibleRegister(true)
        
    }

    const irForgot = () => {
        console.log('forgot() ');
        setModalVisibleForgot(true)
    }

	const login = async () => {
		console.log('login')
		storegeUser.armazenarUserLogin('store', 'rodrigo@gmail.com')
		await setVerificacaoLogin('true')
	}

	
    function carregarPerfilLogin() {
        console.log('CARREGAR PERFIL')
  
       // RNRestart.Restart();
      } 

	const RouterLogin = () => {
		const formik = useFormik({
            initialValues: ({email: "" , password: "", nomeRegister: "", emailRegister: "", passwordRegister: "", passwordRegisterConfirme: "", passwordForgot: "" }),
            onSubmit: async values => {

                try {
					console.log('values -------------->>>>>>>. ',values.email.length)
					console.log('values -------------->>>>>>>. ',values.emailRegister.length)

					if (values.passwordForgot.length > 0) {
						const resultForgot = await apiUsers.post('recupera-password',{
							email: "rodrigo.s.romualdo@gmail.com",
						})
						if (resultForgot.data.error === false) {
							console.log('resultForgot->>>>>>>>>>.', resultForgot.data)
							return Alert.alert(
								"Message",
								`${resultForgot.data.message}`,
								[
									{
										text: "Ok",
										onPress: () => setModalVisibleForgot(false)
									}
								]
							)
						} else {
							return Alert.alert(
								"Error",
								`${resultForgot.data.message}`,
								[
									{
										text: "Ok",
										onPress: () => console.log('OK')
									}
								]
							)
						}
						
					} 

					else if (values.emailRegister.length > 0) { 
						console.log('>>>>>>>>>>>>>>>>>. emailRegister ', )
					
						const resultCreate = await apiUsers.post('create',{
							nome: "Rodrigo Romualdo",
							email: "raaoooooooooo@gmail.com",
							password: "12345678",
							passwordRegister: "12345678"
						})
						console.log(resultCreate.data) 
						if (resultCreate.data.status === "FAILED") {
							console.log('resultCreate.data.FAILED === FAILED')
							await setCreateFailed("Error e-mail já cadastrado")
						} else if (resultCreate.data.status === "SUCCESS") {
							console.log('ALTERAR ISSO AQUI resultCreate.data[0] ',resultCreate.data.data)
							storegeUser.armazenarUserLogin('store', resultCreate.data.data)
							setVerificacaoLogin('true')
						}

					}
				

					else if (values.email.length > 0) {
                    const resultLogin = await apiUsers.post('login',{
                        email: "rodriogo.s.romualdo@gmail.com",
                        password: "12345678"
                    })
                    console.log('result API: ',resultLogin.data.status)
                    console.log('result API 2: ',resultLogin.data.email)
                    if (resultLogin.data.status === "FAILED") {
                        console.log("Invalid credentials")
                        return Alert.alert(
                            "Error",
                            "Invalid credentials",
                            [
                                {
                                    text: "Ok",
                                    onPress: () => console.log('Tentar novamente')
                                }
                            ]
                        )
                    } else if (resultLogin.data.status === "SUCCESS" && resultLogin.data.email !== undefined) {
                        console.log('CAIU NO ELSE IF EMAIL')

                    
                        //storegeUser.armazenarUserLogin('store', resultLogin.data.email)
						setVerificacaoLogin('true')
                        return Alert.alert(
                            //title
                            'Atenção',
                            //body
                            `Login realizado com sucesso, clique no Ok para carregar o seu perfil!`,
                            [
                              {
                                text: 'Ok', onPress: (() => carregarPerfilLogin()) ,
                              },
                            ],
                        )
                    }
				}
                    
                   // storegeUser.armazenarUserLogin('store', 'rodrigo@gmail.com')
                } catch (error) {
                    return Alert.alert(
                        "Error",
                        "Ocorreu um erro, tente novamente",
                        [
                            {
                                text: "Ok",
                                onPress: () => console.log('Tentar novamente')
                            }
                        ]
                    )
                }
                console.log('... ', values)
            }
        })
		return (
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
                        <TextInput label="Name"  value={formik.values.nomeRegister} onChangeText={formik.handleChange('nomeRegister')}  />
                        <TextInput label="Email" keyboardType="email-address" value={formik.values.emailRegister} onChangeText={formik.handleChange('emailRegister')} />
                        <TextInput label="Password" secureTextEntry={true}  right={<TextInput.Icon name="eye-off-outline"
						value={formik.values.passwordRegister} onChangeText={formik.handleChange('passwordRegister')} color={registerStyle.icon.color}/>}/>
                        <TextInput label="Confirm password" secureTextEntry={true} right={<TextInput.Icon name="eye-off-outline" 
						value={formik.values.passwordRegisterConfirme} onChangeText={formik.handleChange('passwordRegisterConfirme')}color={registerStyle.icon.color}/>} />
                        

                        {!formik.isSubmitting && <Button mode="contained" style={registerStyle.button} onPress={formik.handleSubmit}>Register</Button> }
						
						{formik.isSubmitting && <TouchableOpacity style={{marginTop: '5%'}}>
							<ActivityIndicator color="#6877e8" style={{padding: 8}} />
						</TouchableOpacity>}

						<View style={{justifyContent: 'center', alignItems: 'center'}}>
							{createFailed && <Text style={{color: 'red'}}>{createFailed}</Text>}
						</View>
						

					
						   
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
                        <TextInput label="Email" keyboardType="email-address"  style={{marginTop: '1%'}}
						value={formik.values.passwordForgot}
						onChangeText={formik.handleChange('passwordForgot')} />

                         {!formik.isSubmitting && <Button mode="contained" style={registerStyle.button} onPress={formik.handleSubmit}>Forgot</Button>}
						 {formik.isSubmitting && <TouchableOpacity style={{marginTop: '5%'}}>
							<ActivityIndicator color="#6877e8" style={{padding: 8}} />
						</TouchableOpacity>}
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


				{/* INICIO LOGIN */}
               <View style={loginStyl.view}>
                    
                <Card>
                        <Card.Title title="Fluents" titleStyle={loginStyl.cardTitle} ></Card.Title>
                        <Card.Content>
                                        <TextInput label="Email" 
                                        keyboardType="email-address"
                                        value={formik.values.email}
                                        onChangeText={formik.handleChange('email')} />
                                        
                                    <TextInput label="Password" secureTextEntry={true} 
                                    value={formik.values.password}
                                    onChangeText={formik.handleChange('password')}
                                    />
                                    <Button uppercase={false} style={loginStyl.cardButton} onPress={irForgot}>Forgot password</Button>
                                    <Button mode="contained" style={loginStyl.cardButton} onPress={formik.handleSubmit}>
                                    {!formik.isSubmitting && (<Text>Login</Text>)}   
									{formik.isSubmitting && <TouchableOpacity style={{marginTop: '5%'}}>
										<ActivityIndicator color="#6877e8" style={{padding: 8}} />
									</TouchableOpacity>}
                                    
                                    </Button>
                                    {state && <Button style={loginStyl.cardText}>{state}</Button>} 
                                    
                                    <Button style={loginStyl.cardButton} onPress={() => irRegister()}>Register</Button>

                        </Card.Content>
                </Card>
                
               </View>
			</View>
        )

		
    }

	const Router = () => {
		//useAsyncStorage.setItem("store","rodrigo@gmail.com")
		//const result = storegeUser.buscarUserLogin('store');
		//console.log('result STORAGE: ', result)
        //const user = false;
        if (!loading) {
            return <Carregando/>
        } 
		console.log('user TEM O QUE???? ', user)
        return user ? 
		<NavigationContainer> 
			<Routes/>
		</NavigationContainer> : <RouterLogin />
    }

/*
const Router = () => {
	return (
		<ParerProvider>
			<TextInput label="Example"></TextInput>
		</ParerProvider>
	)
}  */

	return (
		<Router/>
	)
};




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