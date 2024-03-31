import React from 'react';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/joy/Stack';
import { apiSlice, useFetchCurrencyQuery } from './currency-slice';
import { schema } from './schema';

interface IFormInputs extends FieldValues {
  from: string;
  to: string;
  amount: number;
}

export const Convertor = () => {
  const { data = [], isLoading, error, isFetching } = useFetchCurrencyQuery();
  const [convertCurrency, { data: result, isLoading: isConvertLoading }] =
    apiSlice.endpoints?.convertCurrency.useLazyQuery();
  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

  const formSubmitButtonHandler: SubmitHandler<IFormInputs> = async (
    data: IFormInputs
  ) => {
    const { amount, ...rest } = data;
    await convertCurrency({
      ...rest
    });
  };
  if (isLoading) return <CircularProgress />;
  console.log('result', result && getValues('amount') * result);
  return (
    <>
      <form onSubmit={handleSubmit(formSubmitButtonHandler)}>
        <Stack width={'300px'} spacing={1}>
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
          <Controller
            name="to"
            control={control}
            defaultValue={data[1]}
            render={({ field }) => (
              <FormControl>
                <FormLabel>To</FormLabel>
                <Select
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
          <br />
          <Button variant={'contained'} type="submit">
            Convert
          </Button>
          {result && (
            <Typography variant={'h6'}>
              {getValues('amount')} {getValues('from')} =
              {result && result * getValues('amount')} {getValues('to')}
            </Typography>
          )}
        </Stack>
      </form>
    </>
  );
};
