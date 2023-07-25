import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import ProTip from '../src/ProTip';
import Copyright from '../src/Copyright';
import { Generator } from '../src/components/demo-generator';
import dynamic from 'next/dynamic';

export default function Home() {

  const DynamicForm = dynamic(() => import('../src/components/form'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  })

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <DynamicForm />
      </Box>
    </Container>
  );
}
