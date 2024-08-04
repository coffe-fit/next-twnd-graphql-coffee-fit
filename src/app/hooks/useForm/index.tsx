import React from 'react';

interface Props {
  initialState: any;
  onSubmit: (value: any) => void;
}

export const useForm = ({ initialState, onSubmit }: Props) => {
  const [values, setValues] = React.useState(initialState);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(values);
  };

  return {
    values,
    handleChange,
    handleSubmit,
  };
};
