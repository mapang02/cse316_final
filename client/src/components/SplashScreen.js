import Button from '@mui/material/Button';
import logo from './playlister_logo.png'

export default function SplashScreen() {
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
                variant="contained"
                sx={{ m: 1, width: 200 }}
            >
                Create Account
            </Button>
            <Button
                href="/login"
                variant="contained"
                sx={{ m: 1, width: 200 }}
            >
                Login
            </Button>
            <Button
                href="/home"
                variant="contained"
                sx={{ m: 1, width: 200 }}
            >
                Continue As Guest
            </Button>
        </div>
    )
}