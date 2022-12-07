import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';

function HomeToolbar() {
    const { store } = useContext(GlobalStoreContext);
    return (
        <div id="home-toolbar">
            <Button
                size="large"
            >
                <HomeIcon />
            </Button>
            <Button
                size="large"
            >
                <PersonIcon />
            </Button>
            <Button
                size="large"
            >
                <GroupsIcon />
            </Button>
        </div>
    )
}

export default HomeToolbar;