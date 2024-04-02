import React, { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/joy/Stack';
import { apiSlice, useFetchCurrencyQuery } from './currency-slice';
import { schema } from './schema';
import { themes } from '../../themes';
import { FormInput, FormSelect } from '../../components';
import { FIELDS_LABELS, FIELDS_NAME } from '../../constants';
import { IFormInputs } from '../../types';

export const Convertor = () => {
  const {
    data = [],
    isLoading,
    isError: isFetchCurrencyError
  } = useFetchCurrencyQuery();
  const [
    convertCurrency,
    {
      data: result,
      isLoading: isConvertLoading,
      isFetching,
      isError: isConvertingError
    }
  ] = apiSlice.endpoints?.convertCurrency.useLazyQuery();

  const { resultContainerTheme, typographyTheme } = themes ?? {};

  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });
  const formSubmitButtonHandler: SubmitHandler<IFormInputs> = (
    data: IFormInputs
  ) => {
    const { amount, ...rest } = data;
    convertCurrency(rest);
  };

  const roundedFinalResult = useMemo(() => {
    if (result) {
      return `${getValues(FIELDS_NAME.AMOUNT)} ${getValues(FIELDS_NAME.FROM)} =
              ${(Number(result) * Number(getValues(FIELDS_NAME.AMOUNT))).toFixed(4)} ${getValues(FIELDS_NAME.TO)}`;
    }
  }, [result, getValues(FIELDS_NAME.AMOUNT)]);

  if (isLoading) return <CircularProgress />;
  if (isFetchCurrencyError)
    return <Typography variant="h5">Oops, Something went wrong!</Typography>;

  return (
    <>
      <form onSubmit={handleSubmit(formSubmitButtonHandler)}>
        <Stack width={'18rem'} spacing={1}>
          <FormInput
            defaultValue={0}
            name={FIELDS_NAME.AMOUNT}
            label={FIELDS_LABELS.AMOUNT}
            control={control}
            errors={errors}
          />
          <FormSelect
            name={FIELDS_NAME.FROM}
            label={FIELDS_LABELS.FROM}
            data={data}
            defaultValue={data[0]}
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
          {isConvertLoading || isFetching ? (
            <LoadingButton loading variant="contained">
              Submit
            </LoadingButton>
          ) : (
            <Button
              disabled={!isDirty || !isValid}
              variant={'contained'}
              type="submit"
            >
              Convert
            </Button>
          )}

          <Box {...resultContainerTheme}>
            {result && !isFetching && (
              <Typography {...typographyTheme} variant={'h6'}>
                {isConvertingError
                  ? 'Oops, Something went wrong!'
                  : roundedFinalResult}
              </Typography>
            )}
          </Box>
        </Stack>
      </form>
    </>
  );
};
