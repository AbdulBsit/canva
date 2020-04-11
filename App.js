import React, {useRef, createRef, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import ECardScreen from './src/components/ECardScreen';
import {StateProvider} from './src/canvasState/Store';
const App = () => {
  return (
    <View
      style={{
        paddingBottom: 0,
        padding: 5,
        flex: 1,
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 25}}>Edit Your Canvas</Text>
      <StateProvider>
        <ECardScreen />
      </StateProvider>
    </View>
  );
};

export default App;
