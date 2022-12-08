import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    let addSongButton = ""
    if (auth.user && store.currentScreen === "HOME") {
        addSongButton = (
                        <Button
                            disabled={store.canClose() || store.isEditSongModalOpen() || store.isRemoveSongModalOpen()}
                            id='close-button'
                            onClick={console.log("owo")}
                            variant="contained">
                            <AddIcon />
                        </Button>)
    }

    let text ="";
    if (store.currentList)
        text = store.currentList.name;
    return (
        <div id="playlister-statusbar">
            <Typography 
                variant="h4"
                align="center"
                sx={{ padding: 1 }}
            >
                {text}
            </Typography>
            {addSongButton}
        </div>
    );
}

export default Statusbar;