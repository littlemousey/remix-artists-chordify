type Artist = {
	imageUrl: string
	name: string
	slug: string
}

export async function getArtists(searchEntry: string = 'ma') {
	const res = await fetch(
	  `https://chordify.net/api/v2/search?q=${searchEntry}`
	).then((res) => res.json());
  
	return res.artists as Artist[];
  }