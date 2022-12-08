import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { Tab, Tabs } from '@mui/material'
import List from '@mui/material/List';
import YouTubePlayer from './YouTubePlayer';
import Comments from './Comments';

function Player() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    let contents = "";
    if (value == 0) {
        contents = <YouTubePlayer />
    }
    if (value == 1) {
        contents = <Comments />
    }

    return (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Player" />
              <Tab label="Comments" />
            </Tabs>
          </Box>
          {contents}
        </Box>
    )
}

export default Player