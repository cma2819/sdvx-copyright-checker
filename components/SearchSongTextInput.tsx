import { Search } from '@mui/icons-material';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

type Props = TextFieldProps;

const TextInput = styled.input`
  font-size: 1.5rem;
  background-color: #ffffdd;
  border-color: #ffffff;
`;

export const SearchSongTextInput = (props: Props) => {
  return <TextField
            variant="outlined"
            fullWidth
            {...props}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              style: {
                fontSize: '1.5rem',
              }
            }}
          />
}