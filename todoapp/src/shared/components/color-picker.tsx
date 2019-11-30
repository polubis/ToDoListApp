import { Box, FormControl, FormHelperText, TextField, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';

import React from 'react';
import { TextFieldProps } from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorPicker: {
      '& input': {
        opacity: 0,
        cursor: 'pointer'
      }
    },

    colorValue: {
      position: 'absolute',
      left: '14.5px',
      top: '20px'
    },

    colorChip: {
      position: 'absolute',
      left: '80px',
      top: '19px',
      height: '20px',
      width: '20px',
      boxShadow: '0 3px 6px rgba(0,0,0,.14)'
    }
  })
);

interface Props {
  label: string;
  value: string;
  helperText?: string;
}

const ColorPicker = ({ label, value, helperText, ...pickerProps }: Props & TextFieldProps) => {
  const classes = useStyles();

  const lowerCasedLabel = label.toLowerCase();

  return (
    <FormControl fullWidth margin='dense'>
      <TextField
        {...pickerProps}
        id={`${lowerCasedLabel}-color`}
        type='color'
        variant='outlined'
        label={`${label} color`}
        aria-describedby={`${lowerCasedLabel}-color-text`}
        className={classes.colorPicker}
        value={value}
      />
      <Typography variant='body2' className={classes.colorValue}>
        {value}
      </Typography>
      <Box className={classes.colorChip} style={{ background: value }}></Box>
      <FormHelperText id={`${lowerCasedLabel}-color-text`}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default ColorPicker;
