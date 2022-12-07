import './App.css';
import { React } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store';
import {
    AppBanner,
    SplashScreen,
    LoginScreen,
    RegisterScreen
} from './components';

const App = () => {   
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>              
                    <AppBanner />
                    <Switch>
                        <Route path="/" exact component={SplashScreen} />
                        <Route path="/login/" exact component={LoginScreen} />
                        <Route path="/register/" exact component={RegisterScreen} />
                    </Switch>
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App