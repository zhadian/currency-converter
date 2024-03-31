import React from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  TextField
} from '@mui/material';
import { Controller, ControllerProps } from 'react-hook-form';

interface FormInputProps {
  control: ControllerProps['control'];
  errors: any;
}

export const FormInput = ({ control, errors }: FormInputProps) => {
  return (
    <Controller
      name="amount"
      control={control}
      defaultValue={0}
      render={({ field }) => (
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <TextField
            variant="outlined"
            {...field}
            type="input"
            error={!!errors.amount}
            placeholder="Placeholder"
          />
          <FormHelperText>
            {errors.amount ? errors.amount?.message : ''}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};
