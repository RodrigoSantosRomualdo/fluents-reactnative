// Speech to Text Conversion in React Native – Voice Recognition
import React, {useState, useEffect} from 'react';
import  AsyncStorageUsuario  from '@react-native-community/async-storage'



  const armazenarUserLogin = (chave, valor) => {
    //AsyncStorageUsuario.setItem(chave, valor)
    AsyncStorageUsuario.setItem(chave, valor)
      console.log('INSERIR VALOR LOGIN: chave: store ', valor)
  }

  const buscarUserLogin = async (value) => {
    const valor = await AsyncStorageUsuario.getItem(value)
    console.log('BUSCAR USER LOGIN: ', valor )
    return valor;
  }

  const removeUserLogin = async () => {
    await AsyncStorageUsuario.removeItem('store')
    console.log('DELETEUSER LOGIN: ')
  }


export default {
    armazenarUserLogin,
    buscarUserLogin,
    removeUserLogin
}  