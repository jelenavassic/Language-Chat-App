import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Define your initial state
const initialState = {
  items: []
 
};

// Define your reducer
function favReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // Add the item to the state
      return {
        ...state,
        items: [...state.items, action.payload],
        
      };
    
    default:
      return state;
  }
}

// Wrap your reducer with the persistReducer HOC
const persistConfig = {
  key: 'favourites',
  storage,
};

const persistedReducer = persistReducer(persistConfig, favReducer);

// Export the rootReducer
export default combineReducers({
  favourites: persistedReducer,
});
export const addToFav = (item) => {
    return {
      type: 'ADD_TO_FAV',
      payload: item,
    };
  };