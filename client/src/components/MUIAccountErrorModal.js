import { useContext } from 'react'
import AuthContext from '../auth';
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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

export default function MUIAccountErrorModal() {
    const { auth } = useContext(AuthContext);
    let error = auth.accountError;

    function handleCloseModal(event) {
        auth.hideAccountErrorModal();
    }

    return (
        <Modal
            open={auth.accountError !== null}
        >
            <Box sx={style}>
                <div className="modal-dialog">
                <header className="dialog-header">
                    <Alert severity="error">{error}</Alert>
                </header>
                <div id="close-modal-container">
                    <Button 
                        variant="contained"
                        id="dialog-close-button"
                        className="modal-button"
                        onClick={handleCloseModal}
                    >
                        Close
                    </Button>
                </div>
            </div>
            </Box>
        </Modal>
    );
}