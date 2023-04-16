import type { LinksFunction } from "@remix-run/node";
import { Link, Links, LiveReload, Outlet } from "@remix-run/react";
import globalStylesUrl from "./styles/global.css";
import navigationStylesUrl from "./styles/navigation.css"

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: globalStylesUrl,
    },
    {
      rel: "stylesheet",
      href: navigationStylesUrl,
    }
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Artists on Remix</title>
        <Links />
      </head>
      <body>
        <nav className="navMenu">
          <Link to={`/`}>Home</Link>
          <Link to={`/artists`}>Artists</Link>
          <Link to={`/artists/artistSongs/`}>Songs</Link>
          <div className="dot"></div>
        </nav>
        <Outlet />
        <LiveReload />
      </body>
    </html>
  );
}
