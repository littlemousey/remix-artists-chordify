import type { ActionFunction, LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { redirect } from "react-router-dom";
import { getArtists } from "~/models/search.server";
import artistStyles from "~/styles/artists.css";
import songsStyles from "~/styles/songs.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: songsStyles },
    { rel: "stylesheet", href: artistStyles }
];
};

type LoaderData = {
  data: Awaited<ReturnType<typeof getArtists>>;
};

export const loader: LoaderFunction = async ({params}) => {
  return json<LoaderData>({
    data: await getArtists(params.artist),
  });
};

export const action: ActionFunction = async({ request }) => {
  const formData = await request.formData();
  const artistName = formData.get('artistName');

  if (typeof artistName === 'string') {
    return redirect(`/`);
  }
};

export default function Artist() {
  const { data } = useLoaderData() as LoaderData;

  return (
    <main>
      <h1>
        From which artist do you want songs?
	  </h1>
	<Form className="search-form">
		<input type="text" name="artistName" />
		<button type="submit">Search!</button>
	</Form>
    <div className="container">
        {data.map((artist) => (
      <Link to={`/artists/artistSongs/${artist.name}`} key={artist.slug}>
        <div className="artist-profile">
          <img className="profile-picture" src={artist.imageUrl} alt={artist.slug} />
          <span className="artist-name">{artist.slug}</span>
        </div>
      </Link>
        ))}
      </div>
    </main>
  );
}