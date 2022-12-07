import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';

function PlaylistContainer() {
    const { store } = useContext(GlobalStoreContext);

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    
    return (
        <Box id="list-selector-list">
            {
                listCard
            }
        </Box>
    )
}

export default PlaylistContainer