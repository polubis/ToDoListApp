import { Box, CircularProgress, Theme, createStyles, makeStyles } from '@material-ui/core';

import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
      background: 'rgba(255,255,255,.25)'
    }
  })
);

const ModalLoader = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CircularProgress />
    </Box>
  );
};

export default ModalLoader;
