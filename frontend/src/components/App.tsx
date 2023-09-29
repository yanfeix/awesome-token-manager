import React, { useState } from 'react';
import { Container, Divider } from '@mui/material';
import { Stack } from '@mui/system';
import { Generator } from './generator';
import { Validator } from './validator';

const App = () => {
  const [token, setToken] = useState<string>();

  const onTokenGenerated = (token: string) => {
    setToken(token)
  }

  return (
    <Container maxWidth="md">
      <Stack spacing={4}>
        <Generator onGenerated={onTokenGenerated} />
        <Divider />
        <Validator token={token ?? ''} />
      </Stack>
    </Container>
  );
}

export default App;
