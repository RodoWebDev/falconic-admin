import React, { useContext, useState } from 'react';
import { FormControl, MenuItem, Select, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { LoginContext } from 'contexts/LoginContextContainer';
import { SectionType } from 'utils/utils';

const AddSectionModal = (props: any) => {
  const { open, handleClose } = props;
  const [sectionType, setSectionType] = useState('Hero');
  const { updateTab, updateSection, sections } = useContext(LoginContext);

  const onAdd = async () => {
    if (sectionType === "Hero" || sectionType === "About" || sectionType === "Pocket") {
      const data = {
        type: sectionType,
        videoUrl: '',
        title: '',
        desc: '',
        btnTitle: '',
        slider: [],
        list: [],
        img: ''
      }
      await updateSection(data);
    } else {
      const data = {
        type: sectionType,
        tabs: [],
      }
      await updateTab(data);
    }
    handleClose();
  }

  const handleChangeType = (event: any) => {
    setSectionType(event.target.value);
  };
	return (
		<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Section Dialog</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Choose Section Type.
        </DialogContentText>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={sectionType}
            onChange={handleChangeType}
            label=""
          >
            {SectionType.map((type) => {
              if (sections.filter((section: any) => section.type === type).length === 0) {
                return <MenuItem key={type} value={type}>{type}</MenuItem>
              }
              return undefined;
            })}
          </Select>
        </FormControl>
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

export default AddSectionModal;
