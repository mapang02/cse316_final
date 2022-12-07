import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function PlaylistContainer() {
    const { store } = useContext(GlobalStoreContext);
    
    return (
        <div>Hello</div>
    )
}

export default PlaylistContainer