import { Box, Theme, createStyles, makeStyles } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';

import { FormModal } from 'models/ui';
import { TaskEntity } from 'models/entities';
import { TaskFormData } from 'models/form-data';
import TaskFormModal from './task-form-modal/task-form-modal';
import TasksService from 'services/TasksService';
import TasksWrapper from './tasks-wrapper/tasks-wrapper';
import { useAPI } from 'shared/hooks/useAPI';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gridGap: theme.spacing(4),
      padding: theme.spacing(2, 3)
    }
  })
);

const TasksPage = () => {
  const classes = useStyles();

  const [taskFormModalData, setTaskFormModalData] = useState<FormModal<TaskFormData>>({});
  const [tasks, setTasks] = useState<TaskEntity[]>([]);

  const [isLoadingTasks, getTasks] = useAPI<TaskEntity[]>(TasksService.GET.tasks, setTasks);

  const openTaskFormModal = useCallback(() => {
    setTaskFormModalData({ isOpen: true });
  }, []);

  const closeTaskFormModal = useCallback(() => {
    setTaskFormModalData({});
  }, []);

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <Box className={classes.root}>
        <TasksWrapper tasks={tasks} isLoading={isLoadingTasks} label='Week 1' onAddBtnClick={openTaskFormModal} />
        <TasksWrapper tasks={tasks} isLoading={isLoadingTasks} label='Week 2' onAddBtnClick={openTaskFormModal} />
        <TasksWrapper tasks={tasks} isLoading={isLoadingTasks} label='Week 3' onAddBtnClick={openTaskFormModal} />
        <TasksWrapper tasks={tasks} isLoading={isLoadingTasks} label='Week 4' onAddBtnClick={openTaskFormModal} />
      </Box>

      {taskFormModalData.isOpen && <TaskFormModal onClose={closeTaskFormModal} />}
    </>
  );
};

export default TasksPage;
