import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './pages/Login/index';
import Home from './pages/Home';
import Speech from './pages/Speech';

const Drawer = createDrawerNavigator();


const RoutesOptions = () => {
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home}/>
            <Drawer.Screen name="Speech" component={Speech}/>
        </Drawer.Navigator>
    )
  }


export default function Routes() {
    return(
        <RoutesOptions/>
    )
}