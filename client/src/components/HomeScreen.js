import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import HomeToolbar from './HomeToolbar.js'
import PlaylistContainer from './PlaylistContainer.js'
import Player from './Player.js'
import Statusbar from './Statusbar';

import Box from '@mui/material/Box';
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
        <Box>
            <HomeToolbar />
            <Box sx={{width: '100%', height: '80%', position: 'absolute'}}>
                <Grid container spacing={2} sx={{width: '100%', height: '100%'}}>
                    <Grid item xs={6}>
                        <PlaylistContainer />
                    </Grid>
                    <Grid item xs={6}>
                        <Player />
                    </Grid>
                </Grid>
            </Box>
            <Statusbar />
        </Box>)
}

export default HomeScreen;