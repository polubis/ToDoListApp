import { Box, Fab, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { TaskEntity } from 'models/entities';
import TasksList from 'shared/components/tasks-list';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loaders: {
      '& div': {
        background: theme.palette.grey[300],
        width: '100%',
        height: '40px'
      },

      '& div:not(:last-of-type)': {
        marginBottom: theme.spacing(2)
      },

      '& div:nth-child(2)': {
        height: '250px'
      }
    },

    root: {
      '& > h5': {
        marginBottom: theme.spacing(2),
        color: theme.palette.grey[700],
        fontSize: '22px'
      }
    },

    toolbox: {
      display: 'flex',
      padding: theme.spacing(2, 0, 2, 0)
    },

    addTaskBtn: {
      marginLeft: 'auto'
    }
  })
);

interface Props {
  tasks: TaskEntity[];
  label: string;
  isLoading?: boolean;
  onAddBtnClick(): void;
}

const TasksWrapper = ({ tasks, label, isLoading, onAddBtnClick }: Props) => {
  const classes = useStyles();

  if (isLoading) {
    return (
      <Box className={classes.loaders}>
        <Box></Box>
        <Box></Box>
        <Box></Box>
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Typography variant='h5'>{label}</Typography>
      <TasksList tasks={tasks} />
      <Box className={classes.toolbox}>
        <Fab size='small' color='primary' aria-label='add' className={classes.addTaskBtn} onClick={onAddBtnClick}>
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default TasksWrapper;
