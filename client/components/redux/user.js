import axios from 'axios';
//import IP from '../../IP';


// ACTION TYPE
const ALL_USERS = 'ALL_USERS';
const GET_USER = 'GET_USER';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const REMOVE = 'REMOVE';

// ACTION CREATORS
const allUsers = users => ({type: ALL_USERS, users });
const getUser = user => ({type: GET_USER, user});
const newUser = user => ({type: CREATE, user});
const update = user => ({type: UPDATE, user});
const remove = id => ({type: REMOVE, id});

// THUNK
export const fetchAllUsers = () => dispatch => {
  return axios.get('/api/users')
    .then( res => dispatch(allUsers(res.data)))
    .catch( err => console.error('errors from fetchAllUsers thunk', err));
}

export const fetchSingleUser = id => dispatch => {
  return axios.get(`/api/users/${id}`)
    .then( res => dispatch(getUser(res.data)))
    .catch( err => console.error('errors from fetchSingleUser thunk', err));
}

export const createUser = user => dispatch => {
  return axios.post('/api/users', user)
    .then( res => dispatch(newUser(res.data)))
    .catch( err => console.error('errors from createUser thunk', err ));
}

export const updateUser = (id, user) => dispatch => {
  return axios.put(`/api/users/${id}`, user)
    .then( res => dispatch(update(res.data)))
    .catch( err => console.error('errors from updateUser thunk', err));
}

export const removeUser = id => dispatch => {
  return axios.delete(`/api/users/${id}`)
    .then( () => dispatch(remove(id)))
    .catch( err => console.error('errors from removeUser thunk', err));
}


// REDUCER

export default function(users=[], action){

  switch(action.type){
      case ALL_USERS:
        return action.users
      case GET_USER:
        return action.user
      case CREATE:
        return [ ...users, action.user ]
      case UPDATE:
        return users.map( user => action.user.id === user.id ? action.user : user )
      case REMOVE:
        return users.filter( user => action.user.id !== user.id );
      default:
        return users
  }
}
