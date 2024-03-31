import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";


interface IFormInputs {
  from: string
  to: string
}
export const Convertor = () => {
  const { register, handleSubmit, watch, formState: { errors}} = useForm<IFormInputs>()
  return(

  )
}