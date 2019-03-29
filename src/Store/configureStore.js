import { createStore } from 'redux';
import toggleFavorite from './Reducers/favoriteReducer'

const store = createStore(toggleFavorite, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
console.log('store:', store)

export default store