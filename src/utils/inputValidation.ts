import { KeyboardEvent } from 'react';

const isNumberKey = (key?: string) => key?.match(/^\d+$/);
const isSpecialCharacter = (key?: string) => key?.match(/\W|_/g);
export const inputValidation = (e: KeyboardEvent<HTMLInputElement>) => {
  const helperKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
  if (helperKeys.includes(e.key)) return;
  if (!isNumberKey(e.key) || isSpecialCharacter(e.key))
    return e.preventDefault();
};
