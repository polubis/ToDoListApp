import React, { useContext, useState } from 'react';

import ConfirmationModal from 'shared/components/confirmation-modal';
import { TaskEntity } from 'models/entities';
import { TasksContext } from 'providers/TasksProvider';

interface Props {
  taskToDelete: TaskEntity;
  onClose(): void;
}

const DeleteTaskModal = ({ taskToDelete, onClose }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteTask } = useContext(TasksContext);

  const handleDeleteTask = () => {
    setIsDeleting(true);
    deleteTask(taskToDelete.id).subscribe(onClose, () => setIsDeleting(false));
  };

  return (
    <ConfirmationModal
      title={`Are you sure you want to remove ${taskToDelete.name} task ?`}
      message='This operation cannot be undone.'
      isPending={isDeleting}
      onClose={onClose}
      onConfirm={handleDeleteTask}
    />
  );
};

export default DeleteTaskModal;
