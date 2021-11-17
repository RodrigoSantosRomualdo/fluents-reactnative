import React from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { homeStyle } from './homeStyle';

export default function Home({ navigation }) {
    return(
        <View style={homeStyle.container}>
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
        </View>
    )
}

