/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import AddSliderModal from 'components/modal/AddSliderModal';
import { Checkbox, Button, Typography, Grid, TextField } from '@material-ui/core';
import './styles.scss'

const HeroSection = (props: any) => {
  const { sliders, setSliders, sectionData, handleDataChange } = props;
  const [isOpenAddNewSliderModal, setIsOpenAddNewSliderModal] = useState(false);

  const openAddNewSliderModal = () => {
    setIsOpenAddNewSliderModal(true);
  }

  const closeAddNewSliderModal = () => {
    setIsOpenAddNewSliderModal(false);
  };

  const addSlider = (title: string, btnTitle: string) => {
    const temp = [...sliders];
    temp.push({checked: false, title: title, btnTitle: btnTitle});
    setSliders(temp);
  }

  const handleCheckedSlider = (index: number) => {
    const temp = [...sliders];
    temp[index].checked = !temp[index].checked;
    setSliders(temp);
  }

  const removeSliders = () => {
    const temp = sliders.filter((slider: any) => !slider.checked);
    setSliders(temp);
  }

  const isShowDeleteBtn = sliders.filter((slider: any) => slider.checked).length !== 0 ? true : false;
	return (
    <Grid container spacing={3}>
      <Grid item xs={2}>
        <div className="row">
          <Typography>Youtube URL</Typography>
        </div>
      </Grid>
      <Grid item xs={10}>
        <div className="row">
          <TextField id="outlined-youtebeUrl" label="" variant="outlined" value={sectionData.videoUrl} onChange={(e) => handleDataChange(e, 'videoUrl')} fullWidth />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="row">
          <Typography className="subtitle">Sliders</Typography>
        </div>
      </Grid>
      <Grid item xs={10}>
        <div className="slider">
          <Typography className="slider_check">No</Typography>
          <Typography className="slider_title">Slider Title</Typography>
          <Typography className="slider_btnTitle">Slider Button Title</Typography>
        </div>
        {sliders.map((slider: any, index: number) => (
          <div className="slider" key={index}>
            <Checkbox
              className="slider_check check"
              checked={slider.checked}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              onChange={(e) => handleCheckedSlider(index)}
            />
            <Typography className="slider_title">{slider.title}</Typography>
            <Typography className="slider_btnTitle">{slider.btnTitle}</Typography>
          </div>
        ))}
      </Grid>
      <Grid item xs={2}>
        <div className="btn_section">
          <Button variant="contained" color="primary" size="medium" startIcon={<AddIcon />} onClick={openAddNewSliderModal}>
            Add
          </Button>
          {isShowDeleteBtn && <Button variant="contained" color="secondary" size="medium" startIcon={<DeleteIcon />} onClick={removeSliders}>
            Remove
          </Button>}
        </div>
      </Grid>
      <AddSliderModal
        open={isOpenAddNewSliderModal}
        handleClose={closeAddNewSliderModal}
        addSlider={addSlider}
      />
    </Grid>
	);
};

export default HeroSection;
