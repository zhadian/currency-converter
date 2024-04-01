import React, { KeyboardEvent } from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  TextField
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { inputValidation } from '../../utils';
import { IFormInputs } from '../../types';

interface FormInputProps {
  name: string;
  label: string;
  control: Control<IFormInputs>;
  errors: any;
  defaultValue: number;
}

export const FormInput = ({
  defaultValue,
  label,
  name,
  control,
  errors
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControl>
          <FormLabel>{label}</FormLabel>
          <TextField
            autoFocus={true}
            variant="outlined"
            {...field}
            type="input"
            error={!!errors.amount}
            placeholder="Please enter a number"
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
              inputValidation(e)
            }
          />
          <FormHelperText>
            {errors.amount ? errors.amount?.message : ''}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};
