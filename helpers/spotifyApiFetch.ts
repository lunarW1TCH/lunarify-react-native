export async function fetchArtists(
  token: string,
  timeRange: string
): Promise<SpotifyApi.UsersTopArtistsResponse> {
  const result = await fetch(
    `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${timeRange}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return await result.json();
}

export async function fetchSongs(
  token: string,
  timeRange: string
): Promise<SpotifyApi.UsersTopTracksResponse> {
  const result = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${timeRange}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return await result.json();
}
