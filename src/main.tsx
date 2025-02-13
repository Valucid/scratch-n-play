// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import { store } from './redux/store.ts'

const persistor = persistStore(store);


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <PersistGate persistor={persistor}>
        <App />
  </PersistGate>
 
</Provider>
)
