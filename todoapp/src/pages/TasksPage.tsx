import { Box, Theme, createStyles, makeStyles } from '@material-ui/core';
import { FormModal, FormModalOperations, FormModalSuccessResponsePayload } from 'models/ui';
import React, { useCallback, useEffect, useState } from 'react';

import RemoveTaskModal from './remove-task-modal/remove-task-modal';
import { TaskEntity } from 'models/entities';
import { TaskFormData } from 'models/form-data';
import TaskFormModal from './task-form-modal/task-form-modal';
import TasksService from 'services/TasksService';
import TasksWrapper from './tasks-wrapper/tasks-wrapper';
import { arrayMove } from 'react-sortable-hoc';
import { useAPI } from 'shared/hooks/useAPI';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gridGap: theme.spacing(4),
      padding: theme.spacing(4, 3)
    }
  })
);

const TasksPage = () => {
  const classes = useStyles();

  const [taskFormModalData, setTaskFormModalData] = useState<FormModal<{ data: TaskFormData; id: number }>>({});
  const [tasks, setTasks] = useState<TaskEntity[]>([]);
  const [taskToRemove, setTaskToRemove] = useState<TaskEntity | null>(null);

  const [isLoadingTasks, getTasks] = useAPI<TaskEntity[]>(TasksService.GET.tasks, setTasks);

  const handleAddingOrEditingTask = ({ data, operation }: FormModalSuccessResponsePayload<TaskEntity>) => {
    if (operation === FormModalOperations.ADD) {
      setTasks([...tasks, data]);
    } else {
      setTasks(tasks.map(task => (task.id === taskFormModalData.payload!.id ? { ...task, ...data } : task)));
    }
  };

  const handleTaskRemoving = (taskToRemoveId: number) => {
    setTasks(tasks.filter(task => task.id !== taskToRemoveId));
    closeRemoveTaskConfirmationModal();
  };

  const changeTasksOrder = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setTasks(arrayMove(tasks, oldIndex, newIndex));
  };

  const openTaskFormModalForAddingPurposes = useCallback(() => {
    setTaskFormModalData({ isOpen: true });
  }, []);

  const openTaskFormModalForEditingPurposes = useCallback(({ id, name, description, theme }: TaskEntity) => {
    setTaskFormModalData({ isOpen: true, payload: { data: { name, description, theme }, id } });
  }, []);

  const closeTaskFormModal = useCallback(() => {
    setTaskFormModalData({});
  }, []);

  const openRemoveTaskConfirmationModal = useCallback((task: TaskEntity) => {
    setTaskToRemove(task);
  }, []);

  const closeRemoveTaskConfirmationModal = useCallback(() => {
    setTaskToRemove(null);
  }, []);

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box className={classes.root}>
        <TasksWrapper
          tasks={tasks}
          isLoading={isLoadingTasks}
          label='Your tasks'
          onAddBtnClick={openTaskFormModalForAddingPurposes}
          onEditTask={openTaskFormModalForEditingPurposes}
          onRemoveTask={openRemoveTaskConfirmationModal}
          onSortEnd={changeTasksOrder}
        />
      </Box>

      {taskFormModalData.isOpen && (
        <TaskFormModal
          initState={taskFormModalData.payload}
          onClose={closeTaskFormModal}
          onSuccessResponse={handleAddingOrEditingTask}
        />
      )}

      {taskToRemove && (
        <RemoveTaskModal
          taskToRemove={taskToRemove}
          onSuccessResponse={handleTaskRemoving}
          onClose={closeRemoveTaskConfirmationModal}
        />
      )}
    </>
  );
};

export default TasksPage;
