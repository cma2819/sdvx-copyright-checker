import { readSongs } from './song.store';

const injected = readSongs.inject({ fileName: 'songs.test.json' });

it('should be read songs', () => {
  const songs = injected();

  expect(songs).toStrictEqual({
    updatedAt: '2222/3/11',
    songs: [
      {
        id: 'music-id-1',
        name: 'きょくのなまえ',
        artist: 'あーてぃすと',
        copyright: 'コピーライトあり'
      },
      {
        id: 'music-id-2',
        name: 'really awesome music',
        artist: 'big artist',
        copyright: null
      }
    ]
  });
});