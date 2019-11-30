import { Box, Typography } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import React from 'react';
import { TaskEntity } from 'models/entities';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: '0 3px 6px rgba(0,0,0,.14)',
      padding: 0
    },

    task: {
      position: 'relative',
      display: 'flex',
      padding: theme.spacing(1.5, 2.5, 1.5, 2.5),
      borderBottom: `1px solid ${theme.palette.grey[400]}`
    },

    taskLabel: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '5px',
      height: 'calc(100% + 1px)',
      zIndex: 1,
      background: theme.palette.primary.main
    },

    taskCreationDate: {
      color: theme.palette.grey[500]
    }
  })
);

interface Props {
  tasks: TaskEntity[];
}

const TasksList = ({ tasks }: Props) => {
  const classes = useStyles();

  return (
    <List dense className={classes.root}>
      {tasks.map(task => (
        <ListItem key={task.id} className={classes.task}>
          <span className={classes.taskLabel} />

          <Box>
            <Typography variant='caption' className={classes.taskCreationDate}>
              {task.creationDate}
            </Typography>
            <Typography variant='subtitle2'>{task.name}</Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default TasksList;
