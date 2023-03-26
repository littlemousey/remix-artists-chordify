import type { ActionFunction, LinksFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import stylesUrl from "~/styles/artists.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};


export const action: ActionFunction = async({ request }) => {
  const formData = await request.formData();

  const artistName = formData.get('artistName');
  console.log(formData);

  if (typeof artistName === 'string') {
    return redirect(`/artists/${artistName}`);
  }
};

export default function Artists() {
  return (
    <main>
      <h1>
        Which artist are you looking for?
	  </h1>
	<Form method="post" className="search-form">
		<input type="text" placeholder="madonna" name="artistName"/>
		<button type="submit">Search!</button>
	</Form>
    </main>
  );
}