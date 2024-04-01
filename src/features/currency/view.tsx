import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/joy/Stack';
import { apiSlice, useFetchCurrencyQuery } from './currency-slice';
import { schema } from './schema';
import { themes } from '../../themes';
import { FormInput, FormSelect } from '../../components';
import { FIELDS_LABELS, FIELDS_NAME } from '../../constants';

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
  const formSubmitButtonHandler: SubmitHandler<IFormInputs> = (
    data: IFormInputs
  ) => {
    const { amount, ...rest } = data;
    convertCurrency({
      ...rest
    });
  };

  const roundedFinalResult =
    Number(result?.toFixed(4)) * Number(getValues(FIELDS_NAME.AMOUNT));

  const currencyResult =
    roundedFinalResult &&
    ` ${getValues(FIELDS_NAME.AMOUNT)} ${getValues(FIELDS_NAME.FROM)} =
              ${roundedFinalResult} ${getValues(FIELDS_NAME.TO)}`;

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <form onSubmit={handleSubmit(formSubmitButtonHandler)}>
        <Stack width={'18rem'} spacing={1}>
          <FormInput
            defaultValue={0}
            name={FIELDS_NAME.AMOUNT}
            label={FIELDS_LABELS.AMOUNT}
            //@ts-ignore
            control={control}
            errors={errors}
          />
          <FormSelect
            name={FIELDS_NAME.FROM}
            label={FIELDS_LABELS.FROM}
            data={data}
            defaultValue={data[0]}
            //@ts-ignore
            control={control}
            errors={errors}
          />
          <FormSelect
            name={FIELDS_NAME.TO}
            label={FIELDS_LABELS.TO}
            data={data}
            defaultValue={data[1]}
            //@ts-ignore
            control={control}
            errors={errors}
          />
          <br />
          {isConvertLoading ? (
            <LoadingButton loading variant="contained">
              Submit
            </LoadingButton>
          ) : (
            <Button variant={'contained'} type="submit">
              Convert
            </Button>
          )}

          {result && (
            <Typography {...themes?.typographyTheme} variant={'h6'}>
              {currencyResult}
            </Typography>
          )}
        </Stack>
      </form>
    </>
  );
};
