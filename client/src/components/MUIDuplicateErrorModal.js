import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIDuplicateErrorModal() {
    const { store } = useContext(GlobalStoreContext);
    function handleDeleteList(event) {
        store.deleteMarkedList();
    }
    function handleCloseModal(event) {
        store.unmarkListForDeletion();
    }

    return (
        <Modal
            open={store.currentModal === "DUPLICATE"}
        >
            <Box sx={style}>
                <div className="modal-dialog">
                    <header className="dialog-header">
                        A playlist with this name already exists
                    </header>
                    <div id="confirm-cancel-container">
                        <button
                            id="dialog-no-button"
                            className="modal-button"
                            onClick={handleCloseModal}
                        >Okay</button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}