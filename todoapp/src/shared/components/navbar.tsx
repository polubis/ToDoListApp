import {
  AppBar,
  Avatar,
  Divider,
  IconButton,
  Tab,
  Tabs,
  Theme,
  Toolbar,
  Typography,
  createStyles,
  makeStyles
} from '@material-ui/core';
import React, { useEffect } from 'react';

import DashboardIcon from '@material-ui/icons/Dashboard';
import HideOnScroll from './hide-on-scroll';
import ListIcon from '@material-ui/icons/List';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Routes } from 'models/Routes';
import SearchIcon from '@material-ui/icons/Search';
import ThemeIcon from '@material-ui/icons/Palette';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,

      '& hr': {
        height: 28,
        margin: theme.spacing(0, 2.5),
        background: theme.palette.common.white
      }
    },

    searchBtn: {
      marginLeft: 200,
      color: theme.palette.common.white
    },

    tab: {
      display: 'flex',
      width: 130,
      minWidth: 'unset',
      height: 64,
      fontSize: theme.typography.fontSize,
      textTransform: 'none',

      '&:hover': {
        opacity: 1
      },

      '& > span': {
        flexDirection: 'row',

        '& svg': {
          marginRight: theme.spacing(1),
          transform: 'translateY(2px)'
        }
      }
    },

    themeBtn: { marginLeft: 'auto', color: theme.palette.common.white },

    notificationsBtn: {
      color: theme.palette.common.white,
      marginLeft: theme.spacing(1)
    },

    email: {
      margin: theme.spacing(0, 1.5, 0, 0.5)
    },

    avatar: {
      background: theme.palette.common.white,
      color: theme.palette.primary.main
    }
  })
);

const links = [Routes.DASHBOARD, Routes.TASKS];

const Navbar: React.FC = () => {
  const {
    location: { pathname },
    push,
    replace
  } = useHistory();
  const classes = useStyles();

  const activeTab = links.indexOf(pathname as Routes);

  const handleChangeActiveTab = (e: React.ChangeEvent<{}>, idx: number) => {
    push(links[idx]);
  };

  useEffect(() => {
    if (activeTab === -1) {
      replace(links[0]);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <HideOnScroll>
      <AppBar className={classes.root}>
        <Toolbar>
          <Typography variant='h6'>Todo APP</Typography>
          <IconButton aria-label='search' className={classes.searchBtn}>
            <SearchIcon />
          </IconButton>

          <Divider orientation='vertical' />

          <Tabs aria-label='simple tabs example' value={activeTab === -1 ? 0 : activeTab} onChange={handleChangeActiveTab}>
            <Tab label='Dashboard' disableRipple className={classes.tab} icon={<DashboardIcon />} />
            <Tab label='Tasks' disableRipple className={classes.tab} icon={<ListIcon />} />
          </Tabs>

          <IconButton className={classes.themeBtn}>
            <ThemeIcon />
          </IconButton>

          <IconButton className={classes.notificationsBtn}>
            <NotificationsIcon />
          </IconButton>

          <Divider orientation='vertical' />

          <Typography variant='subtitle1' className={classes.email}>
            polubik1994@gmail.com
          </Typography>

          <Avatar className={classes.avatar}>OP</Avatar>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;
