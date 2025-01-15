import { useState } from 'react';

export const InputsText = ({ name, value, onChange, minLength = 3 }) => {
  // Estado para controlar si el campo ha sido tocado
  const [touched, setTouched] = useState(false);

  // Determinar el tipo de input según el nombre
  let inputType = 'text'; // Valor por defecto
  
  if (name === 'email') {
    inputType = 'email';
  } else if (name === 'phone') {
    inputType = 'tel';
  }

  // Validación de longitud mínima
  const isValid = value.length >= minLength;

  const handleBlur = () => {
    // Marca el campo como tocado cuando el campo pierde el foco
    setTouched(true);
  };

  return (
    <div className="form-floating mb-3">
      <input 
        className={`form-control ${!isValid && touched ? 'is-invalid' : ''}`}
        id={name} 
        type={inputType}
        placeholder={`Ingrese su ${name}`}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur} // Marca el campo como tocado cuando pierde el foco
      />
      <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>

      {/* Mostrar un mensaje de error solo si el campo fue tocado y no es válido */}
      {!isValid && touched && (
        <div className="invalid-feedback">
          ¡El campo es obligatorio!
        </div>
      )}
    </div>
  );
};
