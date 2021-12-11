import React, { useEffect, useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

const AddItemModal = (props: any) => {
  const { open, handleClose, addItem } = props;
  const [title, setTitle] = useState('');

  const onAdd = async () => {
    addItem(title);
    handleClose();
  }

  useEffect(() => {
    setTitle('');
  }, [open])
	return (
		<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Item Dialog</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="item_title"
          label="Item"
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

export default AddItemModal;
