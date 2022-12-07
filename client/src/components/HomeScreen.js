import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import HomeToolbar from './HomeToolbar.js'
//import ListCard from './ListCard.js'
//import MUIDeleteModal from './MUIDeleteModal'
import Statusbar from './Statusbar';

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
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
            <div id="list-selector-heading">
                Home Screen
            </div>
            <Statusbar />
        </div>)
}

export default HomeScreen;