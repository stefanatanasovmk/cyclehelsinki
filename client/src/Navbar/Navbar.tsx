import { Button } from "@mui/material";
import "./Style/Navbar.css";

export default function Navbar(): JSX.Element {
  return (
    <div className="Navbar">
      <div className="Navbar-logo" onClick={() => window.location.reload()}>
        {/* <span id="LogoText">Cycle Helsinki</span> */}
        <h1 id="LogoText">Cycle Helsinki</h1>
      </div>
    </div>
  );
}
