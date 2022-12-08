import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { Tab, Tabs } from '@mui/material'
import List from '@mui/material/List';

function Comments() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Box>
            2
        </Box>
    )
}

export default Comments