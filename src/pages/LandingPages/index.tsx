/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import FullScreenLayout from 'Layouts';
import { LoginContext } from 'contexts/LoginContextContainer';
import Spinner from 'components/loading';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Select, FormControl, MenuItem, Typography } from '@material-ui/core';
import { Page } from 'utils/utils';
import AddPageModal from 'components/modal/AddPageModal';
import Section from 'components/section';
import AddSectionModal from 'components/modal/AddSectionModal';
import Tab from 'components/tab';
import Currency from 'components/currency';
import './styles.scss'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    paddingTop: 10,
    paddingBottom: 10,
    '& .MuiOutlinedInput-input': {
      paddingTop: 10,
      paddingBottom: 10
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const LandingPages = () => {
  const { pagesLoading, pages, getPages, tabs, sections, currencies, currentPage, setCurrentPage, getSections, getDefaultCurrencies } = useContext(LoginContext);
  const [isOpenAddNewPageModal, setIsOpenAddNewPageModal] = useState(false);
  const [isOpenAddNewSectionModal, setIsOpenAddNewSectionModal] = useState(false);
  const classes = useStyles();

  const handleChangePage = (event: any) => {
    setCurrentPage(event.target.value);
  };

  const openAddNewSectionModal = () => {
    setIsOpenAddNewSectionModal(true);
  };

  const closeAddNewSectionModal = () => {
    setIsOpenAddNewSectionModal(false);
  };

  const openAddNewPageModal = () => {
    setIsOpenAddNewPageModal(true);
  };

  const closeAddNewPageModal = () => {
    setIsOpenAddNewPageModal(false);
  };
  
  useEffect(() => {
    getPages();
    getDefaultCurrencies();
  }, [])
  
  useEffect(() => {
    const tPages: Page[] = pages;
    if (tPages.length !== 0) {
      setCurrentPage(tPages[0].pageTitle);
    }
  }, [pages])
  
  useEffect(() => {
    getSections();
  }, [currentPage])

  return (
    <FullScreenLayout>
      {pagesLoading ? (
        <Spinner />
      )
      : (
        <div className="landing_pages_container">
          <div className="row pages_list">
            <div className="pages">
              <Typography>Pages: </Typography>
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={currentPage}
                  onChange={handleChangePage}
                  label=""
                >
                  {pages.map((page: Page) => (
                    <MenuItem key={page.pageTitle} value={page.pageTitle}>{page.pageTitle}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Button variant="contained" color="primary" size="medium" startIcon={<AddIcon />} onClick={openAddNewPageModal}>
              Add Page
            </Button>
            <AddPageModal open={isOpenAddNewPageModal} handleClose={closeAddNewPageModal} />
            <AddSectionModal open={isOpenAddNewSectionModal} handleClose={closeAddNewSectionModal} />
          </div>
          <div className="sections_container">
            <Grid container spacing={3}>
              <Grid item xs={10}>
                <p className="title">Sections</p>
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" color="primary" size="medium" startIcon={<AddIcon />} onClick={openAddNewSectionModal}>
                  Add Section
                </Button>
              </Grid>
            </Grid>
            {currencies.map((currency: any) => (
              <Currency key={currency._id} data={currency} />
            ))}
            {sections.map((section: any) => (
              <Section key={section._id} data={section} />
            ))}
            {tabs.map((tab: any, index: number) => (
              <Tab key={`${tab._id}-${index}`} data={tab} />
            ))}
          </div>
        </div>
      )}
    </FullScreenLayout>
  )
}

export default LandingPages
