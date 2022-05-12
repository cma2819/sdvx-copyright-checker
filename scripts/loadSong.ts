import { fetchPagesCount, loadSongsIn, Song } from '../modules/songs';
import { readSongs, saveStore } from '../store/song.store';

console.log('Load songs from official website');

const range = (length: number) => {
  return Array.from(Array(length), (_, key) => key + 1);
}

fetchPagesCount()
.then((pages) => {
  return range(pages).reduce((promise, page) => {
    return promise.then(async (prev) => {
      const songs = await loadSongsIn(page);

      return [
        ...prev,
        ...songs
      ];
    });
  }, Promise.resolve<Song[]>([]));
})
.then((songs) => {
  if (JSON.stringify(readSongs().songs) !== JSON.stringify(songs)) {
    saveStore(new Date(), songs);
    console.log('Finish to fetch all songs.');
  } else {
    console.log('Store is up to date.');
  }
})
.catch((err) => {
  console.error(err);
  process.exit(process.exitCode === undefined ? process.exitCode : 1);
})
.finally(() => {
  process.exit();
});
