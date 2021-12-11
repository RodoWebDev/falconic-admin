/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { FormControl, MenuItem, Select, Checkbox, Button, Typography, Grid, makeStyles } from '@material-ui/core';
import { LoginContext } from 'contexts/LoginContextContainer';
import { Coins } from 'utils/utils';
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

const Currency = (props: any) => {
  const { data } = props;
  const { currencies, currenciesList, updateCurrency } = useContext(LoginContext);
  const [currencyData, ] = useState({...data});
  const [currenciesData, setCurrenciesData] = useState<any[]>([]);
  const [coinData, setCoinData] = useState<any[]>([]);
  const [base, setBase] = useState(data.base);
  const classes = useStyles();

  const saveCurrency = async () => {
    let items: any[] = [];
    if (currencyData.type === 'currency') {
      items = currenciesData.filter(e => e.checked).map((item) => {
        return item.name
      })
    } else {
      items = coinData.filter(e => e.checked).map((item) => {
        return item.name
      })
    }
    const data = {
      type: currencyData.type,
      base,
      items,
    };
    try {
      await updateCurrency(data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleCheckedItem = (index: number) => {
    if (currencyData.type === 'currency') {
      const temp = [...currenciesData];
      temp[index].checked = !temp[index].checked;
      setCurrenciesData(temp);
    } else {
      const temp = [...coinData];
      temp[index].checked = !temp[index].checked;
      setCoinData(temp);
    }
  }

  const handleChangeBase = (event: any) => {
    setBase(event.target.value);
  };

  useEffect(() => {
    if (currencyData.type === 'currency') {
      const data : string[] = currencyData.items;
      const array = currenciesList.map((item: any) => {
        return {
          name: item,
          checked: data.includes(item)
        }
      })
      setCurrenciesData(array);
    }
  }, [currenciesList, currencies])

  useEffect(() => {
    if (currencyData.type === 'crypto') {
      const data : string[] = currencyData.items;
      const array = Coins.map((item: any) => {
        return {
          name: item,
          checked: data.includes(item)
        }
      })
      setCoinData(array);
    }
  }, [currencyData])

	return (
		<div className="currency">
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <div className="row">
            <Typography className="title">{data.type} Section</Typography>
          </div>
        </Grid>
        <Grid item xs={2}>
          <Button className="saveBtn" variant="contained" color="primary" size="medium" startIcon={<SaveIcon />} onClick={saveCurrency}>
            Save
          </Button>
        </Grid>
        <Grid item xs={12}>
          <div className="base">
            <Typography>Base: </Typography>
            {currencyData.type === 'currency' && <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={base}
                onChange={handleChangeBase}
                label=""
              >
                {currenciesList.map((currency: string) => (
                  <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                ))}
              </Select>
            </FormControl>}
            {currencyData.type === 'crypto' && <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={base}
                onChange={handleChangeBase}
                label=""
              >
                {Coins.map((coin: string) => (
                  <MenuItem key={coin} value={coin}>{coin}</MenuItem>
                ))}
              </Select>
            </FormControl>}
          </div>
        </Grid>
        {currencyData.type === 'currency' && currenciesData.map((currency: any, index: number) => (
          <Grid item xs={1} key={`${currency.name}-${index}`}>
            <div className="item">
              <Checkbox
                className="slider_check check"
                checked={currency.checked}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                onChange={(e) => handleCheckedItem(index)}
              />
              <Typography className="slider_title">{currency.name}</Typography>
            </div>
          </Grid>
        ))}
        {currencyData.type === 'crypto' && coinData.map((coin: any, index: number) => (
          <Grid item xs={2} key={`${coin.name}-${index}`}>
            <div className="item">
              <Checkbox
                className="slider_check check"
                checked={coin.checked}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                onChange={(e) => handleCheckedItem(index)}
              />
              <Typography className="slider_title">{coin.name}</Typography>
            </div>
          </Grid>
        ))}
      </Grid>
		</div>
	);
};

export default Currency;
