import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './state/index.js'
import { Provider } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/dist/query/index.js'
import { api } from './state/api.js'

import './index.css'

const store = configureStore({
  reducer: {
    global : globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => 
   getDefaultMiddleware().concat(api.middleware),

});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
