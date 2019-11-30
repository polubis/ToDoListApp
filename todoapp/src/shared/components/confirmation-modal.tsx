import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ModalLoader from './modal-loader';
import React from 'react';

interface Props {
  title: string;
  message: string;
  isPending?: boolean;
  onClose(): void;
  onConfirm(): void;
}

const ConfirmationModal = ({ title, message, isPending, onClose, onConfirm }: Props) => {
  const handleClose = () => {
    if (isPending) {
      return;
    }

    onClose();
  };

  return (
    <Dialog open onClose={handleClose} aria-labelledby='draggable-dialog-title'>
      {isPending && <ModalLoader />}
      <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={onConfirm} color='primary'>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
