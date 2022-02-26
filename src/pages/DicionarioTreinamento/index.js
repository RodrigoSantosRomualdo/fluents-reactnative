import React, {useState, useEffect} from 'react';
import { Image, Dimensions, Button, FlatList,Modal, Pressable , TextInput, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const {width} = Dimensions.get('window');
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Sound from 'react-native-sound';

export default function DicionarioTreinamento(props) {
    console.log(props.route.params.tema)
    const navigation = useNavigation();

    const [phoneValue, setPhoneValue] = useState(false)

    const dataNameDicionario = [
        { nome: "Primeiro"},
        { nome: "Segundo"},
        { nome: "Terceiro"},
    ] 

    const [data, setData] = useState([
        { id: 0, full_name: 'RRRRRRRRRRepo 1111', uri: 'https://picsum.photos/id/1011/200', cor: '#FF6633', palavras: '50 palavras', tema: "Para guias turísticos", textoLivre: "Dicionário"}, 
        { id: 1, full_name: 'RRRRRRRRRRRepo 2222', uri: 'https://picsum.photos/id/1011/200', cor: '#FFB399', palavras: '60 palavras', tema: "Arquitetura", textoLivre: "Dicionário"},
        { id: 2, full_name: 'RRRRRRRRRRRepo 33333', uri: 'https://picsum.photos/id/1011/200', cor: '#FF33FF', palavras: '70 palavras', tema: "Doenças", textoLivre: "Dicionário"},
        { id: 3, full_name: 'RRRRRRRRRRRepo 44444', uri: 'https://picsum.photos/id/1011/200', cor: '#FFFF99', palavras: '40 palavras', tema: "Teste 111", textoLivre: "Dicionário"},
        { id: 4, full_name: 'RRRRRRRRRRRepo 55555', uri: 'https://picsum.photos/id/1011/200', cor: '#00B3E6', palavras: '30 palavras', tema: "Teste 222", textoLivre: "Dicionário"},
      ])

      function playSound(url) {
        setPhoneValue(true)
        console.log('ENTROU AQUI playSound')
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

    return (
        <View style={{marginTop: '5%', height: '100%'}}>

            <View style={{flexDirection: 'row'}} >
                <TouchableOpacity style={{marginRight: '5%', marginLeft: '5%'}} onPress={() => navigation.navigate('DicionarioLista',{tema: props.route.params.tema})}> 
                    <Ionicons name="arrow-back" size={40} color="#000" />
                </TouchableOpacity>
                <Text style={{fontSize: 25, fontWeight: '600', marginLeft: '5%'   }}>{props.route.params.tema}</Text>
            </View>

            
            
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={{backgroundColor: '#FFF', width: '100%', height: '85%', flexDirection: 'column', justifyContent: 'flex-start'}}>

                        <View style={{flexDirection: 'row',justifyContent: 'center', marginTop: '15%'}}>
                        <Image style={{width: 125, height: 60}} source={{uri: 'https://img.elo7.com.br/product/main/1F61333/adesivo-decorativo-parede-buraco-tam-grande-qualquer-imagem.jpg'}}/>
                        </View>

                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '5%'}}>
                            <View><Text style={{fontWeight: '700', fontFamily: 'Times New Roman', fontSize: 25}}>{item.tema}</Text></View>
                            <View><Text style={{fontWeight: '600', marginTop: '10%', fontSize: 20 }}>{item.textoLivre}</Text></View>
                            <View>
                            <TouchableOpacity onPress={()=> {return playSound(`https://stream-audio-react-native.herokuapp.com/tracks/${exercicio?.id_audio}`)}}>

                            <FontAwesome5 name="headphones-alt" size={75} color="#00ff00" />

                            </TouchableOpacity>
                            </View>
                            
                            
                            
                        </View>
                    
                    </View>
               
                )}
            />
            
        
        </View>
    )
   
}

// onPress={() => navigation.navigate('DicionarioLista',{tema: item.tema})}

//<Image style={{width: 125, height: 60}} source={{uri: 'https://img.elo7.com.br/product/main/1F61333/adesivo-decorativo-parede-buraco-tam-grande-qualquer-imagem.jpg'}}/>
// 
/*

<View style={{marginTop: '2%'}}>
                <ScrollView 
                horizontal={true}  style={{flexDirection: 'row', }}>

                
                <TouchableOpacity style={{backgroundColor: 'red', paddingEnd: '5%'}}>
                <Image style={{width: '100%', height: '45%',}} source={{uri: 'https://img.elo7.com.br/product/main/1F61333/adesivo-decorativo-parede-buraco-tam-grande-qualquer-imagem.jpg'}}/>
                <Text style={{fontWeight: '700', fontFamily: 'Times New Roman' }}>Para guias turísticos</Text>
                <Text style={{fontWeight: '700', }}>Dicionário</Text>
                <Text style={{fontWeight: '600'}}>70 palavras</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor: 'green', paddingEnd: '5%'}}>
                <Image style={{width: '100%', height: '45%',}} source={{uri: 'https://img.elo7.com.br/product/main/1F61333/adesivo-decorativo-parede-buraco-tam-grande-qualquer-imagem.jpg'}}/>
                <Text style={{fontWeight: '700', fontFamily: 'Times New Roman' }}>Para guias turísticos</Text>
                <Text style={{fontWeight: '700', }}>Dicionário</Text>
                <Text style={{fontWeight: '600'}}>70 palavras</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor: '#FFF', paddingEnd: '5%'}}>
                <Image style={{width: '100%', height: '45%',}} source={{uri: 'https://img.elo7.com.br/product/main/1F61333/adesivo-decorativo-parede-buraco-tam-grande-qualquer-imagem.jpg'}}/>
                <Text style={{fontWeight: '700', fontFamily: 'Times New Roman' }}>Para guias turísticos</Text>
                <Text style={{fontWeight: '700', }}>Dicionário</Text>
                <Text style={{fontWeight: '600'}}>70 palavras</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor: '#FFF', paddingEnd: '5%'}}>
                <Image style={{width: '100%', height: '45%',}} source={{uri: 'https://img.elo7.com.br/product/main/1F61333/adesivo-decorativo-parede-buraco-tam-grande-qualquer-imagem.jpg'}}/>
                <Text style={{fontWeight: '700', fontFamily: 'Times New Roman' }}>Para guias turísticos</Text>
                <Text style={{fontWeight: '700', }}>Dicionário</Text>
                <Text style={{fontWeight: '600'}}>70 palavras</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor: '#FFF', paddingEnd: '5%'}}>
                <Image style={{width: '100%', height: '45%',}} source={{uri: 'https://img.elo7.com.br/product/main/1F61333/adesivo-decorativo-parede-buraco-tam-grande-qualquer-imagem.jpg'}}/>
                <Text style={{fontWeight: '700', fontFamily: 'Times New Roman' }}>Para guias turísticos</Text>
                <Text style={{fontWeight: '700', }}>Dicionário</Text>
                <Text style={{fontWeight: '600'}}>70 palavras</Text>
                </TouchableOpacity>
                
                </ScrollView>

            </View>
*/


/*
 <TouchableOpacity style={{backgroundColor: 'red', width: '40%', }}>
                        <Image style={{width: '20%', height: '50%', marginBottom: '3%'}} source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}/>
                        <Text style={{fontWeight: '700', fontFamily: 'Times New Roman', marginBottom: '3%' }}>Para guias turísticos</Text>
                        <Text style={{fontWeight: '700', marginBottom: '1%'}}>Dicionário</Text>
                        <Text style={{fontWeight: '600'}}>70 palavras</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor: 'green', width: '40%', }}>
                        <Image style={{width: '20%', height: '50%', marginBottom: '3%'}} source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}/>
                        <Text style={{fontWeight: '700', fontFamily: 'Times New Roman', marginBottom: '3%' }}>Para guias turísticos</Text>
                        <Text style={{fontWeight: '700', marginBottom: '1%'}}>Dicionário</Text>
                        <Text style={{fontWeight: '600'}}>70 palavras</Text>
                    </TouchableOpacity>

*/