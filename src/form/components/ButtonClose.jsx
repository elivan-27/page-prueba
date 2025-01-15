export const ButtonClose = ({ onCloseForm }) => {
  return (
    <button
        onClick={onCloseForm}
        type="button"
        className="btn-close"
        aria-label="Close"
    />
  )
}