import type { LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import stylesUrl from "~/styles/index.css";
import buttonStyle from "~/styles/nav-button.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: stylesUrl },
    { rel: "stylesheet", href: buttonStyle }
  ];
};

export default function IndexRoute() {
  return (
    <div className="container">
      <div className="content">
        <nav>
          <button className="glowing-btn">
            <span className="glowing-txt">
              <Link to="artists">Go to artists 🧑‍🎤</Link>
            </span>
          </button>
        </nav>
      </div>
    </div>
  );
}
