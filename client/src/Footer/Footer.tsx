import "./Style/Footer.css";
import AtanasovLogo from "./Assets/AtanasovLogo.png";
export default function Footer(): JSX.Element {
  return (
    <div className="Footer">
      <a
        href="https://www.atanasov.fi"
        target="_blank"
        rel="noreferrer"
        style={{ height: "100%" }}
      >
        <img src={AtanasovLogo} alt="AtanasovLogo" height="100%" />
      </a>
    </div>
  );
}
