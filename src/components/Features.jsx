export const Features = () => {
  return (
    <section id="features">
			<div className="container px-5">
				<div className="row gx-5 align-items-center">
					<div className="col-lg-8 order-lg-1 mb-5 mb-lg-0">
						<div className="container-fluid px-5">
							<div className="row gx-5">
								<div className="col-md-6 mb-5">
									<div className="text-center">
										<i className="bi-phone icon-feature text-gradient d-block mb-3"></i>
										<h3 className="font-alt">Interfaz Intuitiva</h3>
										<p className="text-muted mb-0">Interfaz fácil de usar, con funcionalidades completas, sin complicaciones ni actualizaciones constantes!</p>
									</div>
								</div>
								<div className="col-md-6 mb-5">
									<div className="text-center">
										<i className="bi-lupa icon-feature text-gradient d-block mb-3"></i>
										<h3 className="font-alt">Consulta Rápida</h3>
										<p className="text-muted mb-0">Ingresa la placa de un automóvil o detalles de una persona y Fleteo te dará información al instante!</p>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12 mb-5 mb-md-0">
									<div className="text-center">
										<i className="bi-candado icon-feature text-gradient d-block mb-3"></i>
										<h3 className="font-alt">Seguridad Garantizada</h3>
										<p className="text-muted mb-0">En Fleteo, valoramos tu privacidad. La aplicación asegura la protección de tus consultas, brindándote tranquilidad en cada búsqueda de información.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-4 order-lg-0">
						<div className="features-device-mockup">
							<svg className="circle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
								<defs>
									<linearGradient id="circleGradient" gradientTransform="rotate(45)">
										<stop className="gradient-start-color" offset="0%"></stop>
										<stop className="gradient-end-color" offset="0%"></stop>
									</linearGradient>
								</defs>
								<circle cx="50" cy="50" r="50"></circle>
							</svg>
							<svg className="shape-1 d-none d-sm-block" viewBox="0 0 240.83 240.83" xmlns="http://www.w3.org/2000/svg">
								<rect x="-32.54" y="78.39" width="305.92" height="84.05" rx="42.03" transform="translate(120.42 -49.88) rotate(45)"></rect>
								<rect x="-32.54" y="78.39" width="305.92" height="84.05" rx="42.03" transform="translate(-49.88 120.42) rotate(-45)"></rect>
							</svg>
							<svg className="shape-2 d-none d-sm-block" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
								<circle cx="50" cy="50" r="50"></circle>
							</svg>
							<div className="device-wrapper">
								<div className="device" data-device="iPhoneX" data-orientation="portrait" data-color="black">
									<div className="screen bg-black">
										<img src="assets/screen-fleteo-page.jpeg" style={{ maxWidth: '100%', height: '100%' }} alt="Pagina de automotores Fleteo" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
  )
}