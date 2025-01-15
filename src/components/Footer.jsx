export const Footer = () => {
  return (
    <footer className="bg-black text-center py-5">
			<div className="container px-5">
				<div className="text-white-50 small">
					<div className="d-flex flex-column flex-md-row justify-content-center">
						<a>+57 300 2172219</a>
						<span className="mx-1 d-none d-md-inline-block">&middot;</span>
						<a href="mailto:hguzman@cars-ok.com">hguzman@cars-ok.com</a>
					</div>
					<br />
					<br />
					<div className="mb-2">&copy; CarsOk S.A.S 2018. All Rights Reserved.</div>
					<a href="#!">Privacy</a>
					<span className="mx-1">&middot;</span>
					<a href="#!">Terms</a>
					<span className="mx-1">&middot;</span>
					<a href="#!">FAQ</a>
				</div>
			</div>
		</footer>
  )
}