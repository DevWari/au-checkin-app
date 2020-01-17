import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CustomerLogin from '../screens/CustomerLogin'
import CheckInHome from '../screens/CheckInHome'
import UserLogin from '../screens/UserLogin'
import Video from '../screens/Video'
import Help from '../screens/Help'

// import NavBar from '../components/general/NavBar'

export default createAppContainer(
  createStackNavigator(
    {      
      CustomerLogin,
      CheckInHome,
      UserLogin,
      Video,
      Help   
    },
    {
      initialRouteName: 'CustomerLogin',
      defaultNavigationOptions: {
        header: null
      }
      // defaultNavigationOptions: {
      //   header: props => <NavBar {...props} />,
      //   gesturesEnabled: false,
      // },            
    }
    
  ),
);
