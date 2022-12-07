import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function Player() {
    const { store } = useContext(GlobalStoreContext);

    return (
        <div>Goodbye</div>
    )
}

export default Player