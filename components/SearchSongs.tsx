import { useState, useTransition } from 'react';
import styled from 'styled-components';
import { Song } from '../modules/songs';
import { SearchSongTextInput } from './SearchSongTextInput';
import { SongTrack } from './SongTrack';

type Props = {
  songs: Song[];
};

const Track = styled.div`
  padding: 8px;
`;

export const SearchSongs = ({ songs }: Props): JSX.Element => {

  const [filtered, setFiltered] = useState<Song[]>([]);
  const [isPending, startTransition] = useTransition();

  const search = (text: string, songs: Song[]) => {
    return songs.filter((song) => {
      return song.name.toLowerCase().includes(text.toLowerCase());
    });
  }

  const handleSearch = (text: string) => {
    startTransition(() => {
      text !== ''
      ? setFiltered(search(text, songs))
      : setFiltered([]);
    });
  }

  return (
    <>
      <SearchSongTextInput
        onChange={(e) => {handleSearch(e.currentTarget.value)}}
      />
      {
        !isPending && filtered.map(song => (
          <Track key={song.id}>
            <SongTrack song={song} />
          </Track>
        ))
      }
    </>
  );
}