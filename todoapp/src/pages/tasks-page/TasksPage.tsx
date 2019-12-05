import { Box, Theme, createStyles, makeStyles } from '@material-ui/core';
import React, { useCallback, useContext, useState } from 'react';
import { TaskEntity, TaskStatusEntity } from 'models/entities';
import TasksProvider, { TasksContext } from 'providers/TasksProvider';
import TasksStatusesProvider, { TasksStatusesContext } from 'providers/TasksStatusesProvider';

import DeleteTaskModal from './delete-task-modal/delete-task-modal';
import DeleteTaskStatusModal from './delete-task-status-modal/delete-task-status-modal';
import TaskFormModal from './task-form-modal/task-form-modal';
import TaskStatusFormModal from './task-status-form-modal/task-status-form-modal';
import TasksList from './tasks-list/tasks-list';
import TasksStatuses from './tasks-statuses/tasks-statuses';
import TasksToolbar from './tasks-toolbar/tasks-toolbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4, 5),

      [theme.breakpoints.down(600)]: {
        padding: theme.spacing(3, 2)
      }
    },

    tasksLists: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(400px, 1fr))',
      gridGap: theme.spacing(4),

      [theme.breakpoints.down(600)]: {
        gridTemplateColumns: '1fr'
      }
    }
  })
);

const TasksPage = () => {
  const classes = useStyles();

  const { tasks, isLoadingTasks, changeTaskOrder, changeTaskStatus } = useContext(TasksContext);
  const { tasksStatuses, isLoadingTasksStatuses } = useContext(TasksStatusesContext);

  const [isTaskFormModalOpen, setIsTaskFormModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskEntity | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<TaskEntity | null>(null);

  const [isTaskStatusFormModalOpen, setTaskStatusFormModalOpen] = useState(false);
  const [taskStatusToEdit, setTaskStatusToEdit] = useState<TaskStatusEntity | null>(null);
  const [taskStatusToDelete, setTaskStatusToDelete] = useState<TaskStatusEntity | null>(null);

  const handleTasksOrderChange = useCallback(({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    changeTaskOrder(oldIndex, newIndex).subscribe();
    // eslint-disable-next-line
  }, []);

  const handleTaskStatusChange = (task: TaskEntity) => {
    if (!tasksStatuses.length) {
      setTaskStatusFormModalOpen(true);
      return;
    }

    if (task.statusId === undefined) {
      changeTaskStatus(task.id, tasksStatuses[0].id);
    } else {
      const taskStatusIdx = tasksStatuses.findIndex(ts => ts.id === task.statusId) + 1;
      changeTaskStatus(task.id, tasksStatuses[taskStatusIdx] ? tasksStatuses[taskStatusIdx].id : -1);
    }
    // eslint-disable-next-line
  };

  const openTaskFormModal = useCallback((task?: TaskEntity) => {
    setIsTaskFormModalOpen(true);
    if (task && task.id !== undefined) {
      setTaskToEdit(task);
    }
  }, []);

  const openTaskStatusFormModal = useCallback((taskStatus?: TaskStatusEntity) => {
    setTaskStatusFormModalOpen(true);
    if (taskStatus && taskStatus.id !== undefined) {
      setTaskStatusToEdit(taskStatus);
    }
  }, []);

  const openDeleteTaskModal = useCallback((task: TaskEntity) => {
    setTaskToDelete(task);
  }, []);

  const openDeleteTaskStatusModal = useCallback((taskStatus: TaskStatusEntity) => {
    setTaskStatusToDelete(taskStatus);
  }, []);

  const closeTaskStatusFormModal = useCallback(() => {
    setTaskStatusFormModalOpen(false);
    setTaskStatusToEdit(null);
  }, []);

  const closeTaskFormModal = useCallback(() => {
    setIsTaskFormModalOpen(false);
    setTaskToEdit(null);
  }, []);

  const closeDeleteTaskModal = useCallback(() => {
    setTaskToDelete(null);
  }, []);

  const closeDeleteTaskStatusModal = useCallback(() => {
    setTaskStatusToDelete(null);
  }, []);

  return (
    <Box className={classes.root}>
      <TasksToolbar onAddTaskClick={openTaskFormModal} onAddTaskStatusClick={openTaskStatusFormModal} />

      <TasksStatuses
        tasksStatuses={tasksStatuses}
        isLoadingTasksStatuses={isLoadingTasksStatuses}
        onTaskStatusClick={openTaskStatusFormModal}
      />

      <Box className={classes.tasksLists}>
        <TasksList
          tasks={tasks}
          tasksStatuses={tasksStatuses}
          isLoadingTasks={isLoadingTasks}
          onEditTaskClick={openTaskFormModal}
          onDeleteTaskClick={openDeleteTaskModal}
          onTasksOrderChange={handleTasksOrderChange}
          onTaskStatusClick={handleTaskStatusChange}
        />
      </Box>

      {isTaskFormModalOpen && <TaskFormModal taskToEdit={taskToEdit} onClose={closeTaskFormModal} />}

      {isTaskStatusFormModalOpen && (
        <TaskStatusFormModal
          taskStatusToEdit={taskStatusToEdit}
          onClose={closeTaskStatusFormModal}
          onDeleteClick={openDeleteTaskStatusModal}
        />
      )}

      {taskToDelete && <DeleteTaskModal taskToDelete={taskToDelete} onClose={closeDeleteTaskModal} />}

      {taskStatusToDelete && (
        <DeleteTaskStatusModal
          taskStatusToDelete={taskStatusToDelete}
          onClose={closeDeleteTaskStatusModal}
          onSuccessDelete={closeTaskStatusFormModal}
        />
      )}
    </Box>
  );
};

const ConnectedTasksPage = () => (
  <TasksStatusesProvider>
    <TasksProvider>
      <TasksPage />
    </TasksProvider>
  </TasksStatusesProvider>
);

// Zostala zmiana statusów i responsywność

export default ConnectedTasksPage;
