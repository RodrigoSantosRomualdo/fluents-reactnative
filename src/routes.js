import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './pages/Login/index';
import Home from './pages/Home';
import Speech from './pages/Speech';

const Drawer = createDrawerNavigator();


const RoutesOptions = () => {
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="O que vamos aprender hoje?"  
            component={Home}
            options={{
                title: 'O que vamos aprender hoje?',
                headerStyle: {
                  backgroundColor: 'rgb(101,37,131)',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}
                />
            <Drawer.Screen name="Speech" component={Speech}/>
        </Drawer.Navigator>
    )
  }


export default function Routes() {
    return(
        <RoutesOptions/>
    )
}