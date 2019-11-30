import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  TextField,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core';
import { FormModalOperations, FormModalSuccessResponsePayload } from 'models/ui';
import React, { useState } from 'react';

import ColorPicker from 'shared/components/color-picker';
import ModalLoader from 'shared/components/modal-loader';
import { TaskEntity } from 'models/entities';
import { TaskFormData } from 'models/form-data';
import TasksService from 'services/TasksService';
import { Validator as V } from 'shared/utils/validator';
import { useAPI } from 'shared/hooks/useAPI';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    errorMessage: {
      color: theme.palette.error.main
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
  description: (value: string) => V.one(new V(value).min(10).max(250)),
  theme: () => ''
};

interface Props {
  initState?: { data: TaskFormData; id: number } | null;
  onClose: () => void;
  onSuccessResponse: (payload: FormModalSuccessResponsePayload<TaskEntity>) => void;
}

const TaskFormModal = ({ initState, onClose, onSuccessResponse }: Props) => {
  const classes = useStyles();

  const [isSavingTask, saveTask] = useAPI<TaskEntity, TaskFormData>(TasksService.POST.task, task => {
    onSuccessResponse({ data: task, operation: FormModalOperations.ADD });
    handleClose();
  });

  const [isEditingTask, editTask] = useAPI<TaskEntity, TaskFormData>(TasksService.PUT.task, task => {
    onSuccessResponse({ data: task, operation: FormModalOperations.EDIT });
    handleClose();
  });

  const [formData, setFormData] = useState<TaskFormData>(
    initState
      ? initState.data
      : {
          name: '',
          description: '',
          theme: {
            color: '#000000',
            background: '#ffffff'
          }
        }
  );

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    theme: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.name as keyof TaskFormData;
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
    const newErrors = {
      name: validationRules.name(formData.name),
      description: validationRules.description(formData.description),
      theme: ''
    };

    setErrors(newErrors);

    return isFormInvalid(newErrors);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const isFormInvalid = validateForm();

    if (isFormInvalid) {
      return;
    }

    if (initState) {
      editTask(formData);
    } else {
      saveTask(formData);
    }
  };

  const handleClose = () => {
    if (isSavingTask || isEditingTask) {
      return;
    }

    onClose();
  };

  console.log(`Form in ${initState ? 'edit' : 'add'} mode`);
  console.log(`Current form data: ${initState}`);

  return (
    <Dialog onClose={handleClose} open data-testid='dialog'>
      {(isSavingTask || isEditingTask) && <ModalLoader />}

      <DialogTitle>{initState ? `You are editing task ${initState.data.name}` : 'Create new task'}</DialogTitle>
      <DialogContent>
        <DialogContentText>Populate required fields and {initState ? 'edit' : 'create'} your task.</DialogContentText>

        <FormControl fullWidth margin='dense'>
          <TextField
            id='name'
            label='Name'
            name='name'
            variant='outlined'
            autoComplete='off'
            value={formData.name}
            onChange={handleChange}
          />
          <FormHelperText className={classes.errorMessage}>{errors.name}</FormHelperText>
        </FormControl>

        <Box paddingTop={1}>
          <FormControl fullWidth margin='dense'>
            <TextField
              id='description'
              label='Description'
              name='description'
              variant='outlined'
              aria-describedby='description-text'
              rowsMax='4'
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description ? (
              <FormHelperText className={classes.errorMessage}>{errors.description}</FormHelperText>
            ) : (
              <FormHelperText id='description-text'>Will be needed later for better understanding purposes.</FormHelperText>
            )}
          </FormControl>
        </Box>

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
        <Button color='primary' onClick={handleClose}>
          Cancel
        </Button>
        <Button color='primary' onClick={handleSubmit} disabled={isFormInvalid(errors)}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskFormModal;
