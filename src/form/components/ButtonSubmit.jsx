export const ButtonSubmit = ({ handleSubmit }) => {
  return (
    <div className="d-grid">
			<button
				className="btn btn-primary rounded-pill btn-lg"
				id="submitButton"
				type="submit"
				onClick={ handleSubmit }
			>
				Enviar
			</button>
		</div>
  )
}