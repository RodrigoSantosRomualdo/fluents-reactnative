import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Login from './pages/Login/index';
import Home from './pages/Home';
import Speech from './pages/Speech';

const Drawer = createDrawerNavigator();



/*
<Stack.Navigator>
            <Stack.Screen  name="O que vamos aprender hoje?" component={Home} />
            
            </Stack.Navigator>


*/


const RoutesOptions = () => {
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

            <Drawer.Screen name="Exercise Page" component={Speech}
            options={{
                title: 'Exercise Page',
                headerStyle: {
                  backgroundColor: '#6877e8',
                },
                headerTintColor: '#fff',
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