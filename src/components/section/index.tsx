/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Button, Typography, Grid } from '@material-ui/core';
import { LoginContext } from 'contexts/LoginContextContainer';
import HeroSection from './Hero';
import PocketSection from './Pocket';
import AboutSection from './About';
import './styles.scss'

const Section = (props: any) => {
  const { data } = props;
  const [sectionType] = useState(data.type);
  const [sectionData, setSectionData] = useState({...data});
  const [sliders, setSliders] = useState<any>(data.slider.map((item: any) => {
    return {
      title: item.title,
      btnTitle: item.btnTitle
    }
  }));
  const [lists, setLists] = useState<any>([
    { title: 'Comparsion', list: [] },
    { title: 'FALCONIC', list: [] },
    { title: 'Another bank', list: [] },
  ]);
  const { updateSection } = useContext(LoginContext);

  const handleDataChange = (e: any, type: string) => {
    const temp: any = {...sectionData};
    temp[type] = e.target.value;
    setSectionData(temp);
  }

  const saveSection = async () => {
    const tempSliders = sliders.map((slider: any) => {
      return {
        title: slider.title,
        btnTitle: slider.btnTitle
      }
    })
    const tempList = lists.map((list: any) => {
      return {
        title: list.title,
        list: list.list.map((item: any) => {return item.title})
      }
    })
    try {
      await updateSection({...sectionData, type: sectionType, slider: [...tempSliders], list: tempList});
    } catch (err) {
      console.log(err);
    }
  }

  // const remove = async () => {
  //   try {
  //     await removeSection(data._id);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  useEffect(() => {
    if (data.list.length !== 0) {
      const tempLists = [...lists];
      tempLists[0].list = data.list.filter((list: any) => list.title === tempLists[0].title)[0].list.map((item: any) => {return {checked: false, title: item}});
      tempLists[1].list = data.list.filter((list: any) => list.title === tempLists[1].title)[0].list.map((item: any) => {return {checked: false, title: item}});
      tempLists[2].list = data.list.filter((list: any) => list.title === tempLists[2].title)[0].list.map((item: any) => {return {checked: false, title: item}});
      setLists(tempLists);
    }
  }, [data])

	return (
		<div className="section">
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <div className="row">
            <Typography className="subtitle">{sectionType} Section</Typography>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="row btn_section">
            <Button className="saveBtn" variant="contained" color="primary" size="medium" startIcon={<SaveIcon />} onClick={saveSection}>
              Save
            </Button>
            {/* <Button variant="contained" color="secondary" size="medium" startIcon={<DeleteIcon />} onClick={remove}>
              Remove
            </Button> */}
          </div>
        </Grid>
      </Grid>
      {sectionType === 'Hero' && <div className="section-content">
        <HeroSection
          sliders={sliders}
          setSliders={setSliders}
          sectionData={sectionData}
          handleDataChange={handleDataChange}
        />
      </div>}
      {sectionType === 'About' && <div className="section-content">
        <AboutSection
          sectionData={sectionData}
          setSectionData={setSectionData}
          handleDataChange={handleDataChange}
          lists={lists}
          setLists={setLists}
        />
      </div>}
      {sectionType === 'Pocket' && <div className="section-content">
        <PocketSection
          sectionData={sectionData}
          setSectionData={setSectionData}
          handleDataChange={handleDataChange}
        />
      </div>}
		</div>
	);
};

export default Section;
