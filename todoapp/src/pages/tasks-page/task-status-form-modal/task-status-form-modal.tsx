import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  TextField,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core';
import React, { useContext, useState } from 'react';

import ColorPicker from 'shared/components/color-picker';
import ModalLoader from 'shared/components/modal-loader';
import { TaskStatusEntity } from 'models/entities';
import { TaskStatusFormData } from 'models/form-data';
import { TasksStatusesContext } from 'providers/TasksStatusesProvider';
import { Validator as V } from 'shared/utils/validator';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    errorMessage: {
      color: theme.palette.error.main
    },

    preview: {
      display: 'flex',
      alignItems: 'center',
      height: '32px',
      marginBottom: theme.spacing(2),

      '& > div': {
        marginLeft: theme.spacing(0.5)
      }
    },

    deleteBtn: {
      color: theme.palette.error.main,
      margin: '0 auto 0 16px'
    }
  })
);

const validationRules = {
  name: (value: string) =>
    V.one(
      new V(value)
        .required()
        .onlyText()
        .min(3)
        .max(20)
    ),
  theme: () => ''
};

interface Props {
  taskStatusToEdit: TaskStatusEntity | null;
  onClose(): void;
  onDeleteClick(taskStatus: TaskStatusEntity): void;
}

const TaskStatusFormModal = ({ taskStatusToEdit, onClose, onDeleteClick }: Props) => {
  const classes = useStyles();

  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<TaskStatusFormData>(
    taskStatusToEdit || {
      name: '',
      theme: {
        color: '#ffffff',
        background: '#f44336'
      }
    }
  );
  const [errors, setErrors] = useState({ name: '', theme: '' });

  const { addTaskStatus, editTaskStatus } = useContext(TasksStatusesContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.name as keyof TaskStatusFormData;
    const { value } = e.target;

    setErrors({ ...errors, [key]: validationRules[key](value) });
    setFormData({ ...formData, [key]: value });
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as 'color' | 'background';
    const { value } = e.target;

    setFormData({ ...formData, theme: { ...formData.theme, [key]: value } });
  };

  const isFormInvalid = (errors: object) => Object.values(errors).some(error => error);

  const validateForm = () => {
    const newErrors = { name: validationRules.name(formData.name), theme: '' };

    setErrors(newErrors);

    return isFormInvalid(newErrors);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const isFormInvalid = validateForm();

    if (isFormInvalid) {
      return;
    }

    setIsSaving(true);

    const operation = taskStatusToEdit ? editTaskStatus(formData, taskStatusToEdit.id) : addTaskStatus(formData);
    operation.subscribe(onClose, () => setIsSaving(false));
  };

  const handleClose = () => {
    if (isSaving) {
      return;
    }

    onClose();
  };

  return (
    <Dialog onClose={handleClose} open data-testid='dialog'>
      {isSaving && <ModalLoader />}

      <DialogTitle>
        {taskStatusToEdit ? `You are editing ${taskStatusToEdit.name} task status` : 'Create new task status'}
      </DialogTitle>
      <DialogContent>
        <Box className={classes.preview}>
          Preview: {!formData.name || errors.name ? 'no available' : <Chip style={formData.theme} label={formData.name} />}
        </Box>

        <FormControl fullWidth margin='dense'>
          <TextField
            id='name'
            label='Name'
            name='name'
            variant='outlined'
            autoComplete='off'
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />
          <FormHelperText className={classes.errorMessage}>{errors.name}</FormHelperText>
        </FormControl>

        <Box paddingTop={1}>
          <ColorPicker
            value={formData.theme.color}
            onChange={handleThemeChange}
            label='Font'
            name='color'
            helperText='This color will be used to style task font color.'
          />
        </Box>

        <Box paddingTop={1}>
          <ColorPicker
            value={formData.theme.background}
            onChange={handleThemeChange}
            label='Background'
            name='background'
            helperText='This color will be used to style task background.'
          />
        </Box>
      </DialogContent>
      <DialogActions>
        {taskStatusToEdit && (
          <Button className={classes.deleteBtn} onClick={() => onDeleteClick(taskStatusToEdit)}>
            Delete
          </Button>
        )}

        <Button color='primary' onClick={handleClose}>
          Cancel
        </Button>
        <Button color='primary' onClick={handleSubmit} disabled={isFormInvalid(errors) || isSaving}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskStatusFormModal;
