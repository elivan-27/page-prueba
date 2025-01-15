export const NavBar = ({ onOpenForm }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm" id="mainNav">
			<div className="container px-5">
				<a className="navbar-brand fw-bold" href="#page-top">Fleteo</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarResponsive"
					aria-controls="navbarResponsive"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					Menu
					<i className="bi-list"></i>
				</button>
				<div className="collapse navbar-collapse" id="navbarResponsive">
					<ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
						<li className="nav-item"><a className="nav-link me-lg-3" href="#features">Características</a></li>
						<li className="nav-item"><a className="nav-link me-lg-3" href="#download">Descargar</a></li>
					</ul>
					<a 
							className="btn btn-dark rounded-pill px-3 mb-2 mb-lg-0"
							onClick={ onOpenForm }
					>
							<span className="d-flex align-items-center">
									<i className="bi-chat-text-fill me-2"></i>
									<span className="small">Enviar sugerencias</span>
							</span>
					</a>
				</div>
			</div>
		</nav>
  )
}