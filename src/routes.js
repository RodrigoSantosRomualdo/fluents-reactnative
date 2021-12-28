import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

import Login from './pages/Login/index';
import Home from './pages/Home';
import Speech from './pages/Speech';
import CheckoutMP from './pages/CheckoutMP';
import Page1 from './pages/Page1';
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
        activeColor={'#000'}
        barStyle={{backgroundColor: 'red'}}>
            <Tab.Screen name="Home" component={Home} 
            options={{
                tabBarLabel: "Home",
                tabBarIcon: () => (
                    <Icon name="home-variant-outline" color={'#000'} size={26} />
                    )
                }} 
            />
            <Tab.Screen name="Page1" component={Page1} 
            options={{
                tabBarLabel: "Dicionário",
                tabBarIcon: () => (
                    <Icon name="gas-station-outline" color={'#000'} size={26} />
                    )
                }} 
            />
            <Tab.Screen name="Login" component={Login} 
            options={{
                tabBarLabel: "Perfil",
                 
                tabBarIcon: () => (
                    <Icon name="clipboard-list-outline" color={'#000'} size={26} />
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