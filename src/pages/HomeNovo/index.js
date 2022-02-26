import React, {useEffect, useState  } from 'react';
import { View, Text, Alert, ScrollView, FlatList, TouchableOpacity, Modal, Pressable, Button, TextInput, StyleSheet  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Home from '../Home';

export default function HomeNovo() {
    
    const navigation = useNavigation();

    return (
        <View style={{backgroundColor: '#6877e8', width: '100%', height: '100%'}} >

            <Home />

           
        </View>
    )
}

/*
 <View style={{flexDirection: 'row',justifyContent: 'center', marginTop: '15%'}}>

                <Text style={{backgroundColor: 'green', fontSize: 20, width: '90%', textAlign: 'center', borderRadius: 7, marginBottom: 20}}>Plano diário Fluents</Text>

            </View>
            
            <View style={{margin: '5%'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Home',{})} style={{backgroundColor: '#FFF', height: 100, width: '100%', borderRadius: 10,
            marginBottom: '5%' }}>
                    <Text>Treino Compreensão oral </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor: '#FFF', height: 100, width: '100%', borderRadius: 10 }}>
                    <Text>Treino de gramática </Text>
                </TouchableOpacity>

            
            </View>
*/