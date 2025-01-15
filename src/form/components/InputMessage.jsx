export const InputMessage = ({ name, value, onChange}) => {
  
    return (
			<div className="form-floating mb-3">
        <textarea 
          className="form-control" 
          id="message" 
          placeholder="Ingrese su mensaje aqui..." 
          style={{ height: "10rem", resize: "none" }}
          name={name}
          value={value}
          onChange={onChange}
        ></textarea>
        <label htmlFor="message">Mensaje</label>
      </div>
    );
  }
  