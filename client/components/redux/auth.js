import axios from 'axios';
import history from '../history'

// ACTION TYPE
const GET_AUTH_USER = 'GET_AUTH_USER';
const REMOVE_AUTH_USER = 'REMOVE_AUTH_USER'


// ACTION CREATORS
const getAuthUser = user => ({type: GET_AUTH_USER, user});
const removeAuthUser = () => ({type: REMOVE_AUTH_USER});


// THUNKS
export const me = () => dispatch => {
  return axios.get('/auth/me')
    .then( res => dispatch(getAuthUser(res.data || defaultUser )))
    .catch( err => console.log(err))
}

export const auth = (user, method) => dispatch => {
  return axios.post(`/auth/${method}`, user)
    .then( res => {
      dispatch(getAuthUser(res.data))
      history.push('/start')
    }, authError => { dispatch(getAuthUser({ error: authError}))})
    .catch( dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))
}

export const logout = () => dispatch => {
  return axios.post('/auth/logout')
    .then( _ => {
      dispatch(removeAuthUser())
      history.push('/')
    })
    .catch( err => console.log(err))
}


// INITIAL STATE
const defaultUser = {}


// REDUCER
export default function (state = defaultUser, action) {
  switch (action.type){
    case GET_AUTH_USER:
      return action.user
    case removeAuthUser:
      return defaultUser
    default:
      return state;
  }
}
