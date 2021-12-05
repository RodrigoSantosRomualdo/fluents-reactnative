import React, {useEffect, useState  } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Modal, Pressable, Button, TextInput, StyleSheet  } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { homeStyle } from './homeStyle';
import apiTemas from './../../services/temas';
import { useNavigation } from '@react-navigation/native';

export default function Home( props ) {
    console.log('PROPS navigation ------------------->>>>>>>>>>>>>>>>>>>>>>. ', props?.route?.params)
    const navigation = useNavigation();
    const [temas, setTemas] = useState();
    const [modalVisibleNivel, setModalVisibleNivel] = useState(false);
    const [temasNivel, setTemasNivel] = useState();
    const [temaEscolhido, setTemaEscolhido] = useState();

  /*  useEffect(() => {
        (async () => {
            const resultTemas = await apiTemas.post('tema/buscar')
           // console.log('resultTemas.data ',resultTemas.data[0].nome)
            setTemas(resultTemas.data)
            console.log('Recarregou o USEEFFECT HOME')
        })();
    }, [true]) */

    useEffect(() => {
      (async () => {
          await setTemas();
          await setTemasNivel();
          await setTemaEscolhido();

          console.log('------ CHAMOU O USEEFFECT QUANDO VOLTA DA TELA SPEECH ------')
          const resultTemas = await apiTemas.post('tema/buscar')
         // console.log('resultTemas.data ',resultTemas.data[0].nome)
          setTemas(resultTemas.data)
          console.log('Recarregou o USEEFFECT HOME')
      })();
  }, [props?.route?.params?.renderizar])



    

    async function modalTrue(temaSelecionado) {
        setModalVisibleNivel(true)
        console.log('temaEscolhido: ',temaSelecionado)
        setTemaEscolhido(temaSelecionado)
        const resultTemas = await apiTemas.post('tema-nivel/buscar',{ tema_aprendizado: temaSelecionado } )
           // console.log('resultTemas.data ',resultTemas.data[0].nome)
           setTemasNivel(resultTemas.data)
        //navigation.navigate('Exercise Page', {aprender: })
    }

    async function sendSpeech(nivel_disponivel, ordem) {
      console.log('nivel_disponivel ', nivel_disponivel)
      await setModalVisibleNivel(false)
      //await setTemas(false)
      await setTemasNivel(false)

      navigation.navigate('Exercise Page', {aprender: temaEscolhido, nivel_disponivel: nivel_disponivel, nivel_number: ordem })
    }


    if(modalVisibleNivel) {
        return <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleNivel}
          onRequestClose={() => {
            //Alert.alert("AA Modal has been closed.");
            setModalVisibleNivel(!modalVisibleNivel);
          }}
        >
          <View style={stylesCreate.centeredView}>
            <View style={stylesCreate.modalView}>
              <Text style={stylesCreate.modalText}>Selecione o Nível {}</Text>
      
              {temasNivel && 
                 <FlatList 
                 data={temasNivel}
                 keyExtractor={(item) => item._id.toString()}
                 style={{width: '100%'}}
                 showsHorizontalScrollIndicator={false}
                 renderItem={({ item }) => (
                    <TouchableOpacity style={{marginTop: '5%' ,borderRadius: 35,width: '80%', marginLeft: '10%', marginRight: '10%', height: 50, 
                    backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center',}} 
                    onPress={() => sendSpeech(item.nivel_disponivel, item.ordem)}>
                        <Text style={{fontSize: 20, fontWeight: '700', color: "#0b0e26"}}>{item.nivel_disponivel}</Text>
                    </TouchableOpacity>
                 )}                
                 />
            }
            
            </View>
          </View>
        </Modal>
      }

      /*
                   <Text>Selecione o que vamos aprender</Text>
<TouchableOpacity style={{marginTop: '8%' ,borderRadius: 40,width: '80%', marginLeft: '10%', marginRight: '10%', height: 50, 
                backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center',}} onPress={() => navigation.navigate('Exercise Page', {aprender: 'First meeting'})}>
                    <Text style={{fontSize: 20, fontWeight: '700', color: "#0b0e26"}}>First meeting</Text>
                </TouchableOpacity>
                

      */

    return(
        <View style={homeStyle.container}>
   



            {!temas && 
                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: '50%'}}>
                    <ActivityIndicator color="#FFF"  size="large"  />
                </View>
            }

            {temas && 
                
                 <FlatList 
                 data={temas}
                 keyExtractor={(item) => item._id.toString()}
                 showsHorizontalScrollIndicator={false}
                 
                 renderItem={({ item }) => (
                   
                    <TouchableOpacity style={{marginTop: '8%' ,borderRadius: 40,width: '80%', marginLeft: '10%', marginRight: '10%', height: 50, 
                    backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center',}} onPress={() => modalTrue(item.nome) }>
                        <Text style={{fontSize: 20, fontWeight: '700', color: "#0b0e26"}}>{item.nome}</Text>
                    </TouchableOpacity>
                 )}                
                 />
            }
           
        </View>
    )
}


const stylesCreate = StyleSheet.create({
    centeredView: {
      
      justifyContent: "center",
      alignItems: "center",
      //marginTop: 22,
      height: '100%',
      backgroundColor: '#040E2C'
    },
    centeredView2: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 0,
      height: 20,
      flex: 1, height: '100%',
      backgroundColor: '#6877e8'
      
    },
    modalView: {
      margin: 0,
      backgroundColor: "#6877e8",
      width: '100%',
      height: '100%',
      borderRadius: 20,
      padding: 2,
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
    modalView2: {
      margin: 20,
      //backgroundColor: "white",
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
    
    buttonClose: {
      backgroundColor: "#FFFFFF",
    },
    textStyle: {
      color: "#8B80FC",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 0,
      //textAlign: '',
      fontSize: 21,
      color: '#FFFFFF',
      fontWeight: '700'
    },
  
});

/*

 <ScrollView>
                


                <TouchableOpacity style={{marginTop: '8%' ,borderRadius: 40,width: '80%', marginLeft: '10%', marginRight: '10%', height: 50, 
                backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center',}} onPress={() => navigation.navigate('Exercise Page', {aprender: 'First meeting'})}>
                    <Text style={{fontSize: 20, fontWeight: '700', color: "#0b0e26"}}>First meeting</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: '8%' ,borderRadius: 40,width: '80%', marginLeft: '10%', marginRight: '10%', height: 50, backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{fontSize: 20, fontWeight: '700', color: "#0b0e26"}} onPress={() => navigation.navigate('Exercise Page')}>What’s your name?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: '8%' ,borderRadius: 40,width: '80%', marginLeft: '10%', marginRight: '10%', height: 50, backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{fontSize: 20, fontWeight: '700', color: "#0b0e26"}}>Alphabet - Spell</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: '8%' ,borderRadius: 40,width: '80%', marginLeft: '10%', marginRight: '10%', height: 50, backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{fontSize: 20, fontWeight: '700', color: "#0b0e26"}}>Greetings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: '8%' ,borderRadius: 40,width: '80%', marginLeft: '10%', marginRight: '10%', height: 50, backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{fontSize: 20, fontWeight: '700', color: "#0b0e26"}}>People</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: '8%' ,borderRadius: 40,width: '80%', marginLeft: '10%', marginRight: '10%', height: 50, backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{fontSize: 20, fontWeight: '700', color: "#0b0e26"}}>Countries and Continents</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: '8%' ,borderRadius: 40,width: '80%', marginLeft: '10%', marginRight: '10%', height: 50, backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{fontSize: 20, fontWeight: '700', color: "#0b0e26"}}>Nationalities</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: '8%' ,borderRadius: 40,width: '80%', marginLeft: '10%', marginRight: '10%', height: 50, backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{fontSize: 20, fontWeight: '700', color: "#0b0e26"}}>Personal data</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: '8%' ,borderRadius: 40,width: '80%', marginLeft: '10%', marginRight: '10%', height: 50, backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{fontSize: 20, fontWeight: '700', color: "#0b0e26"}}>Numbers</Text>
                </TouchableOpacity>
            </ScrollView>





    const [optionsListCombustivel, setOptionsListCombustivel] = useState([{id: 1, texto: 'Gasolina'},{id: 2, texto: 'Gasolina Aditivada'},{id: 3, texto: 'Etanol'},{id: 4, texto: 'Diesel'},{id: 5, texto: 'GNV'}])


              <FlatList
                data={optionsListCombustivel}
                keyExtractor={(item) => item.id.toString()}
                style={{width: '95%', height: '80%', borderTopColor: '#EBE8EA', borderTopWidth: 2, marginTop: '7%', }}
                showsVerticalScrollIndicator ={false}
                renderItem={({ item }) => (
                  <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: '2%'}} >
                  <TouchableOpacity style={{width: '90%', height: 70, backgroundColor: '#8B80FC', borderRadius: 39, marginLeft: '5%',
                      flexDirection: 'row', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' } }>
                  <View style={{padding: 5}}>
                    <Text style={{color: '#FFF', fontSize: 20, fontWeight: 'bold', marginLeft: 30 }}>{item.texto}</Text>
                  </View>
                  
                  <TouchableOpacity style={{justifyContent: 'center', width: '20%', marginLeft: '5%' }}>
                     <Text>AA</Text>
                  </TouchableOpacity>
                    </TouchableOpacity> 
              </View>
            
                )}
            />





*/