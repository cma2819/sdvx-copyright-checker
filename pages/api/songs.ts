import { NextApiHandler } from 'next'
import { readSongs, SongStore } from '../../store/song.store';

const handler: NextApiHandler<SongStore> = (req, res) => {
  res.status(200).json(readSongs());
}

export default handler;