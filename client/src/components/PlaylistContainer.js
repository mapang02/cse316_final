import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import ListViewer from './ListViewer.js'

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';

function PlaylistContainer() {
    const { store } = useContext(GlobalStoreContext);

    const cardCreator = (pair) => {
        if (store.currentList == null || store.currentList._id !== pair._id) {
            return (
                <ListCard
                    key={pair._id}
                    idNamePair={pair}
                    selected={false}
                />);
        }
        else {
            return (
                <ListViewer
                    key={pair._id}
                    idNamePair={pair}
                    selected={false}
                />);
        }
    }

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map(cardCreator)
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