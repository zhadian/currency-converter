import React from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select
} from '@mui/material';
import { Controller, ControllerProps } from 'react-hook-form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FormSelectProps {
  control: ControllerProps['control'];
  errors: any;
  data: any;
}

export const FormSelect = ({ control, errors, data }: FormSelectProps) => {
  return (
    <Controller
      name="from"
      control={control}
      defaultValue={data[0]}
      render={({ field }) => (
        <FormControl>
          <FormLabel>From</FormLabel>
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
