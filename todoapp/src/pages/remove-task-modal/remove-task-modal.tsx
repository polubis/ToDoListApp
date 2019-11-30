import ConfirmationModal from 'shared/components/confirmation-modal';
import React from 'react';
import { TaskEntity } from 'models/entities';
import TasksService from 'services/TasksService';
import { useAPI } from 'shared/hooks/useAPI';

interface Props {
  taskToRemove: TaskEntity;
  onSuccessResponse(taskIdToRemove: number): void;
  onClose(): void;
}

const RemoveTaskModal = ({ taskToRemove, onSuccessResponse, onClose }: Props) => {
  const [isRemovingTask, removeTask] = useAPI<null, number>(TasksService.DELETE.task, (res: null, taskIdToRemove: number) => {
    onSuccessResponse(taskIdToRemove);
  });

  return (
    <ConfirmationModal
      title={`Are you sure you want to remove ${taskToRemove.name} task ?`}
      message='This operation cannot be undone.'
      isPending={isRemovingTask}
      onClose={onClose}
      onConfirm={() => removeTask(taskToRemove.id)}
    />
  );
};

export default RemoveTaskModal;
