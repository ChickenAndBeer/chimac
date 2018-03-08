import axios from 'axios';

//ACTION TYPE
const GET_GAMES = 'GET_GAMES'
const ADD_NEW_GAME = 'ADD_NEW_GAME'
const GET_SINGLE_GAME = 'GET_SINGLE_GAME'
const GET_USERS_GAMES = 'GET_USERS_GAMES'
const UPDATE_GAME = 'UPDATE_GAME'
const REMOVE_GAME = 'REMOVE_GAME'


//INITIAL STATE
const initState = [];

//ACTION CREATORS
export const getGames = (games) => ({type: GET_GAMES, games})

export const addGame = (game) => ({ type: ADD_NEW_GAME, game})

export const getGame = (game) => ({
  type: GET_SINGLE_GAME, game})

export const getUsersGames = (games) => ({type: GET_USERS_GAMES, games})

export const updateGame = (game) => ({
  type: UPDATE_GAME, game
})

export const removeGame = (gameId) => ({
  type: REMOVE_GAME, gameId
})

//THUNK
export function fetchGames() {
  return function thunk(dispatch) {
    return axios.get('/api/games')
    .then(res => res.data)
    .then(games => dispatch(getGames(games)))
    .catch(err => console.log(err))
  }
}

export function postGame(game) {
  return function thunk(dispatch) {
    return axios.post('/api/games', game)
    .then(res => res.data)
    .then(game => dispatch(addGame(game)))
    .catch(err => console.log(err))
  }
}

export function fetchSingleGame(gameId) {
  return function thunk(dispatch) {
    return axios.get(`/api/games/${gameId}`)
    .then(res => res.data)
    .then(game => dispatch(getGame(game)))
    .catch(err => console.log(err))
  }
}

export function fetchUserGames(userId) {
  return function thunk(dispatch) {
    return axios.get(`/api/games/users/${userId}`)
    .then(res => res.data)
    .then(games => dispatch(getUsersGames(games)))
    .catch(err => console.log(err))
  }
}

export function putGame(gameId, updatedInfo) {
  return function thunk(dispatch) {
    return axios.put(`/api/games/${gameId}`, updatedInfo)
    .then (res => res.data)
    .then (game => dispatch(updateGame(game)))
    .catch(err => console.log(err))
  }
}

export function deleteGame(gameId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/games/${gameId}`)
    .then(() => dispatch(removeGame(gameId)))
  }
}

//REDUCER
export default function reducer(state = initState, action) {
  switch (action.type) {
    case GET_GAMES:
      return action.games;
    case ADD_NEW_GAME:
      return [...state, action.game];
    case GET_SINGLE_GAME:
      return action.game;
    case GET_USERS_GAMES:
      return action.games;
    case UPDATE_GAME:
      return [...state.filter(game => game.id !== action.game.id), action.game];
    case REMOVE_GAME:
      return [...state.filter(game => game.id !== action.gameId)]
    default:
      return state;
  }
}


