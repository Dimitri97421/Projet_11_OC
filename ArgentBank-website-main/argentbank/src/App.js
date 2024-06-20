import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Accueil from './routes/Accueil';
import SignIn from './routes/SignIn';
import User from './routes/User';
import Header from './routes/composants/Header';
import Footer from './routes/composants/Footer';
import { Provider } from 'react-redux';
import store from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div>
            <Header/>
            <Routes>
              <Route path="/" exact Component={Accueil} />
              <Route path="/sign-in" Component={SignIn} />
              <Route path="/user" Component={User} />
              <Route path="*" Component={() => <Navigate to="/" />} />
            </Routes>
            <Footer/>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
