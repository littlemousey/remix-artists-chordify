import type { ActionFunction, LinksFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import stylesUrl from "~/styles/artists.css";
import searchStyles from "~/styles/search.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: stylesUrl },
    { rel: "stylesheet", href: searchStyles },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const artistName = formData.get("artistName");
  if (typeof artistName === "string") {
    return redirect(`/artists/${artistName}`);
  }
};

export default function Artists() {
  return (
    <main>
      <h1>Which artist are you looking for?</h1>
      <Form method="post" className="search-form searchWrapper">
        <div className="search">
          <input
            type="text"
            placeholder="madonna"
            name="artistName"
            className="searchTerm"
          />
          <button type="submit" className="searchButton">
            🔍
          </button>
        </div>
      </Form>
    </main>
  );
}
