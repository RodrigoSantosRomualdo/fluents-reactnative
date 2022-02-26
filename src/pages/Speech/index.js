// Speech to Text Conversion in React Native – Voice Recognition
import React, {useState, useEffect} from 'react';
import Tts from 'react-native-tts';
import apiComparaText from '../../services/compareText';
import index from '../../config/index.json';
import apiTemas from '../../services/temas';
import * as Progress from 'react-native-progress';
import Home from '../Home'
import {
	SafeAreaView,
	StyleSheet,
	Text,
	Alert,
	View,
	Image,
	TouchableHighlight,
	ScrollView,
	Button,
	TouchableOpacity,
	ActivityIndicator,
	BackHandler
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SoundPlayer from 'react-native-sound-player'
import Sound from 'react-native-sound';
import { speechStyle } from './speechStyle'

import Voice from 'react-native-voice';
	let audio;
	let textInglesComparacao;
	
const Speech = ( props ) => {
	const [pages, setPages] = useState(1)
	const [nivelDisponivel, setNivelDisponivel] = useState();
	const [nivelDisponivelString, setNivelDisponivelString] = useState();
	const [exercicio, setExercicio] = useState();

	const [pitch, setPitch] = useState('');
	const [error, setError] = useState('');
	const [end, setEnd] = useState('');
	const [started, setStarted] = useState('');
	const [results, setResults] = useState([]);
	const [partialResults, setPartialResults] = useState([]);
	const [resultApiString, setResultApiString] = useState();
	const [microphoneValue, setMicrophoneValue] = useState(false)
	const [phoneValue, setPhoneValue] = useState(false)
	const [valueText, setValueText] = useState()
	const [resultSucesso, setResultSucesso] = useState(false);
	const [resultInsucesso, setResultInsucesso] = useState(false);
	const [mostraAudioMic, setMostraAudioMic] = useState(false);
	const [progressoBarra, setProgressoBarra] = useState(0.0)
	const [loadingApi, setLoadingApi] = useState(false)

	const [audioAtivado, setAudioAtivado] = useState(false);
	const [micAtivado, setMicAtivado] = useState(false);
	
	async function resultTemas() {
		setLoadingApi(true)
		
		const result = await apiTemas.post('atividade/buscar-atividade', {
			tema_aprendizado: props?.route.params?.aprender,
			nivel_disponivel: props?.route.params?.nivel_disponivel,
			ordem: pages
		})
		await setNivelDisponivel(props?.route.params?.nivel_number)
		await setNivelDisponivelString(props?.route.params?.nivel_disponivel)
		console.log('data  ------------>>>>>>>>>>>>>...',result.data)
		
			setLoadingApi(false)
		return setExercicio(result.data);
		//setLoadingApi(false)
		//console.log('exercicio --------------->>>>>>>>>>>>>> ', exercicio)

	}

	useEffect(() => {
		
		resultTemas()
	}, [])

	// Reset no BACK BUTTON DO CELULAR
	BackHandler.addEventListener('hardwareBackPress', () => {
		navigation.reset({index: 0, routes: [{name: 'O que vamos aprender hoje?', params: { renderizar: true}  }],  }) 
		return true; ;
		
	})

	/*
	useEffect(() => {
        (async() => {
			console.log('-->>> prosp name: ' ,props.route)
			console.log('-->>> prosp aprender: ' ,props?.route.params?.aprender)
			console.log('-->>> prosp nivel_disponivel: ' ,props?.route.params?.nivel_disponivel)
			console.log("INICIOU O USEEFFECT CHAMADA API")
			const result = await apiTemas.post('atividade/buscar-atividade', {
				tema_aprendizado: props?.route.params?.aprender,
				nivel_disponivel: props?.route.params?.nivel_disponivel,
				ordem: pages
			})
			setNivelDisponivel(props?.route.params?.nivel_number)
			setNivelDisponivelString(props?.route.params?.nivel_disponivel)
			console.log('data  ------------>>>>>>>>>>>>>...',result.data)
			setExercicio(result.data);
			console.log('exercicio --------------->>>>>>>>>>>>>> ', exercicio) 
        
        })();
    },[])  */
	//props?.route.params?.aprender,props?.route.params?.nivel_disponivel


	function playSound(url) {
		setPhoneValue(true)
		console.log('ENTROU AQUI')
		audio = new Sound(url,'', (error, sound) => {
			if (error) {
				alert('error'+error+message)
			}
			audio.play(() => {
				audio.release();
				setPhoneValue(false)
			})
		}) 
	}
	function stopSound() {
		audio.stop(() => {
			console.log('STOP AUDIP')
		})
		setPhoneValue(false)
	}

	const navigation = useNavigation();
	//console.log( props)

	if (!props.route.params?.aprender) {
		//console.log('props: NÃO EXISTE PROPS ')
	} else {
		//console.log('props: ', props.route.params.aprender)
	}

	

	useEffect(() => {
		//Setting callbacks for the process status
		Voice.onSpeechStart = onSpeechStart;
		Voice.onSpeechEnd = onSpeechEnd;
		Voice.onSpeechError = onSpeechError;
		Voice.onSpeechResults = onSpeechResults;
		Voice.onSpeechPartialResults = onSpeechPartialResults;
		Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

		return () => {
			//destroy the process after switching the screen
			Voice.destroy().then(Voice.removeAllListeners);
		};
	}, []);

	const onSpeechStart = (e) => {
		//Invoked when .start() is called without error
		//console.log('onSpeechStart: ', e);
		console.log('onSpeechStart')
		setProgressoBarra(0.3)
		setStarted('√');
	};

	const onSpeechEnd = (e) => {
		//Invoked when SpeechRecognizer stops recognition
		//console.log('onSpeechEnd: ', e);
		//console.log('FINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUI')
		//console.log('VALUE results: ', results)
		console.log('onSpeechEnd')
		setProgressoBarra(0.9)
		setEnd('√');
	};

	const onSpeechError = (e) => {
		//Invoked when an error occurs.
		//console.log('onSpeechError: ', e);
		console.log('onSpeechError')
		setMicrophoneValue(false)
		setError(JSON.stringify(e.error));
		return Alert.alert(
			"Error",
			"Não foi possível reconhecer sua voz. Vamos tentar novamente",
			[
				{
					text: "Ok",
					onPress: () => console.log('Tentar novamente')
				}
			]
		)
	};

	const onSpeechResults = async (e) => {
		//Invoked when SpeechRecognizer is finished recognizing
		//console.log('onSpeechResults: ', e);
		//console.log('onSpeechResults --------------->>>>>>> ')
		//const textingles =  "days of the week";
		setResults(e.value);
		
		console.log('CHAMOU API AGORA valueText ------->>>>>>...',  textInglesComparacao  )
		//let text = await 'teste' 
		compareText(textInglesComparacao, e.value)
	};

	const onSpeechPartialResults = (e) => {
		//Invoked when any results are computed
		//console.log('onSpeechPartialResults: ', e);
		setPartialResults(e.value);
		console.log('onSpeechPartialResults' , )
		setProgressoBarra(0.7)
		//compareText()
	};

	const onSpeechVolumeChanged = (e) => {
		//Invoked when pitch that is recognized changed
		//console.log('onSpeechVolumeChanged: ', e);
		//console.log('onSpeechVolumeChanged')
		setPitch(e.value);
	};

	const startRecognizing = async (textIngles) => {
		textInglesComparacao = textIngles;
		setProgressoBarra(0.1)
		//Starts listening for speech for a specific locale
		//await setValueText(textIngles)
		//console.log('textIngles: ', textIngles)
		setMicrophoneValue(true)
		
		
		try {
			await Voice.start('en-US');
			//await Voice.start('pt-BR');
			await setValueText('ATUALIZADO AQUI')
			setPitch('');
			setError('');
			setStarted('');
			setResults([]);
			setPartialResults([]);
			setEnd('');
			console.log('valueTextvalueTextvalueTextvalueText ', valueText)
			console.log('startRecognizing')
		} catch (e) {
			//eslint-disable-next-line
			console.error(e);
		}
	};

	const stopRecognizing = async () => {
		//Stops listening for speech
		try {
			await Voice.stop();
			console.log('stopRecognizing')
		} catch (e) {
			//eslint-disable-next-line
			//console.error(e);
		}
	};

	const cancelRecognizing = async () => {
		//Cancels the speech recognition
		try {
			await Voice.cancel();
			console.log('cancelRecognizing')
		} catch (e) {
			//eslint-disable-next-line
			//console.error(e);
		}
	};

	const destroyRecognizer = async () => {
		//Destroys the current SpeechRecognizer instance
		try {
			await Voice.destroy();
			setPitch('');
			setError('');
			setStarted('');
			setResults([]);
			setPartialResults([]);
			setEnd('');
			console.log('destroyRecognizer')
		} catch (e) {
			//eslint-disable-next-line
			//console.error(e);
		}
	};

	const handleVoice = ttsText => {
		//Tts.voices().then(voices => console.log(voices));
		//Tts.engines().then(engines => console.log('engines: ',engines));
		//Tts.requestInstallData();

		Tts.setDefaultLanguage('en-US');
		Tts.setDefaultRate(0.01, true);
		Tts.setDefaultPitch(0.9);
		//Tts.speak(`If this button doesn't look right for your app`)	
		Tts.speak(`Days of the week`);
	}

	const  testeDois = () => {
		try {
			// play the file tone.mp3
			//SoundPlayer.playSoundFile('tone', 'mp3')
			// or play from url
			console.log('CHAMOU AQUI')
			SoundPlayer.addEventListener('FinishedPlaying')
			SoundPlayer.playUrl('https://stream-audio-react-native.herokuapp.com/tracks/619707781808ae261848eb54')
			SoundPlayer.release();
			console.log('INICIOU STOP')
			//SoundPlayer.stop();
			console.log('FINALIZOU STOP STOP')
		} catch (e) {
			console.log(`cannot play the sound file`, e)
		}
	}

	const  teste = () => {
		try {
			// play the file tone.mp3
			//SoundPlayer.playSoundFile('tone', 'mp3')
			// or play from url
			//console.log('CHAMOU AQUI')
			
			SoundPlayer.playUrl('https://stream-audio-react-native.herokuapp.com/tracks/619707781808ae261848eb54', null)
			SoundPlayer.resume()
		//	console.log('INICIOU STOP')
			//SoundPlayer.stop();
		//	console.log('FINALIZOU STOP STOP')
		} catch (e) {
		//	console.log(`cannot play the sound file`, e)
		}
	}

	const compareText = async (textInglesComparacao,textUserString) => {
		// resultApiString, setResultApiString
		//console.log('CHAMOU COMPARE TEXT' , textIngles)
		console.log('results textString: ', textUserString)
		//let teste = ["days of the week"]
		//console.log('exercicio?.nome_exercicio_ingles: ', exercicio.nome_exercicio_ingles)
	
		console.log('DADOS DO INGLES ', textInglesComparacao)
		const response = await  apiComparaText.post("",
		 {
			padrao: index.padrao,
			textIngles: textInglesComparacao, 
			speechTextUser : textUserString
		})
		setProgressoBarra(1)
		setResultApiString(response.data)
		console.log(response.data)
		console.log('USESTATE: ', resultApiString) 

		setMicrophoneValue(false)

		console.log('ENTROU NO FORAAAAAAAAAAA' , response.data.error)
		
		if (response.data.error  === false  && response.data.message === "Processado com sucesso" && response.data.result === "Sucesso") {
			setMostraAudioMic(true)  // desabilita o microphone e Fone
			
			console.log('ENTROU NO IF IFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
			//resultSucesso, setResultSucesso
			return setResultSucesso(true)
		} else if (response.data.error  === false  && response.data.message === "Processado com sucesso" && response.data.result === "Erro Similaridade")  {
			setMostraAudioMic(true)  // desabilita o microphone e Fone
			console.log('ENTROU NO ELSE')
			return setResultInsucesso(true)
			// resultInsucesso, setResultInsucesso
		}
		//  && response.data.message === "processado com sucesso" && response.data.result === "Sucesso"
	}

	const funcaoNext = () => {
		setResultSucesso(false)
		setMostraAudioMic(false)
		setLoadingApi(true)
		console.log("EXECUTOU A FUNCAO NEXT")
		const soma = pages + 1;
		setPages(soma)
		buscarExercicio(soma)
	}

	const funcaoPreveios = () => {
		setResultSucesso(false)
		setMostraAudioMic(false)
		console.log("EXECUTOU A FUNCAO funcaoPreveios ===================>>>>>>>>>>>>>>>>>>>.    pages    ", pages)
		if (pages === 0) {
			return Alert.alert(
				"Atenção", "Você está no exericio 1", [
					{ text: "Ok", onPress: () => console.log('Tentar novamente') } ] )
		} else {
			setLoadingApi(true)
			const subtracao = pages - 1;
			setPages(subtracao)
			console.log("BUSCANDO PAGES ", pages)
			buscarExercicio(subtracao)
		}
	}


		


	const buscarExercicio = async (ValorPages) => {
		const result = await apiTemas.post('atividade/buscar-atividade', {
			tema_aprendizado: props?.route.params?.aprender,
			nivel_disponivel: nivelDisponivelString,
			ordem: ValorPages
		})
		
		console.log('data  ------------>>>>>>>>>>>>>...',result.data)
		if (result.data.message === "Nivel Finalizado!") {
			let resultSomaNivel = await nivelDisponivel + 1;
			let stringResultSomaNivel = await `Nível ${resultSomaNivel}`
			//const resultNivelString = `Nível ${nivelDisponivel}`;
			console.log('----------------------->>>> resultSomaNivel ', nivelDisponivel , ' STRING: ', stringResultSomaNivel )
			await setNivelDisponivelString(stringResultSomaNivel)
			await setNivelDisponivel(resultSomaNivel)
			await setPages(1)
			
			//await setNivelDisponivel(resultSomaNivel)
			//await setNivelDisponivel(resultNivelString)
			//console.log('->>>>>>>>.. nivelDisponivelString  ', nivelDisponivelString)
			// CRIAR UM ALERTA INFORMANDO QUE MUDOU DE NIVEL
			console.log('O QUE ESTÀ SENDO ENVIADO PARA API DE NIVEL:::: ', stringResultSomaNivel)
			const result = await apiTemas.post('atividade/buscar-atividade', {
				tema_aprendizado: props?.route.params?.aprender,
				nivel_disponivel: stringResultSomaNivel,
				ordem: 1
			})


			//console.log("CARREGOU O EXERCICIO CORRETO???????????")
			//await setNivelDisponivelString('')
			//await setNivelDisponivel('')
			//resultSomaNivel = '';
			//stringResultSomaNivel = '';
			// Nesse IF quer dizer que não existe mais o nivel para aprender
			if (result.data.message === "Nivel Finalizado!") {
			/*	const result = await apiTemas.post('atividade/buscar-atividade', {
					tema_aprendizado: props?.route.params?.aprender,
					nivel_disponivel: props?.route.params?.nivel_disponivel,
					ordem: 1
				})
				resultSomaNivel = '';
				stringResultSomaNivel = '';
				await setExercicio(result.data)  */
				setLoadingApi(false)
				return Alert.alert(
					"Parabéns", `Você finalizou o tema ${props?.route.params?.aprender}. Vamos selecionar um novo tema para aprender!`, 
[{ text: "Ok", onPress: () => navigation.reset({index: 0, routes: [{name: 'O que vamos aprender hoje?', params: { renderizar: true}  }],  }) 
				} ] )

					// [{ text: "Ok", onPress: () => navigation.navigate('O que vamos aprender hoje?', { renderizar: true} ) } ] )
			} else {
				Alert.alert(
					"Parabéns", `Você agora passou para o ${stringResultSomaNivel}.`, 
[{ text: "Ok", onPress: () => console.log('FINALIZOU O NIVEL'),  }] )
				setExercicio(result.data)
				setLoadingApi(false)
			}
			

		} else {
			setExercicio(result.data)
			setLoadingApi(false)
		}
		
	}
	// microphoneValue, setMicrophoneValue

	const resetTelaTreino = () => {
		setProgressoBarra(0.0)
		setResultSucesso(false);
		setResultInsucesso(false);
		setMostraAudioMic(false);
	}

	const audioAtivando = () => {
		//const [audioAtivado, 
		setAudioAtivado(false);
		//const [micAtivado, 
		//setMicAtivado(true);
		playSound(`https://stream-audio-react-native.herokuapp.com/tracks/${exercicio?.id_audio}`)
	}
	const AprendizadoSelecionado = () => {

		return (
			<View style={{backgroundColor: '#6877e8' , height: '100%'}}>
			
			

            <ScrollView style={{margin: '1%'}}>
			
			<View style={{alignItems: 'center', marginTop: '10%' }}>
				<TouchableOpacity style={{marginTop: '5%', backgroundColor: '#FFFFFF', padding: 10, borderRadius: 5, width: '90%'}}>
					<Text style={{backgroundColor: '#FFFFFF', fontWeight: '500', color: "#0b0e26", fontSize: 20}}>{exercicio?.nome_exercicio_ingles}</Text>
					<Text style={{backgroundColor: '#FFFFFF', fontWeight: '500', color: "#0b0e26", fontSize: 12}}>{exercicio?.nome_exercicio_portugues}</Text>
				</TouchableOpacity>


				<TouchableOpacity style={{marginTop: '5%', backgroundColor: '#FFFFFF', padding: 7, borderRadius: 5, width: '88%',}}>
					<Text style={{backgroundColor: '#FFFFFF', fontWeight: '300', color: "#0b0e26", fontSize: 18}}>{exercicio?.nome_exercicio_fala}</Text>
				</TouchableOpacity>

			</View>
			
			{!mostraAudioMic  && 
			<View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: '35%'}}>
					
					{phoneValue === false ? 
					<View style={styles.backPhone}>
						<TouchableOpacity onPress={()=> audioAtivando() }>
							<FontAwesome5 name="headphones-alt" size={60} color="#FFFFFF" />
						</TouchableOpacity>
						
						</View>  :  <View style={styles.backPhone}>
						 <FontAwesome5 name="assistive-listening-systems" size={25} color="#00ff00" style={{position: 'absolute', 
						alignItems: 'center', justifyContent: 'center', marginTop: '18%'}} />

						<TouchableOpacity onPress={()=> {return playSound(`https://stream-audio-react-native.herokuapp.com/tracks/${exercicio?.id_audio}`)}}>

							<FontAwesome5 name="headphones-alt" size={75} color="#00ff00" />
							
						</TouchableOpacity>

						</View> }

						
					<View style={[microphoneValue ? styles.backMicrofoneTrue : styles.backMicrofoneFalse]}>
						{microphoneValue ? (
							
					<TouchableOpacity onPress={() => startRecognizing(exercicio?.nome_exercicio_ingles)}>
						<FontAwesome5 name="microphone-alt" size={60} color="#00ff00" style={{width: 100}} />
						<Text style={{fontStyle: 'italic', color:"#FFF", marginRight: '30%', fontSize: 10}}>Listening</Text>
						<Progress.Bar color={'#00ff00'} progress={progressoBarra} width={45} />
						
					</TouchableOpacity> ) : (
					<TouchableOpacity onPress={() => startRecognizing(exercicio?.nome_exercicio_ingles)}>
						{!micAtivado && 
						<View>
							<FontAwesome5 name="microphone-alt" size={60} color="#FFFFFF" />
							</View>
						}
						
					</TouchableOpacity>
					)}
						
					</View>

			</View>
			}
			{resultSucesso &&  // setMostraAudioMic
				<View style={{marginTop: '25%', width: '98%', marginLeft: '1%', marginRight: '1%', alignItems: 'center'}}>
				<TouchableOpacity onPress={()=> {return playSound(`https://stream-audio-react-native.herokuapp.com/tracks/${exercicio?.id_audio}`)}}
				style={{backgroundColor: '#4d9e4d', borderRadius: 20, justifyContent: 'center', width: '100%'}}>
				<Text style={{color: '#FFF', fontWeight: '700', fontSize: 40, width:'95%',
				paddingBottom: 30,paddingTop: 30, marginLeft: '25%', marginRight: '25%' }}>Correto <FontAwesome5 name="headphones-alt" size={25} color="#E5E5E5" /></Text>
							
				</TouchableOpacity>

				<TouchableOpacity onPress={() => resetTelaTreino()}
				style={{ alignItems: 'center' ,backgroundColor: '#E5E5E5', borderRadius: 20, 
				justifyContent: 'center', alignItems: 'center', width: '80%', marginTop: '10%'}}>
							<Text style={{color: '#000', fontWeight: '700', fontSize: 20}}>Treinar Novamente</Text>
				</TouchableOpacity>
				</View>
			}

			{resultInsucesso &&  
				<View style={{marginTop: '25%', width: '98%', marginLeft: '1%', marginRight: '1%', alignItems: 'center'}}>
				<TouchableOpacity onPress={()=> {return playSound(`https://stream-audio-react-native.herokuapp.com/tracks/${exercicio?.id_audio}`)}}
				style={{backgroundColor: 'red', borderRadius: 20, justifyContent: 'center', width: '100%'}}>
				<Text style={{color: '#FFF', fontWeight: '700', fontSize: 40, width:'95%',
				paddingBottom: 30,paddingTop: 30, marginLeft: '25%', marginRight: '25%' }}>Incorreto <FontAwesome5 name="headphones-alt" size={25} color="#E5E5E5" /></Text>
							
				</TouchableOpacity>

				<TouchableOpacity onPress={() => resetTelaTreino()}
				style={{ alignItems: 'center' ,backgroundColor: 'red', borderRadius: 20, 
				justifyContent: 'center', alignItems: 'center', width: '80%', marginTop: '10%'}}>
							<Text style={{color: '#000', fontWeight: '700', fontSize: 20}}>Tentar Novamente</Text>
				</TouchableOpacity>
				</View>
				
			}
			
			

			{ /* 
			backup css: 

				<View style={{marginTop: '25%', width: '98%', marginLeft: '1%', marginRight: '1%'}}>
				<TouchableOpacity onPress={()=> {return playSound(`https://stream-audio-react-native.herokuapp.com/tracks/${exercicio?.id_audio}`)}}
				style={{flexDirection: 'row', justifyContent: 'center' ,backgroundColor: 'red', borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
							<Text style={{color: '#FFF', fontWeight: '700', fontSize: 40,
							paddingBottom: 30, paddingLeft: 30, paddingTop: 30, paddingRight: 10}}>Incorreto</Text>
							<FontAwesome5 name="headphones-alt" size={25} color="#E5E5E5" />
				</TouchableOpacity>

				
				</View>

				<View style={{marginTop: '30%', width: '98%', marginLeft: '1%', marginRight: '1%'}}>
			<TouchableOpacity onPress={()=> {return playSound(`https://stream-audio-react-native.herokuapp.com/tracks/${exercicio?.id_audio}`)}}
			style={{flexDirection: 'row', justifyContent: 'center' ,backgroundColor: '#4d9e4d', borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{color: '#FFF', fontWeight: '700', fontSize: 40,
						paddingBottom: 30, paddingLeft: 30, paddingTop: 30, paddingRight: 10}}>Correto</Text>
						<FontAwesome5 name="headphones-alt" size={25} color="#E5E5E5" />
					</TouchableOpacity>
			</View>



				phoneValue, setPhoneValue
				
			<TouchableOpacity onPress={startRecognizing}>
						<FontAwesome5 name="headphones-alt" size={60} color="#E5E5E5" />
					</TouchableOpacity>

					<TouchableOpacity onPress={startRecognizing}>
						<FontAwesome5 name="microphone-alt" size={60} color="#E5E5E5" />
					</TouchableOpacity>


				*/
			} 
			
               

				
            </ScrollView>
			<View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: '5%', marginLeft: '5%', marginBottom: '3%'}}>
				{pages !== 1 ? (
					<TouchableOpacity onPress={funcaoPreveios} style={{backgroundColor: '#E5E5E5', padding: 10, borderRadius: 5}}>
					<Text style={{fontSize: 20, fontWeight: '700', color: "#000000"}}>Previous</Text>
					</TouchableOpacity> ) : (
						<TouchableOpacity>
						
						</TouchableOpacity>
					)
				}
					
					<TouchableOpacity onPress={funcaoNext} style={{backgroundColor: '#E5E5E5', padding: 10, borderRadius: 5, width: '30%', alignItems: 'center'}}>
						<Text style={{fontSize: 20, fontWeight: '700', color: "#000000"}}>Next</Text>
					</TouchableOpacity>
				</View>
        </View>

		)
	}

	const NaoSelecionouAprendizado = () => {
		return (
			<View style={{ backgroundColor: "#6877e8", height: '100%', flexDirection: 'column', justifyContent: 'center'}}>
				<View style={{alignItems: 'center'}}>
					<Text style={{color: '#FFF', fontWeight: 'bold'}}>Você não selecionou o que deseja aprender</Text>
				</View>

				<View>
				<TouchableOpacity style={{marginTop: '8%' ,borderRadius: 40,width: '80%', marginLeft: '10%', marginRight: '10%', height: 50, 
                backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center',}} onPress={() => navigation.reset({index: 0, routes: [{name: 'O que vamos aprender hoje?', params: { renderizar: true}  }],  }) }>
                    <Text style={{fontSize: 20, fontWeight: '700', color: "#0b0e26"}}>Clique aqui para selecionar</Text>
            </TouchableOpacity>
				</View>
				
			
			
			
			</View>
		)
		
	}
	// navigation.navigate('Home')
	
	const InicioTreinamento = () => {

		return (


			<View style={styles.container}>
				<Text style={styles.titleText}>
					Speech to Text T
				</Text>
				<Text style={styles.textStyle}>
					Pressione o microphone para falar
				</Text>
				<TouchableHighlight onPress={startRecognizing}>
					<Image
						style={styles.imageButton}
						source={{
							uri:
								'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',
						}}
					/>
				</TouchableHighlight>
				<Text style={styles.textStyle}>
					Partial Results
				</Text>
				<ScrollView>
					{partialResults.map((result, index) => {
						return (
							<Text
								key={`partial-result-${index}`}
								style={styles.textStyle}>
								{result}
							</Text>
						);
					})}
				</ScrollView>
				<Text style={styles.textStyle}>
					Results
				</Text>
				<ScrollView style={{marginBottom: 20}}>
					{results.map((result, index) => {
						return (
							<Text
								key={`result-${index}`}
								style={styles.textStyle}>
								{result}
							</Text>
						);
					})}
				</ScrollView>
			<View style={styles.horizontalView}>
					<TouchableHighlight
						onPress={stopRecognizing}
						style={styles.buttonStyle}>
						<Text style={styles.buttonTextStyle}>
							Parar
						</Text>
					</TouchableHighlight>
					<TouchableHighlight
						onPress={cancelRecognizing}
						style={styles.buttonStyle}>
						<Text style={styles.buttonTextStyle}>
							Cancelar
						</Text>
					</TouchableHighlight>
					<TouchableHighlight
						onPress={destroyRecognizer}
						style={styles.buttonStyle}>
						<Text style={styles.buttonTextStyle}>
							Limpar
						</Text>
					</TouchableHighlight>
				</View>
			<View>
			<Text style={styles.titleText}>
					Minha Fala do texto 
				</Text>
				<Text style={styles.textStyle}>
					Pressione o botão para ouvir:
				</Text>

			

				<Button
				onPress={handleVoice}
				title="Ouvir agora"

				/>



			</View>
			</View>
		)
	}

	

	return (

		<View>
		{loadingApi &&
		<View style={{backgroundColor: "#6877e8", height: '100%', width: '100%',}}>
			 <ActivityIndicator color="#FFF"  size="large" style={{marginTop: '45%'}}  />

		</View> }
		<SafeAreaView>
		
			{!props.route.params?.aprender ?  <NaoSelecionouAprendizado/>  : <AprendizadoSelecionado/>}
			
			
		</SafeAreaView>
		</View>
	);
};

export default Speech;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//height: '80%',
		flexDirection: 'column',
		alignItems: 'center',
		padding: 5,
		backgroundColor: '#6877e8'
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10,
	},
	titleText: {
		fontSize: 22,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	buttonStyle: {
		flex: 1,
		justifyContent: 'center',
		marginTop: 15,
		padding: 10,
		backgroundColor: '#8ad24e',
		marginRight: 2,
		marginLeft: 2,
	},
	buttonTextStyle: {
		color: '#fff',
		textAlign: 'center',
	},
	horizontalView: {
		flexDirection: 'row',
		position: 'absolute',
		bottom: 0,
	},
	textStyle: {
		textAlign: 'center',
		padding: 12,
	},
	imageButton: {
		width: 50,
		height: 50,
	},
	textWithSpaceStyle: {
		flex: 1,
		textAlign: 'center',
		color: '#B0171F',
	},
	backMicrofoneTrue : {
		//backgroundColor: '#4cba2f', 
		width: '20%', 
		borderRadius: 50, 
		alignItems: 'center'
		
	},
	backMicrofoneFalse : {
		width: '20%', 
		borderRadius: 50, 
		alignItems: 'center'
	},
	backPhone : {
		width: '25%', 
		alignItems: 'center'
	}
});


const audioList = [
	/*	{ // CASO QUEIRA PASSAR AUDIO LOCAL MP3
			title: 'Play mp3 from local',
			isRequired: true,
			url: require('./nodeDoArquivo.mp3')
		} */
		{
			title: 'Play mp3 from local',
			url:'https://stream-audio-react-native.herokuapp.com/tracks/619707781808ae261848eb54'
		}
	]
	let url = 'https://stream-audio-react-native.herokuapp.com/tracks/619707781808ae261848eb54'