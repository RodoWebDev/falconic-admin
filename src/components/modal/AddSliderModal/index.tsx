import React, { useEffect, useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

const AddSliderModal = (props: any) => {
  const { open, handleClose, addSlider } = props;
  const [title, setTitle] = useState('');
  const [btnTitle, setBtnTitle] = useState('');

  const onAdd = async () => {
    addSlider(title, btnTitle);
    handleClose();
  }

  useEffect(() => {
    setTitle('');
    setBtnTitle('');
  }, [open])
	return (
		<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Slider Dialog</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="slider_title"
          label="Slider Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="slider_btn_title"
          label="Slider Button Title"
          fullWidth
          value={btnTitle}
          onChange={(e) => setBtnTitle(e.target.value)}
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

export default AddSliderModal;
