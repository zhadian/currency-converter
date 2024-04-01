import { FieldValues } from 'react-hook-form';

export interface IFormInputs extends Partial<FieldValues> {
  from: string;
  to: string;
  amount: number;
}
