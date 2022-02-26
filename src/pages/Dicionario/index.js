import React, {useState, useEffect} from 'react';
import { Image, Dimensions, Button, FlatList,Modal, Pressable , TextInput, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const {width} = Dimensions.get('window');

export default function Dicionario() {

    const navigation = useNavigation();

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

    return (
        <View style={{marginTop: '5%', height: '100%'}}>

            <View style={{flexDirection: 'row'}} >
                <TouchableOpacity style={{marginRight: '5%', marginLeft: '5%'}} onPress={() => navigation.navigate('HomeNovo',{})}> 
                    <Ionicons name="arrow-back" size={40} color="#000" />
                </TouchableOpacity>
                <Text style={{fontSize: 30, fontWeight: '700', marginLeft: '15%'   }}>Dicionário</Text>
            </View>

            
            
            <ScrollView>


            <View style={{marginTop: '5%'}}>
                    <Text style={{fontSize: 15, fontWeight: '700', padding: 10  }}>{dataNameDicionario[0].nome}</Text>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                snapToOffsets={[...Array(data.length)].map(
                    (x, i) => i * (width * 0.8 - 40) + (i - 1) * 40,
                )}
                horizontal={true}
                snapToAlignment={'start'}
                scrollEventThrottle={16}
                decelerationRate="fast"
                renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigation.navigate('DicionarioLista',{tema: item.tema})} style={{
                    backgroundColor: item.cor, 
                    height: width /2.5, 
                    width: width * 0.8 - 20,
                    marginHorizontal: 10,
                    borderRadius: 12,
                    justifyContent: 'center',
                    flexDirection: 'row'
                    
                    }}
                    
                    > 
                    
                    <View style={{width: '50%'}}>
                    <Image style={{width: '100%', height: '100%'}} source={{uri: 'https://img.elo7.com.br/product/main/1F61333/adesivo-decorativo-parede-buraco-tam-grande-qualquer-imagem.jpg'}}/>

                    </View>

                    <View style={{width: '48%', marginLeft: '2%'}}>
                        <Text style={{fontWeight: '700', fontFamily: 'Times New Roman', marginTop: '5%' }}>{item.tema}</Text>
                        <Text style={{fontWeight: '700', marginTop: '25%'}}>{item.textoLivre}</Text>
                        <Text style={{fontWeight: '600', marginTop: '2%'}}>{item.palavras}</Text>
                    </View>

                </TouchableOpacity>
                )}
            />
            
            </ScrollView>
        
        </View>
    )
   
}

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