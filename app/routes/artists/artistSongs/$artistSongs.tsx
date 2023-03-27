import { ActionFunction, LinksFunction, LoaderFunction, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getArtistSongs } from "~/models/artists.server";
import stylesUrl from "~/styles/songs.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

type LoaderData = {
  data: Awaited<ReturnType<typeof getArtistSongs>>;
};

export const loader: LoaderFunction = async ({params}) => {
  return json<LoaderData>({
    data: await getArtistSongs(params.artistSongs),
  });
};

export const action: ActionFunction = async({ request }) => {
  const formData = await request.formData();
  const artistName = formData.get('artistName');

  if (typeof artistName === 'string') {
    return redirect(`/artists/artistSongs/${artistName}`);
  }
};

export default function Artist() {
  const { data } = useLoaderData() as LoaderData;

  return (
    <main>
      <h1>
        From which artist do you want songs?
	  </h1>
	<Form method="post" className="search-form">
		<input name="artistName" type="text" />
		<button type="submit">Search!</button>
	</Form>
      <div className="container">
        {data.map((song) => (
          <figure key={song.slug}>
			<img src={song.songInfo.artworkUrl} alt={`${song.slug}`} />
			<figcaption><a href={`chordify.net${song.link}`}>{song.renamedTitle}</a></figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}