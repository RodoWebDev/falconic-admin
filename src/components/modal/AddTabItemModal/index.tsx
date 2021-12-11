import React, { useEffect, useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import './styles.scss'

const AddTabItemModal = (props: any) => {
  const { open, handleClose, addTabItem } = props;
  const [title, setTitle] = useState('');
  const [btnTitle, setBtnTitle] = useState('');
  const [file, setFile] = useState();
  const [image, setImage] = useState<any>();

  const onAdd = async () => {
    addTabItem(title, btnTitle, file);
    handleClose();
  }

  const onFileChange = (e: any) => {
    setFile(e.target.files[0]);
  }

  useEffect(() => {
    setTitle('');
    setBtnTitle('');
    setFile(undefined);
    setImage(undefined);
  }, [open])

  if (file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e: any) {
      setImage(reader.result);
    };
  }
	return (
		<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add TabItem Dialog</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="tabItem_title"
          label="TabItem Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="tabItem_btn_title"
          label="TabItem Button Title"
          fullWidth
          value={btnTitle}
          onChange={(e) => setBtnTitle(e.target.value)}
        />
        <Typography>Image</Typography>
        <input type="file" onChange={(e) => onFileChange(e)} />
        <img src={image} alt="background-img"/>
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

export default AddTabItemModal;
