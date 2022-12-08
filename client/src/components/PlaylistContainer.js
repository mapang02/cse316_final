import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import ListCard from './ListCard.js'
import ListEditor from './ListEditor.js'
import ListViewer from './ListViewer.js'

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';

function PlaylistContainer() {
    const { auth } = useContext(AuthContext);
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
            //Editor
            if (!auth.isGuest && auth.user && auth.user.email === pair.ownerEmail && !pair.publishDate) {
                return (
                <ListEditor
                    key={pair._id}
                    idNamePair={pair}
                    selected={false}
                />);
            }
            //Viewer
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