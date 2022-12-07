import { useContext } from 'react'
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
    const { store } = useContext(GlobalStoreContext);
    
    function test() {
        console.log("Test");
    }
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Toolbar>
                <Button
                    size="large"
                >
                    <HomeIcon />
                </Button>
                <Button
                    size="large"
                >
                    <PersonIcon />
                </Button>
                <Button
                    size="large"
                >
                    <GroupsIcon />
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