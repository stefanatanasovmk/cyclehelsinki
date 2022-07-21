import "./Style/Navbar.css";

export default function Navbar(): JSX.Element {
  return (
    <div className="Navbar">
      <div className="Navbar-logo" onClick={() => window.location.reload()}>
        <span id="LogoText" className="LogoText">
          CycleHelsinki
        </span>
      </div>
    </div>
  );
}
