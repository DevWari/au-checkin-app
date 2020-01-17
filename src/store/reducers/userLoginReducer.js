import { USER_LOG_IN, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE } from '../actions/actionType'
import { Alert } from 'react-native'
import {myAction} from '../../utils/util'
const initialState = {   
  isLoading:false,  
  status: 'no',  
}

export default function userLoginReducer (state = initialState, action) {
  switch (action.type) {

    case USER_LOG_IN:      
      return {
        ...state,        
        isLoading: true
      }
    case USER_LOGIN_SUCCESS: 
    
       myAction();
      return {
        ...state,
        isLoading: false,        
        status: action.data.status,           
      }
      
    case USER_LOGIN_FAILURE:
       Alert.alert ("Warnig", "Your Information is not correct.")
        return {
            ...state,
            isLoading: false,        
            status: 'err',           
         }    
    default:
      return state
  }
}
