/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Typography, Grid, TextField } from '@material-ui/core';
import './styles.scss'

const PocketSection = (props: any) => {
  const { sectionData, setSectionData, handleDataChange } = props;
  const [image, setImage] = useState(sectionData.img);

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
      <Grid item xs={2}>
        <div className="row">
          <Typography>Image</Typography>
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
    </Grid>
	);
};

export default PocketSection;
