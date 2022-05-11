import { fetchPagesCount, loadSongsIn, Song } from '../modules/songs';
import { saveStore } from '../store/song.store';

console.log('Load songs from official website');

const range = (end: number) => {
  return Array.from(Array(end - 1), (_, key) => key + 1);
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
  saveStore(new Date(), songs);
  console.log('Finish to fetch all songs.');
  console.debug(songs);
})
.catch((err) => {
  console.error(err);
  process.exit(process.exitCode === undefined ? process.exitCode : 1);
})
.finally(() => {
  process.exit();
});
