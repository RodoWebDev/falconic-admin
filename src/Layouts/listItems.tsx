import React from 'react'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import { ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(() => ({
  root: {
    '& p': {
      color: '#58585b',
    },
    '& svg': {
      color: '#58585b',
    },
    '&:hover': {
      '& p': {
        color: '#67c2e9',
      },
      '& svg': {
        color: '#67c2e9',
      },
    },
  },
  activeRoot: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    '& p': {
      color: '#27a9e0',
    },
    '& svg': {
      color: '#27a9e0',
    },
  },
}))

const ListItemLink = (props: ListItemProps<'a', { button?: true }>): JSX.Element => {
  return <ListItem button component="a" {...props} />
}

const SideNav = (props: any): JSX.Element => {
  const classes = useStyles()
  const { pages, currentPage, setCurrentPage } = props
  const history = useHistory();

  const onChangePage = (index: number) => {
    setCurrentPage(pages[index]);
    history.push(pages[index].link);
  }
  return (
    <div className="side_nav">
      {pages.map((page: any, index: number) => (
        <ListItemLink
          button
          key={page.title}
          onClick={(): void => onChangePage(index)}
          className={currentPage.title === page.title ? classes.activeRoot : classes.root}
        >
          <ListItemIcon>
            <page.icon />
          </ListItemIcon>
          <ListItemText primary={<Typography>{page.title}</Typography>} />
        </ListItemLink>
      ))}
    </div>
  )
}

export default SideNav
