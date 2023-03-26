import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { FormEvent } from "react";
import React from "react";
import { getArtistSongs } from "~/models/artists.server";
import stylesUrl from "~/styles/songs.css";
import { useLocation, redirect } from "react-router-dom";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

type LoaderData = {
  data: Awaited<ReturnType<typeof getArtistSongs>>;
};

export const loader: LoaderFunction = async ({params}) => {
  return json<LoaderData>({
    data: await getArtistSongs(params.artist),
  });
};

export default function Artist() {
  let location = useLocation();
  console.log({location});
  const [artistName, setArtistName] = React.useState(location);
  const { data } = useLoaderData() as LoaderData;
  const onSearch = (e: FormEvent) => {
    console.log('triggered');
	  e.preventDefault();
    redirect(`/${artistName}`);
}

  return (
    <main>
      <h1>
        From which artist do you want songs?
	  </h1>
	<form onSubmit={onSearch} className="search-form">
		{/* <input name="artist-name" value={artistName} onChange={(e) => setArtistName(e.target.value)} /> */}
		<button type="submit">Search!</button>
	</form>
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