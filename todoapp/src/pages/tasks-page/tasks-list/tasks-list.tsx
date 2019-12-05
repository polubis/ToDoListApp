import { Box, Theme, createStyles, makeStyles } from '@material-ui/core';
import React, { useMemo } from 'react';
import { TaskEntity, TaskStatusEntity } from 'models/entities';

import ManagableList from 'shared/hoc/ManagableList';
import SortableList from 'shared/hoc/SortableList';
import TaskListItem from './task-list-item/task-list-item';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: '0 3px 6px rgba(0,0,0,.14)',
      padding: 0
    },

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
    }
  })
);

interface Props {
  tasks: TaskEntity[];
  tasksStatuses: TaskStatusEntity[];
  isLoadingTasks?: boolean;
  onEditTaskClick(task: TaskEntity): void;
  onDeleteTaskClick(task: TaskEntity): void;
  onTasksOrderChange(indexes: { oldIndex: number; newIndex: number }): void;
  onTaskStatusClick(task: TaskEntity): void;
}

const TasksList = ({
  tasks,
  tasksStatuses,
  isLoadingTasks,
  onEditTaskClick,
  onDeleteTaskClick,
  onTasksOrderChange,
  onTaskStatusClick
}: Props) => {
  const classes = useStyles();

  const mappedTaskStatuses: { [key: number]: TaskStatusEntity } = useMemo(
    () => tasksStatuses.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {}),
    [tasksStatuses]
  );

  if (isLoadingTasks) {
    return (
      <Box className={classes.loaders}>
        <Box></Box>
        <Box></Box>
        <Box></Box>
      </Box>
    );
  }

  return (
    <SortableList distance={1} onSortEnd={onTasksOrderChange} className={classes.root}>
      <ManagableList>
        {tasks.map((task, idx) => (
          <TaskListItem
            key={task.id}
            index={idx}
            task={task}
            taskStatus={task.statusId !== undefined ? mappedTaskStatuses[task.statusId] : null}
            onEditTaskClick={onEditTaskClick}
            onDeleteTaskClick={onDeleteTaskClick}
            onTaskStatusClick={onTaskStatusClick}
          />
        ))}
      </ManagableList>
    </SortableList>
  );
};

export default TasksList;
