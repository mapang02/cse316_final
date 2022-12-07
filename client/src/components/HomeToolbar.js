import { useContext } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import SortIcon from '@mui/icons-material/Sort';

function HomeToolbar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    
    function test() {
        console.log("Test");
    }

    function debug() {
        store.loadIdNamePairs();
    }

    function handleHomeButton() {
        store.changeScreen("HOME");
    }

    function handleSearchNameButton() {
        store.changeScreen("SEARCH_NAME");
    }

    function handleSearchUserButton() {
        store.changeScreen("SEARCH_USER");
    }

    let homeButton = ""
    if (!auth.isGuest) {
        homeButton = (
            <Button
                size="large"
                onClick={handleHomeButton}
            >
                <HomeIcon />
            </Button>);
    }
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Toolbar>
                {homeButton}
                <Button
                    size="large"
                    onClick={handleSearchNameButton}
                >
                    <PersonIcon />
                </Button>
                <Button
                    size="large"
                    onClick={handleSearchUserButton}
                >
                    <GroupsIcon />
                </Button>
                <Button
                    size="large"
                    onClick={debug}
                >
                    Reload
                </Button>
                <Box sx={{ flexGrow: 1 }}>
                    <input 
                        id="search-bar" 
                        className='modal-textfield' 
                        type="text" 
                        onChange={test} />
                </Box>
                <Button
                    size="large"
                >
                    <SortIcon />
                </Button>
            </Toolbar>
        </Box>
    )
}

export default HomeToolbar;