import React, { useContext, useState } from 'react';

import ConfirmationModal from 'shared/components/confirmation-modal';
import { TaskStatusEntity } from 'models/entities';
import { TasksContext } from 'providers/TasksProvider';
import { TasksStatusesContext } from 'providers/TasksStatusesProvider';

interface Props {
  taskStatusToDelete: TaskStatusEntity;
  onClose(): void;
  onSuccessDelete(): void;
}

const DeleteTaskStatusModal = ({ taskStatusToDelete, onClose, onSuccessDelete }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteTaskStatus } = useContext(TasksStatusesContext);
  const { updateMany } = useContext(TasksContext);

  const handleDeleteTaskStatus = () => {
    setIsDeleting(true);
    deleteTaskStatus(taskStatusToDelete.id).subscribe(
      () => {
        updateMany(task => (task.statusId === taskStatusToDelete.id ? { ...task, statusId: undefined } : task));
        onClose();
        onSuccessDelete();
      },
      () => setIsDeleting(false)
    );
  };

  return (
    <ConfirmationModal
      title={`Are you sure you want to remove ${taskStatusToDelete.name} task status ?`}
      message='This operation cannot be undone.'
      isPending={isDeleting}
      onClose={onClose}
      onConfirm={handleDeleteTaskStatus}
    />
  );
};

export default DeleteTaskStatusModal;
