import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// NOVAS TELAS
import HomeNovo from './pages/HomeNovo';

// TELAS ANTIGAS

import Login from './pages/Login/index';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import Speech from './pages/Speech';
import CheckoutMP from './pages/CheckoutMP';
import Dicionario from './pages/Dicionario';
import DicionarioLista from './pages/DicionarioLista';
import DicionarioTreinamento from './pages/DicionarioTreinamento';
import Page2 from './pages/Page2';

const Drawer = createDrawerNavigator();

/*
 <Tab.Screen name="Page1" component={Page1} 
            options={{
                tabBarLabel: "trainings",
                tabBarIcon: () => (
                    <Icon name="gas-station-outline" color={'#000'} size={26} />
                    )
                }} 
            />
*/

const HomeTabs = () => {
    return (
        <Tab.Navigator 
        initialRouteName=""
        activeColor={'#E5E5E5'}
        
        barStyle={{backgroundColor: '#6877e8',}}>
            
            <Tab.Screen name="HomeNovo" component={HomeNovo} 
            options={{
                tabBarLabel: "Home",
                tabBarIcon: () => (
                    <Icon name="home-variant-outline" color={'#E5E5E5'} size={24} />
                    )
                }} 
            />

            {/*  
            <Tab.Screen name="Dicionario" component={Dicionario} 
            options={{
                tabBarLabel: "Dicionario",
                tabBarIcon: () => (
                    <Icon name="gas-station-outline" color={'#000'} size={26} />
                    )
                }} 
            /> */}
            <Tab.Screen name="Perfil" component={Perfil} 
            options={{
                tabBarLabel: "Perfil",
                 
                tabBarIcon: () => (
                    <Ionicons name="person-circle-outline" size={24} color={'#E5E5E5'} />
                    )
                }} 
            />


        </Tab.Navigator>
    )
}
/*
   <StatusBar
            barStyle = "default"
            hidden = {false}
            backgroundColor = "#E5E5E5"
            translucent = {false}
            networkActivityIndicatorVisible = {true}
          />
*/

const RoutesOptions = () => {
    return (
             
            <Stack.Navigator>
   
            

              <Stack.Screen
                name="CheckoutMP"
                options={{headerShown: false}}
                component={HomeTabs}
                 />

                <Stack.Screen
                name="Page2"
                component={Page2}
                options={{headerShown: false}}
                />

                <Stack.Screen
                name="Home"
                options={{headerShown: false}}
                component={Home}
                 />

                <Stack.Screen
                name="DicionarioLista"
                options={{headerShown: false}}
                component={DicionarioLista}
                 />

                <Stack.Screen
                name="DicionarioTreinamento"
                options={{headerShown: false}}
                component={DicionarioTreinamento}
                 />

    

    

            </Stack.Navigator>
            
          )
}



/*
<Stack.Navigator>
            <Stack.Screen  name="O que vamos aprender hoje?" component={Home} />
            
            </Stack.Navigator>


*/


const RoutesOptionsNao = () => {
    return(
        <Drawer.Navigator>
            
            <Drawer.Screen name="O que vamos aprender hoje?"  
            component={Home}
            options={{
                title: 'O que vamos aprender hoje?',
                headerStyle: {
                  backgroundColor: '#6877e8',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}
        />

            

        <Drawer.Screen name="Pagamento" component={CheckoutMP}
            options={{
                title: 'Checkout Premium',
                headerStyle: {
                  backgroundColor: '#6877e8',
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}
         />
         




        </Drawer.Navigator>
        
    )
  }


export default function Routes() {
    return(
        <RoutesOptions/>
    )
}

/*
<Drawer.Screen name="Exercise Page" component={Speech}
            options={{
                title: 'Exercise Page',
                headerStyle: {
                  backgroundColor: '#6877e8',
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}
         />


*/