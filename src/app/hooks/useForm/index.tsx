import React from 'react';

// Custom Hook para gestionar el estado del formulario

interface props {
  initialState: any
  onSubmit: (value:any)=> void
}

export const useForm = ({initialState, onSubmit}:props) => {
  const [values, setValues] = React.useState(initialState);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    onSubmit(values);
  };

  return {
    values,
    handleChange,
    handleSubmit,
  };
};

// // Componente de formulario que utiliza el custom hook
// const MyForm = () => {
//   // Define la lógica que se ejecutará al enviar el formulario
//   const handleFormSubmit = (formData) => {
//     // Aquí puedes realizar acciones como enviar los datos al servidor
//     console.log('Datos del formulario:', formData);
//   };

//   // Usa el custom hook para gestionar el estado del formulario
//   const { values, handleChange, handleSubmit } = useForm(
//     { name: '', email: '', message: '' },
//     handleFormSubmit
//   );

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Nombre:
//         <input type="text" name="name" value={values.name} onChange={handleChange} />
//       </label>
//       <label>
//         Correo Electrónico:
//         <input type="email" name="email" value={values.email} onChange={handleChange} />
//       </label>
//       <label>
//         Mensaje:
//         <textarea name="message" value={values.message} onChange={handleChange} />
//       </label>
//       <button type="submit">Enviar</button>
//     </form>
//   );
// };

// export default MyForm;