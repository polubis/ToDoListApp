import { Box, Grid, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';
import { CallState, useApiCall } from 'shared/hooks/useApiCall';

import React from 'react';
import { TaskEntity } from 'models/entities';
import TasksList from 'shared/components/tasks-list';
import TasksService from 'services/TasksService';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2, 3)
    }
  })
);

const TasksPage: React.FC = () => {
  const classes = useStyles();

  const { isLoading, data: tasks } = useApiCall<TaskEntity[]>(TasksService.GET.tasks(), new CallState([], true));

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography variant='h5'>Your tasks</Typography>
        <TasksList tasks={tasks} />
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h5'>Your tasks</Typography>
        <TasksList tasks={tasks} />
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h5'>Your tasks</Typography>
        <TasksList tasks={tasks} />
      </Grid>
    </Grid>
  );
};

export default TasksPage;
