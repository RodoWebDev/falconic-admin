/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { LoginContext } from 'contexts/LoginContextContainer';
import { Button, Typography, Grid, TextField } from '@material-ui/core';
import './styles.scss'

const TabItem = (props: any) => {
  const { tabItemData, tabData, setTabData, index, handleDataChange } = props;
  const { updateTabItem } = useContext(LoginContext);
  const [file, setFile] = useState();
  const [image, setImage] = useState<any>();

  const onFileChange = (e: any) => {
    setFile(e.target.files[0]);
    const temp: any = {...tabData};
    temp.items[index].img = e.target.files[0];
    setTabData(temp);
  }

  const saveTab = async () => {
    const data = {
      ...tabItemData, id: tabItemData._id, type: tabData.type,
    };
    try {
      await updateTabItem(data);
    } catch (err) {
      console.log(err);
    }
  }

  if (file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e: any) {
      setImage(reader.result);
    };
  }
	return (
    <div className="tabItem">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className="row">
            <Typography className="title">{tabData.type}</Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Button className="saveBtn" variant="contained" color="primary" size="medium" startIcon={<SaveIcon />} onClick={saveTab}>
            Save
          </Button>
        </Grid>
        <Grid item xs={2}>
          <div className="row">
            <Typography>Title</Typography>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className="row">
            <TextField id="outlined-youtebeUrl" label="" variant="outlined" value={tabItemData.title} onChange={(e) => handleDataChange(e, index, 'title')} fullWidth />
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="row">
            <Typography>Button Text</Typography>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className="row">
            <TextField id="outlined-youtebeUrl" label="" variant="outlined" value={tabItemData.btnTitle} onChange={(e) => handleDataChange(e, index, 'btnTitle')} fullWidth />
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="row">
            <Typography>Image</Typography>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className="row">
            <input type="file" onChange={(e) => onFileChange(e)} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="row">
            <Typography className="subtitle">Preview</Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <img src={image ? image : tabItemData.imgUrl} alt="background-img"/>
        </Grid>
      </Grid>
    </div>
	);
};

export default TabItem;
