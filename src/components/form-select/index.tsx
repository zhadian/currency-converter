import React from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IFormInputs } from '../../types';

interface FormSelectProps {
  name: string;
  label: string;
  defaultValue: string;
  control: Control<IFormInputs>;
  errors: any;
  data: string[];
}

export const FormSelect = ({
  name,
  label,
  defaultValue,
  control,
  errors,
  data
}: FormSelectProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControl>
          <FormLabel>{label}</FormLabel>
          <Select
            variant="outlined"
            {...field}
            error={!!errors.from}
            IconComponent={ExpandMoreIcon}
          >
            {data?.map((currency: string) => {
              return (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              );
            })}
          </Select>
          {
            <FormHelperText error={!!errors.from}>
              {errors?.from?.message}
            </FormHelperText>
          }
        </FormControl>
      )}
    />
  );
};
