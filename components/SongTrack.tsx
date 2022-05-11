import { Box } from '@mui/system'
import { Song } from '../modules/songs'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

type Props = {
  song: Song;
}

const verticalAlignProps = {
  verticalAlign: 'middle',
  display: 'inline-block',
};

const Copyright = ({ copyright }: { copyright: string|null }): JSX.Element => {
  return (
    <>
      { copyright && (
        <>
          <CancelIcon sx={{
            marginRight: '0.5rem',
            color: '#ff0000',
            ...verticalAlignProps
          }} />
          <span style={verticalAlignProps}>{copyright}</span>
        </>
      )}
      { !copyright && (
        <>
          <CheckCircleOutlineIcon sx={{
            color: '#00cc00',
            ...verticalAlignProps
          }} />
        </>
      )}
    </>
  );
}

export const SongTrack = ({ song }: Props): JSX.Element => {

  const mainColor = song.copyright ? '#aa5050' : '#50aa50';
  const bgColor = song.copyright ? '#ffdddd' : '#ddffdd';

  return (
    <Box
      sx={{
        border: `1px ${mainColor} solid`,
        backgroundColor: bgColor,
        padding: '8px',
      }}
    >
    <p
      style={{
        margin: '0.5rem 0',
      }}
    >
      <Copyright copyright={song.copyright} />
    </p>
      <p
        style={{
          fontSize: '1.5rem',
          margin: '1rem 1rem',
        }}
      >
        <strong>{song.name}</strong>
        <span
          style={{
            fontSize: '0.8rem',
            margin: '0.5rem 1rem'
          }}
        >
          {song.artist}
        </span>
      </p>
      
    </Box>
  )
}