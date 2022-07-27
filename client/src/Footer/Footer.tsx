import "./Style/Footer.css";
import AtanasovLogo from "./Assets/AtanasovLogo.png";
import { Typography } from "@mui/material";

export default function Footer(): JSX.Element {
  return (
    <div className="Footer">
      <Typography
        variant="body2"
        color="textSecondary"
        style={{ paddingLeft: "0.5vw" }}
      >
        &copy; CycleHelsinki.fi
      </Typography>
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
