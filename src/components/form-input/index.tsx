import React from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  TextField
} from '@mui/material';
import { Controller, ControllerProps } from 'react-hook-form';

interface FormInputProps {
  name: string;
  control: ControllerProps['control'];
  errors: any;
  defaultValue: number;
}

export const FormInput = ({
  defaultValue,
  name,
  control,
  errors
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <TextField
            variant="outlined"
            {...field}
            type="input"
            error={!!errors?.amount}
            placeholder="Placeholder"
          />
          <FormHelperText>
            {errors?.amount ? errors?.amount?.message : ''}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};
