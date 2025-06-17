/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface IFormConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}
interface Props extends IFormConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
}

const AgroForm = ({ children, resolver, defaultValues, onSubmit }: Props) => {
  const formConfig: IFormConfig = {};

  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (!!resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);

  const submitHandler = methods.handleSubmit;
  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler(onSubmit)} className="space-y-6">
        {children}
      </form>
    </FormProvider>
  );
};

export default AgroForm;
