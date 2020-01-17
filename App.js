/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import AppNavigator from './src/navigation/AppNavigation'
import { setTopLevelNavigator } from './src/utils/navigation'

import { Provider } from 'react-redux'
import configureStore from './src/store/configureStore'
const store = configureStore()

const App = () => {
  return (    
    <Provider store={store}>  
       <AppNavigator         
           ref={(navigatorRef) => {
              setTopLevelNavigator(navigatorRef);
           }}
       />   
    </Provider>
  )
};
export default App;
