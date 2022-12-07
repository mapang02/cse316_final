import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import HomeToolbar from './HomeToolbar.js'
import PlaylistContainer from './PlaylistContainer.js'
import Player from './Player.js'
import Statusbar from './Statusbar';

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);
    return (
        <div id="playlister-home">
            <HomeToolbar />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <PlaylistContainer />
                </Grid>
                <Grid item xs={6}>
                    <Player />
                </Grid>
            </Grid>
            <Statusbar />
        </div>)
}

export default HomeScreen;