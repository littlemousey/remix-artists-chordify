type Song = {
	link: string,
	renamedTitle: string,
	chordSummary: string,
	slug: string
	songInfo: {
		artworkUrl: string,
		title: string
	}
}

export async function getArtistSongs(artist: string = 'madonna') {
	const res = await fetch(
	  `https://chordify.net/api/v2/artists/${artist}/songs`
	).then((res) => res.json());
  
	return res as Song[];
  }