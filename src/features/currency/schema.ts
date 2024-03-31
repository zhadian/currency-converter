import * as yup from 'yup';

export const schema = yup.object().shape({
  amount: yup
    .number()
    .typeError('Please provide an amount number.')
    .required('Please provide an amount number.')
    .moreThan(0)
    .max(200),
  to: yup.string().required(),
  from: yup.string().required()
});
