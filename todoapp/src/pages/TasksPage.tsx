import { Box, Theme, createStyles, makeStyles } from '@material-ui/core';
import { CallState, useApiCall } from 'shared/hooks/useApiCall';

import React from 'react';
import { TaskEntity } from 'models/entities';
import TasksService from 'services/TasksService';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: 'red'
    }
  })
);

const TasksPage: React.FC = () => {
  const classes = useStyles();

  const { isLoading, data: tasks } = useApiCall<TaskEntity[]>(TasksService.GET.tasks(), new CallState([], true));

  return (
    <Box className={classes.root}>
      {tasks.map(task => (
        <Box key={task.id}>{task.name}</Box>
      ))}
    </Box>
  );
};

export default TasksPage;
