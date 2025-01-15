import React, { useEffect } from 'react';
import { InputsText, InputMessage, ButtonSubmit, ButtonClose } from '../components';
import { useForm } from '../../hooks/useForm';

export const FeedBack = ({ onCloseForm }) => {
  
  // Deshabilitar la rueda del ratón cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; }; 
  }, []);

  const phoneNumber = '3002172219'
  const initialForm = { name: '', email: '', phone: '', message: '' };

  const { name, email, phone, message, onInputChange} = useForm(initialForm);
  const resp = { name, email, phone, message } 

  const handleSubmit = (e) => {
    e.preventDefault();

    const markdownMessage = `
      *Nombre:* ${resp.name}
      *Email:* _${resp.email}_
      *Teléfono:* ${resp.phone}
      *Mensaje:* \`${resp.message}\`
      `;

    const respEnCode = encodeURIComponent( markdownMessage )
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${respEnCode}`;
    console.log(whatsappLink);

    window.open(whatsappLink, '_blank');
    onCloseForm();
  };

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div className="modal fade show" style={{ display: 'block', zIndex: '1050' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header modal-header bg-gradient-primary-to-secondary p-4">
              <h5 className="modal-title modal-title font-alt text-white" id="feedbackModalLabel">Enviar Sugerencias</h5>
              {/* Botón de cerrar (X) */}
              <ButtonClose onCloseForm={onCloseForm} />
            </div>
            <div className="modal-body">
              {/* Nombre Completo */}
              <InputsText name="name" value={name} onChange={onInputChange} />

              {/* Email */}
              <InputsText name="email" value={email} onChange={onInputChange} />

              {/* Teléfono */}
              <InputsText name="phone" value={phone} onChange={onInputChange} />

              {/* Mensaje */}
              <InputMessage name="message" value={message} onChange={onInputChange} />

              {/* Botón para enviar */}
              <ButtonSubmit handleSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
