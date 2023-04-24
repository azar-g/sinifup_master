import React from 'react';
import { useSelector } from 'react-redux';
import { store } from 'store/index';
// import Box from '@mui/material/Box';
// import { open, close } from '../../../store/reducers/modal';

import { open, close } from 'store/reducers/modal';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from 'react-draggable';
import Paper from '@mui/material/Paper';

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

export const openModal = ({ title, data, form }) => {
    const id = modalIdGenerator();
    const element = createElement(id, form);
    store.dispatch(open({ id, title, data, element }));
};

export const closeModal = (id) => store.dispatch(close(id));

const modalIdGenerator = () => Math.floor(Math.random() * 10000000000);

const createElement = (id, form) => React.createElement(form, { __mid: id });

const ModalWindow = () => {
    const handleClose = (id) => closeModal(id);

    const { modals } = useSelector((state) => state.modal);

    if (modals.length > 0) {
        return (
            <>
                {modals.map((modal) => {
                    return (
                        <Dialog
                            key={modal.id}
                            fullWidth
                            maxWidth={'md'}
                            open={true}
                            onClose={() => handleClose(modal.id)}
                            PaperComponent={PaperComponent}
                            aria-labelledby="draggable-dialog-title"
                        >
                            <DialogTitle
                                style={{
                                    cursor: 'move',
                                    backgroundColor: '#424242',
                                    color: '#fafafb',
                                    fontSize: '26px',
                                    marginBottom: '30px',
                                    padding: '10px',
                                    paddingLeft: '30px'
                                }}
                                id="draggable-dialog-title"
                            >
                                {/* <Typography variant="h2" sx={{ padding: '5px' }}> */}
                                {modal.title}
                                {/* </Typography> */}
                            </DialogTitle>
                            <DialogContent>{modal.form}</DialogContent>
                        </Dialog>
                    );
                })}
            </>
        );
    } else return null;
};
export default ModalWindow;

/*  <Modal
                            key={modal.id}
                            open={true}
                            onClose={() => handleClose(modal.id)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Text in a modal
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    {modal.form}
                                </Typography>
                            </Box>
                        </Modal> */

/* <Backdrop closeModal={closeModal} id={modal.id} key={modal.id}>
    <div className="modal-dialog modal-dialog-centered modal-lg" id={modal.id}>
        <div className="modal-content">
            <header className="modal-header" style={{ backgroundColor: '#495057' }}>
                <p className="modal-title fs-2 ps-2" style={{ color: 'white' }}>
                    {modal.title}
                </p>
                <button
                    onClick={() => closeModal(modal.id)}
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </header>
            <div className="modal-body p-4 pb-0">{modal.form}</div>
        </div>
    </div>
</Backdrop> */
