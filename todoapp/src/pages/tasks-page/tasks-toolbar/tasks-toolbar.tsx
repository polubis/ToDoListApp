import { Box, Button, Theme, Toolbar, Tooltip, Typography, createStyles, makeStyles } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      padding: 0,
      marginBottom: theme.spacing(1),

      [theme.breakpoints.down(600)]: {
        alignItems: 'flex-start',
        flexFlow: 'column'
      }
    },

    toolbox: {
      margin: `0 0 0 auto`,

      [theme.breakpoints.down(600)]: {
        margin: '20px 0 15px 0'
      }
    },

    button: {
      '&:first-of-type': {
        marginRight: theme.spacing(1)
      }
    }
  })
);

interface Props {
  onAddTaskClick(): void;
  onAddTaskStatusClick(): void;
}

const TasksToolbar = ({ onAddTaskClick, onAddTaskStatusClick }: Props) => {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography variant='h6'>Tasks management</Typography>

      <Box className={classes.toolbox}>
        <Tooltip title='Create status with predefined color theme'>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={onAddTaskStatusClick}
          >
            Add task status
          </Button>
        </Tooltip>

        <Tooltip title='Create new task from scratch'>
          <Button variant='contained' color='primary' className={classes.button} startIcon={<AddIcon />} onClick={onAddTaskClick}>
            Add task
          </Button>
        </Tooltip>
      </Box>
    </Toolbar>
  );
};

export default TasksToolbar;
