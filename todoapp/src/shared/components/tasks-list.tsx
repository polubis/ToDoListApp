import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { TaskEntity } from 'models/entities';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {}
  })
);

interface Props {
  tasks: TaskEntity[];
}

const TasksList = ({ tasks }: Props) => {
  const classes = useStyles();

  return (
    <List dense className={classes.root}>
      {tasks.map(task => {
        return <ListItem key={task.id}>{task.name}</ListItem>;
      })}
    </List>
  );
};

export default TasksList;
