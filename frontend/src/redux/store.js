import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { GetMenuReducer } from './reducers/menuReducer';
import { GetFoodSizeReducer } from './reducers/foodSizeReducer';
import { authReducer } from './reducers/authReducer';
import { getOrderReducer } from './reducers/orderReducer';

// Combine reducers
const reducer = combineReducers({

  loadMenu:GetMenuReducer,
  loadFoodSize:GetFoodSizeReducer,
  authtentication:authReducer,
  orders:getOrderReducer

});

// Configure redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

// Create the store
const store = createStore(  
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// Create the persisted store
const persistor = persistStore(store);

export { store, persistor };
