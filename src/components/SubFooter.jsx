export const SubFooter = () => {
  return (
    <>
      <section className="cta" style={{ position: 'relative' }}>
        <img
          src="assets/img/ola-removebg-preview.png"
          alt="Ola decorativa"
          className="img-fluid ola-decorativa"
          style={{ position: 'absolute', bottom: '-35px', left: '0', width: '100%', height: '100%' }}
        />
        <div className="cta-content">
          <div className="container px-5">
            <h2 className="text-white display-1 lh-1 mb-4">
              ¡No esperes más
              <br />
              descárgala ahora!
            </h2>
            <a className="btn btn-outline-light py-3 px-4 rounded-pill" href="#download">Descargar gratis</a>
          </div>
        </div>
      </section>

      <section className="bg-gradient-primary-to-secondary" id="download">
        <div className="container px-5">
          <h2 className="text-center text-white font-alt mb-4">Obtenga la aplicación ahora!</h2>
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center">
            <a className="me-lg-3 mb-4 mb-lg-0" href="https://play.google.com/store/apps/details?id=co.carsok.fleteo" target="_blank" rel="noopener noreferrer">
              <img className="app-badge" src="assets/img/google-play-badge.svg" alt="Google Play" />
            </a>
            <a href="https://apps.apple.com/us/app/fleteo/id6477316738" target="_blank" rel="noopener noreferrer">
              <img className="app-badge" src="assets/img/app-store-badge.svg" alt="App Store" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}