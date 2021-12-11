/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Button, Typography, Grid } from '@material-ui/core';
import { LoginContext } from 'contexts/LoginContextContainer';
import AddTabItemModal from 'components/modal/AddTabItemModal';
import TabItem from './TabItem';
import './styles.scss'

const Tab = (props: any) => {
  const { data } = props;
  const [tabData, setTabData] = useState({...data});
  const { updateTabItem } = useContext(LoginContext);
  const [isOpenAddNewTabItemModal, setIsOpenAddNewTabItemModal] = useState(false);

  const openAddNewTabItemModal = () => {
    setIsOpenAddNewTabItemModal(true);
  }

  const closeAddNewTabItemModal = () => {
    setIsOpenAddNewTabItemModal(false);
  };

  const addTabItem = async (title: string, btnTitle: string, file: any) => {
    const data = {
      id: '',
      type: tabData.type,
      title,
      btnTitle,
      img: file
    };
    try {
      await updateTabItem(data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDataChange = (e: any, index: number, type: string) => {
    const temp: any = {...tabData};
    temp.items[index][type] = e.target.value;
    setTabData(temp);
  }
  
	return (
		<div className="tab">
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <div className="row">
            <Typography className="title">{data.type} Section</Typography>
          </div>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" size="medium" startIcon={<AddIcon />} onClick={openAddNewTabItemModal}>
            Add Item
          </Button>
        </Grid>
        {data.items.map((item: any, index: number) => (
          <TabItem
            tabItemData={item}
            tabData={tabData}
            setTabData={setTabData}
            index={index}
            handleDataChange={handleDataChange}
            key={index}
          />
        ))}
        <AddTabItemModal
          open={isOpenAddNewTabItemModal}
          handleClose={closeAddNewTabItemModal}
          addTabItem={addTabItem}
        />
      </Grid>
		</div>
	);
};

export default Tab;
