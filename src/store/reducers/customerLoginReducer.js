import { LOG_IN, LOGIN_SUCCESS, LOGIN_FAILURE, LOG_OUT, LOG_OUT_SUCCESS, LOG_OUT_FAILURE } from '../actions/actionType'
const initialState = {   
  isLoading:false,
  token: '',
  status: 'no',
  userCode:'',
  checkin_message: null,
  garageName: '',
  garageCode:'',
  garageColor:'',  
  garageCheckinTutorial:'',
}

export default function customerLoginReducer (state = initialState, action) {
  switch (action.type) {
    case LOG_IN:

      return {
        ...state,        
        isLoading: true
      }
    case LOGIN_SUCCESS:      
      return {
        ...state,
        isLoading: false,
        token: action.data.token,
        status: action.data.status,
        userCode: action.data.user.app_code,
        checkin_message: action.data.garage.checkin_message,
        garageName: action.data.garage.name,
        garageCode: action.data.garage.app_code,
        garageColor: action.data.garage.color,        
        garageCheckinTutorial: action.data.garage.checkin_tutorial        
      }
      
    case LOGIN_FAILURE:      
      return {
        ...state,
        isLoading: false,
        status: 'err',
    }
    case LOG_OUT:
      return {
        ...state,
        isLoading: true,        
    }
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        isLoading:false,
        token: '',
        status: 'no',
        userCode:'',
        checkin_message: null,
        garageName: '',
        garageCode:'',
        garageColor:'',  
        garageCheckinTutorial:'',
    }
    case LOG_OUT_FAILURE:
      return {
        ...state,
        isLoading:false,
        token: '',
        status: 'err',
        userCode:'',
        checkin_message: null,
        garageName: '',
        garageCode:'',
        garageColor:'',  
        garageCheckinTutorial:'',
    }
    default:
      return state
  }
}
