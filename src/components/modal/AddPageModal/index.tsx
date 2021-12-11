import React, { useContext, useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { LoginContext } from 'contexts/LoginContextContainer';

const AddPageModal = (props: any) => {
  const { open, handleClose } = props;
  const [title, setTitle] = useState('');
  const { addPage } = useContext(LoginContext);

  const onAdd = async () => {
    if (title.length !== 0) {
      await addPage(title);
    } else {
      alert('Type Page Title.');
    }
    handleClose();
  }
	return (
		<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Page Dialog</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Type page title.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="PageTitle"
          label="PageTitle"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
	);
};

export default AddPageModal;
