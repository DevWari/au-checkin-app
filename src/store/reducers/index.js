import {combineReducers} from 'redux'
import customerLoginReducer from './customerLoginReducer'
import userLoginReducer from './userLoginReducer'

const allReducers = combineReducers ({
  customerLoginReducer,
  userLoginReducer
})

export default allReducers