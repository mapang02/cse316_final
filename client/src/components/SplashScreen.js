import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

import Button from '@mui/material/Button';
import logo from './playlister_logo.png'

export default function SplashScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    function handleGuestLogin() {
        console.log("Guest login");
        auth.setIsGuest(true);
        store.changeScreen("SEARCH_NAME");
    }

    function handleLogin() {
        console.log("Regular login");
        auth.setIsGuest(false);
        store.changeScreen("HOME");
    }

    function handleRegister() {
        console.log("Registration");
        auth.setIsGuest(false);
        store.changeScreen("HOME");
    }

    return (
        <div id="splash-screen">
            <img src={logo} alt=""/>
            <div id="splash-welcome">Welcome to Playlister!</div>
            <div id="splash-message">
                Playlister is the premier site for creating and sharing music playlists.
                You can use the site as a guest to view the most popular playlists or create and account to like and comment!
            </div>
            <Button
                href="/register"
                onClick={handleRegister}
                variant="contained"
                sx={{ m: 1, width: 200 }}
            >
                Create Account
            </Button>
            <Button
                href="/login"
                onClick={handleLogin}
                variant="contained"
                sx={{ m: 1, width: 200 }}
            >
                Login
            </Button>
            <Button
                onClick={handleGuestLogin}
                variant="contained"
                sx={{ m: 1, width: 200 }}
            >
                Continue As Guest
            </Button>
            <div id="splash-credits">
                By Marcus Pang
            </div>
        </div>
    )
}