/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { Checkbox, Button, Typography, Grid, TextField } from '@material-ui/core';
import AddItemModal from 'components/modal/AddItemModal';
import './styles.scss'

const AboutSection = (props: any) => {
  const { sectionData, setSectionData, lists, setLists, handleDataChange } = props;
  const [image, setImage] = useState(sectionData.img);
  const [isOpenAddNewItemModal, setIsOpenAddNewItemModal] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(0);

  const openAddNewItemModal = (id: number) => {
    setIsOpenAddNewItemModal(true);
    setCurrentItemId(id);
  }

  const closeAddNewItemModal = () => {
    setIsOpenAddNewItemModal(false);
  };

  const addItem = (item: string) => {
    const temp = [...lists];
    temp[currentItemId].list.push({checked: false, title: item});
    setLists(temp);
  }

  const handleCheckedItem = (index: number, id: number) => {
    const temp = [...lists];
    temp[id].list[index].checked = !temp[id].list[index].checked;
    setLists(temp);
  }

  const removeItems = (id: number) => {
    const temp = [...lists];
    temp[id].list = temp[id].list.filter((item: any) => !item.checked);
    setLists(temp);
  }

  const onFileChange = (e: any, type: string) => {
    const temp: any = {...sectionData};
    temp[type] = e.target.files[0];
    setSectionData(temp);
  }

  if (sectionData.img) {
    var reader = new FileReader();
    reader.readAsDataURL(sectionData.img);
    reader.onloadend = function (e: any) {
      setImage(reader.result);
    };
  }
	return (
    <Grid container spacing={3}>
      <Grid item xs={2}>
        <div className="row">
          <Typography>Title</Typography>
        </div>
      </Grid>
      <Grid item xs={10}>
        <div className="row">
          <TextField id="outlined-youtebeUrl" label="" variant="outlined" value={sectionData.title} onChange={(e) => handleDataChange(e, 'title')} fullWidth />
        </div>
      </Grid>
      <Grid item xs={2}>
        <div className="row">
          <Typography>Description</Typography>
        </div>
      </Grid>
      <Grid item xs={10}>
        <div className="row">
          <TextField id="outlined-youtebeUrl" label="" variant="outlined" value={sectionData.desc} onChange={(e) => handleDataChange(e, 'desc')} fullWidth />
        </div>
      </Grid>
      <Grid item xs={2}>
        <div className="row">
          <Typography>Button Text</Typography>
        </div>
      </Grid>
      <Grid item xs={10}>
        <div className="row">
          <TextField id="outlined-youtebeUrl" label="" variant="outlined" value={sectionData.btnTitle} onChange={(e) => handleDataChange(e, 'btnTitle')} fullWidth />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="row">
          <Typography className="subtitle">Lists</Typography>
        </div>
      </Grid>
      {lists.map((list: any, id: number) => (
        <Grid container spacing={3} key={id}>
          <Grid item xs={12}>
            <div className="row list">
              <Typography>{list.title}</Typography>
            </div>
          </Grid>
          <Grid item xs={10}>
            <div className="slider">
              <Typography className="slider_check">No</Typography>
              <Typography className="slider_title">Items</Typography>
            </div>
            {list.list.map((item: any, index: number) => (
              <div className="slider" key={index}>
                <Checkbox
                  className="slider_check check"
                  checked={item.checked}
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  onChange={(e) => handleCheckedItem(index, id)}
                />
                <Typography className="slider_title">{item.title}</Typography>
              </div>
            ))}
          </Grid>
          <Grid item xs={2}>
            <div className="btn_section">
              <Button variant="contained" color="primary" size="medium" startIcon={<AddIcon />} onClick={() => openAddNewItemModal(id)}>
                Add
              </Button>
              {lists[id].list.filter((item: any) => item.checked).length !== 0 && <Button variant="contained" color="secondary" size="medium" startIcon={<DeleteIcon />} onClick={() => removeItems(id)}>
                Remove
              </Button>}
            </div>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={2}>
        <div className="row">
          <Typography>Background Image</Typography>
        </div>
      </Grid>
      <Grid item xs={10}>
        <div className="row">
          <input type="file" onChange={(e) => onFileChange(e, 'img')} />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="row">
          <Typography className="subtitle">Preview</Typography>
        </div>
      </Grid>
      <Grid item xs={12}>
        <img src={sectionData.img ? image : sectionData.imgUrl} alt="background-img"/>
      </Grid>
      <AddItemModal
        open={isOpenAddNewItemModal}
        handleClose={closeAddNewItemModal}
        addItem={addItem}
      />
    </Grid>
	);
};

export default AboutSection;
