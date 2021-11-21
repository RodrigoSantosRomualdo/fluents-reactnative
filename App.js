// Speech to Text Conversion in React Native – Voice Recognition
import React, {useState, useEffect} from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Provider as ParerProvider, TextInput, } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes';
import Login from './src/pages/Login'
import Register from './src/pages/Register'
import storegeUser from './src/services/storegeUser';
//import useAsyncStorage  from '@react-native-community/async-storage'

export default function App() {

	const [user, setUser] = useState()
	const [loading, setLoading] = useState(false)

	/*const buscarUser = async () => {
		
		const result = storegeUser.buscarUserLogin('store');
		console.log('result STORAGE: ', result)
	} */
	useEffect(() => {
		(async () => {
			const regex_validation = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
			const validacaoConta = /([@]){1}/i;
			//storegeUser.armazenarUserLogin('store', 'rodrigo@gmail.com')
			//storegeUser.removeUserLogin('store')
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
	}, []) 

	
	const Carregando =  () => {
		return(
			<View style={{justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
				<ActivityIndicator size="large" color="#00ff00" />
				<Text>Carregando...</Text>
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
		</NavigationContainer> : <Login />
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



