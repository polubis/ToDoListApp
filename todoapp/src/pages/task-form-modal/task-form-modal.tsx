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
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core';
import { DatePicker, DateTimePicker } from '@material-ui/pickers';
import React, { useEffect, useState } from 'react';

import { Subscription } from 'rxjs';
import { TaskEntity } from 'models/entities';
import { TaskFormData } from 'models/form-data';
import TasksService from 'services/TasksService';
import { Validator as V } from 'shared/utils/validator';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    errorMessage: {
      color: theme.palette.error.main
    }
  })
);

interface Props {
  onClose: () => void;
}

const validationRules = {
  name: (value: string) =>
    V.one(
      new V(value)
        .required()
        .min(3)
        .max(20)
    ),
  description: (value: string) => V.one(new V(value).min(10).max(250)),
  theme: () => ''
};

const TaskFormModal: React.FC<Props> = ({ onClose }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState<TaskFormData>({
    name: '',
    description: '',
    theme: {
      color: '',
      background: ''
    }
  });

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

  const validateForm = () => {};

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Dialog onClose={onClose} open>
      <DialogTitle>Create new task</DialogTitle>
      <DialogContent>
        <DialogContentText>Populate required fields and create your task.</DialogContentText>

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
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={onClose}>
          Cancel
        </Button>
        <Button color='primary' onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskFormModal;
