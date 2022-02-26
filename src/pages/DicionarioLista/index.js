import React, {useState, useEffect} from 'react';
import { Image, Dimensions, Button, FlatList,Modal, Pressable , TextInput, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const {width} = Dimensions.get('window');

export default function DicionarioLista(props) {

    console.log('props: ', props.route.params.tema)
    const navigation = useNavigation();

    const dataNameDicionario = [
        { nome: "Primeiro"},
        { nome: "Segundo"},
        { nome: "Terceiro"},
    ] 

    const [data, setData] = useState([
        { id: 0,  uri: 'https://picsum.photos/id/1011/200', cor: '#FF6633', palavras: '50 palavras', tema: "Para guias turísticos", textoLivre: "Dicionário"}, 
        { id: 1,  uri: 'https://picsum.photos/id/1011/200', cor: '#FFB399', palavras: '60 palavras', tema: "Arquitetura", textoLivre: "Dicionário"},
        { id: 2,  uri: 'https://picsum.photos/id/1011/200', cor: '#FF33FF', palavras: '70 palavras', tema: "Doenças", textoLivre: "Dicionário"},
        { id: 3,  uri: 'https://picsum.photos/id/1011/200', cor: '#FFFF99', palavras: '40 palavras', tema: "Teste 111", textoLivre: "Dicionário"},
        { id: 4,  uri: 'https://picsum.photos/id/1011/200', cor: '#00B3E6', palavras: '30 palavras', tema: "Teste 222", textoLivre: "Dicionário"},
        { id: 5,  uri: 'https://picsum.photos/id/1011/200', cor: '#FF6633', palavras: '50 palavras', tema: "Para guias turísticos", textoLivre: "Dicionário"}, 
        { id: 6,  uri: 'https://picsum.photos/id/1011/200', cor: '#FFB399', palavras: '60 palavras', tema: "Arquitetura", textoLivre: "Dicionário"},
        { id: 7,  uri: 'https://picsum.photos/id/1011/200', cor: '#FF33FF', palavras: '70 palavras', tema: "Doenças", textoLivre: "Dicionário"},
        { id: 8,  uri: 'https://picsum.photos/id/1011/200', cor: '#FFFF99', palavras: '40 palavras', tema: "Teste 111", textoLivre: "Dicionário"},
        { id: 9,  uri: 'https://picsum.photos/id/1011/200', cor: '#00B3E6', palavras: '30 palavras', tema: "Teste 222", textoLivre: "Dicionário"},
        { id: 10,  uri: 'https://picsum.photos/id/1011/200', cor: '#FF6633', palavras: '50 palavras', tema: "Para guias turísticos", textoLivre: "Dicionário"}, 
        { id: 11,  uri: 'https://picsum.photos/id/1011/200', cor: '#FFB399', palavras: '60 palavras', tema: "Arquitetura", textoLivre: "Dicionário"},
        { id: 12,  uri: 'https://picsum.photos/id/1011/200', cor: '#FF33FF', palavras: '70 palavras', tema: "Doenças", textoLivre: "Dicionário"},
        { id: 13,  uri: 'https://picsum.photos/id/1011/200', cor: '#FFFF99', palavras: '40 palavras', tema: "Teste 111", textoLivre: "Dicionário"},
        { id: 14,  uri: 'https://picsum.photos/id/1011/200', cor: '#00B3E6', palavras: '30 palavras', tema: "Teste 222", textoLivre: "Dicionário"},
    ])

    return (
        <View style={{marginTop: '5%', height: '95%'}}>

            <View style={{flexDirection: 'row'}} >
                <TouchableOpacity style={{marginRight: '5%', marginLeft: '5%'}} onPress={() => navigation.navigate('Dicionario',{})}> 
                    <Ionicons name="arrow-back" size={38} color="#000" />
                </TouchableOpacity>
                <Text style={{fontSize: 25, fontWeight: '700', marginLeft: '5%'   }}>{props.route.params.tema}</Text>
            </View>

            
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
              
                renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigation.navigate('DicionarioTreinamento',{tema: props.route.params.tema})} style={{
                    borderRadius: 12,
                    flexDirection: 'row',
                    marginTop: '2%',
                    backgroundColor: '#FFF',
                    borderTopWidth: 1
                    }}> 
                        <View style={{width: '20%', height: '50%'}}>
                            <Image style={{width: 60, height: 40, margin: '7%'}} source={{uri: 'https://img.elo7.com.br/product/main/1F61333/adesivo-decorativo-parede-buraco-tam-grande-qualquer-imagem.jpg'}}/>
                        </View>
                    
                        <View style={{width: '80%'}}>
                            <Text style={{fontWeight: '700', marginBottom: '1%', fontSize: 20}}>{item.textoLivre}</Text>
                            <Text style={{fontWeight: '600',}}>{item.palavras}</Text>
                        </View>
                </TouchableOpacity>
                )}
            />
            
        
        </View>
    )
   
}
