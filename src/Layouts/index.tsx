import React, { FC, useContext, useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core'
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from '@material-ui/icons'
import SideNav from 'Layouts/listItems'
import { LoginContext } from 'contexts/LoginContextContainer';
import { HiOutlineLogout, HiTemplate } from 'react-icons/hi'
import NavLogo from 'assets/imgs/nav_logo.png'
import { FaUser } from 'react-icons/fa'
import './styles.scss'

// React code splitting for these three components. This will lower the bundle size, at the cost
// of having to load these components during runtime. But, since these are probably going to be
// less used than other components, AND opened in fullscreen and will require an app reload anyways,
// we can wait to load them until they're specifically requested. The only thing this needs in terms
// of a code change is wrapping the component in <Suspense fallback={...}>, which just provides a loader
// while the component is loading.

const drawerWidth = 240

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#fff',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    height: '100%',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}))
interface Props {
  children?: React.ReactNode
}
const pages = [
  {id: 1, title: 'Users', link: '/users', icon: FaUser},
  {id: 2, title: 'Pages Customize', link: '/', icon: HiTemplate},
];

const FullScreenLayout: FC<Props> = ({ children }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState(pages[1])
  const { logout } = useContext(LoginContext);

  const handleDrawerOpen = (): void => {
    setOpen(true)
  }

  const handleDrawerClose = (): void => {
    setOpen(false)
  }

  const handleLogout = (): void => {
    logout();
  }

  return (
    <div className={`${classes.root} fullscreen`}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="default"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <div className="topbar">
            <img src={NavLogo} alt="Placeholder" />
            <IconButton
              edge="start"
              color="default"
              aria-label="open drawer"
              onClick={handleLogout}
              className={clsx(classes.menuButton)}
            >
              <HiOutlineLogout />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <SideNav pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Typography style={{ padding: '30px 30px 0px 30px', fontSize: 20 }}>
          {'Settings / '}
          <span style={{ color: '#67c2e9' }}>{currentPage.title}</span>
        </Typography>
        <div className="pop-out-main-container">{children}</div>
      </main>
    </div>
  )
}

export default FullScreenLayout
