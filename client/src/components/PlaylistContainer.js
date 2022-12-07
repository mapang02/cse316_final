import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';

function PlaylistContainer() {
    const { store } = useContext(GlobalStoreContext);
    
    return (
        <Box sx={{display: 'flex', overflow: 'scroll', height: '100%'}}>
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
            }
            </List>;
        </Box>
    )
}

export default PlaylistContainer