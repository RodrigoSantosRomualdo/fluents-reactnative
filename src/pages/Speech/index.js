// Speech to Text Conversion in React Native – Voice Recognition
import React, {useState, useEffect} from 'react';
import Tts from 'react-native-tts';
import apiComparaText from '../../services/compareText';
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
	ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SoundPlayer from 'react-native-sound-player'
import Sound from 'react-native-sound';
import { speechStyle } from './speechStyle'

import Voice from 'react-native-voice';
	let audio;
	
const Speech = ( props ) => {
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

	const [pitch, setPitch] = useState('');
	const [error, setError] = useState('');
	const [end, setEnd] = useState('');
	const [started, setStarted] = useState('');
	const [results, setResults] = useState([]);
	const [partialResults, setPartialResults] = useState([]);
	const [resultApiString, setResultApiString] = useState();
	const [microphoneValue, setMicrophoneValue] = useState(false)
	const [phoneValue, setPhoneValue] = useState(false)

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
		setStarted('√');
	};

	const onSpeechEnd = (e) => {
		//Invoked when SpeechRecognizer stops recognition
		//console.log('onSpeechEnd: ', e);
		//console.log('FINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUI')
		//console.log('VALUE results: ', results)
		console.log('onSpeechEnd')
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

	const onSpeechResults = (e) => {
		//Invoked when SpeechRecognizer is finished recognizing
		//console.log('onSpeechResults: ', e);
		console.log('onSpeechResults')
		const textingles =  "days of the week";
		setResults(e.value);
		
		console.log('CHAMOU API AGORA', )
		
		compareText(textingles, e.value)
	};

	const onSpeechPartialResults = (e) => {
		//Invoked when any results are computed
		//console.log('onSpeechPartialResults: ', e);
		setPartialResults(e.value);
		console.log('onSpeechPartialResults')
		//compareText()
	};

	const onSpeechVolumeChanged = (e) => {
		//Invoked when pitch that is recognized changed
		//console.log('onSpeechVolumeChanged: ', e);
		//console.log('onSpeechVolumeChanged')
		setPitch(e.value);
	};

	const startRecognizing = async () => {
		//Starts listening for speech for a specific locale
		setMicrophoneValue(true)
		try {
			await Voice.start('en-US');
			//await Voice.start('pt-BR');
			setPitch('');
			setError('');
			setStarted('');
			setResults([]);
			setPartialResults([]);
			setEnd('');
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

	const compareText = async (textIngles,textUserString) => {
		// resultApiString, setResultApiString
		console.log('CHAMOU COMPARE TEXT' , textIngles)
		console.log('results textString: ', textUserString)
		let teste = ["days of the week"]
		const response = await  apiComparaText.post("",
		 {
			textIngles: textIngles, 
			speechTextUser : textUserString
		})
		setResultApiString(response.data)
		console.log(response.data)
		console.log('USESTATE: ', resultApiString)

		setMicrophoneValue(false)
	}
	// microphoneValue, setMicrophoneValue
	const AprendizadoSelecionado = () => {

		return (
			<View style={{backgroundColor: '#6877e8' , height: '100%'}}>
            <ScrollView style={{margin: '1%'}}>

			<View style={{alignItems: 'center', marginTop: '10%' }}>
				<TouchableOpacity style={{marginTop: '5%', backgroundColor: '#E5E5E5', padding: 10, borderRadius: 5, width: '90%'}}>
					<Text style={{backgroundColor: '#E5E5E5', fontWeight: '500', color: "#0b0e26", fontSize: 20}}>The day before yesterday</Text>
					<Text style={{backgroundColor: '#E5E5E5', fontWeight: '500', color: "#0b0e26", fontSize: 12}}>Dias da semana</Text>
				</TouchableOpacity>


				<TouchableOpacity style={{marginTop: '5%', backgroundColor: '#E5E5E5', padding: 7, borderRadius: 5, width: '88%',}}>
					<Text style={{backgroundColor: '#E5E5E5', fontWeight: '300', color: "#0b0e26", fontSize: 18}}>Dêis óv dâ uík</Text>
				</TouchableOpacity>

			</View>

			<View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: '35%'}}>
					
					{phoneValue === false ? 
					<View style={styles.backPhone}>
						<TouchableOpacity onPress={()=> {return playSound('https://stream-audio-react-native.herokuapp.com/tracks/619707781808ae261848eb54')}}>
						
							<FontAwesome5 name="headphones-alt" size={60} color="#E5E5E5" />
							
						</TouchableOpacity>
						
						</View>  :  <View style={styles.backPhone}>
						 <FontAwesome5 name="assistive-listening-systems" size={25} color="#00ff00" style={{position: 'absolute', 
						alignItems: 'center', justifyContent: 'center', marginTop: '18%'}} />

						<TouchableOpacity onPress={()=> {return playSound('https://stream-audio-react-native.herokuapp.com/tracks/619707781808ae261848eb54')}}>

							<FontAwesome5 name="headphones-alt" size={75} color="#E5E5E5" />
							
						</TouchableOpacity>

						</View> }



					<View style={[microphoneValue ? styles.backMicrofoneTrue : styles.backMicrofoneFalse]}>
						{microphoneValue && <ActivityIndicator style={{position: 'absolute'}} size="large" color="#00ff00" />}
					<TouchableOpacity onPress={startRecognizing}>
						<FontAwesome5 name="microphone-alt" size={60} color="#E5E5E5" />
					</TouchableOpacity>
					</View>
			</View>

			{ /* 
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
			<View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: '1%', marginLeft: '1%', marginBottom: '1%'}}>
					<TouchableOpacity style={{backgroundColor: '#E5E5E5', padding: 10, borderRadius: 5}}>
						<Text style={{fontSize: 20, fontWeight: '700', color: "#0b0e26"}}>Previous</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{backgroundColor: '#E5E5E5', padding: 10, borderRadius: 5, width: '30%', alignItems: 'center'}}>
						<Text style={{fontSize: 20, fontWeight: '700', color: "#0b0e26"}}>Next</Text>
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
                backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center',}} onPress={() => navigation.navigate('O que vamos aprender hoje?')}>
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
		<SafeAreaView>
			{!props.route.params?.aprender ?  <NaoSelecionouAprendizado/>  : <AprendizadoSelecionado/>}
			
			
		</SafeAreaView>
		
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
		backgroundColor: '#4cba2f', 
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
