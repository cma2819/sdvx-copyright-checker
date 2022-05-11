import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { depend } from 'velona';
import { Song } from '../modules/songs';

export type SongStore = {
  updatedAt: string;
  songs: Song[];
};

let store: SongStore | null = null;

export const readSongs = depend(
  {
    fileName: 'songs.json',
  },
  ({ fileName }): SongStore => {
    if (!store) {
      const storeJson = JSON.parse(readFileSync(resolve(process.cwd(), './store', fileName)).toString());
      store = {
        updatedAt: storeJson.updatedAt,
        songs: storeJson.songs,
      }
    }

    return store;
  }
);

export const saveStore = depend(
  {
    fileName: 'songs.json',
  },
  ({ fileName }, now: Date, songs: Song[]) => {
    const store: SongStore = {
      updatedAt: `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`,
      songs: songs,
    };
    writeFileSync(resolve(process.cwd(), './store', fileName), JSON.stringify(store, null, 2));
  }
);