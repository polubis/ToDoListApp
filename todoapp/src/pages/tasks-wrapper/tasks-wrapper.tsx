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
    }
  })
);

interface Props {
  tasks: TaskEntity[];
  label: string;
  isLoading?: boolean;
  onAddBtnClick(): void;
  onEditTask(task: TaskEntity): void;
  onRemoveTask(task: TaskEntity): void;
  onSortEnd(indexes: { oldIndex: number; newIndex: number }): void;
}

const TasksWrapper = ({ tasks, label, isLoading, onAddBtnClick, onEditTask, onRemoveTask, onSortEnd }: Props) => {
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
      <TasksList tasks={tasks} onEditTask={onEditTask} onRemoveTask={onRemoveTask} onSortEnd={onSortEnd} />
      <Box className={classes.toolbox}>
        <Fab size='small' color='primary' aria-label='add' onClick={onAddBtnClick}>
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default TasksWrapper;
