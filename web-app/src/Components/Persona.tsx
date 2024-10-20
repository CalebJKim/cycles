import React from 'react';
import { Divider, LinearProgress, Stack, Typography } from '@mui/material';

const Persona = (props: { id: number, title: string, description: string }) => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
        <Typography variant="subtitle1" sx={{ lineHeight: 1.2, mb: -1 }}>Persona {props.id}</Typography>
        {/* <Typography variant="subtitle1" sx={{ lineHeight: 1.2, mb: -1 }}>{props.score}% Positive</Typography> */}
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: -1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', flexGrow: 1, lineHeight: 1.2 }}>{props.title}</Typography>
        {/* <LinearProgress
          variant="determinate"
          value={props.score}
          sx={{
            width: '180px',
            height: 6,
            borderRadius: 5,
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#487DE7',
            },
            backgroundColor: '#CCCCCC',
          }}
        /> */}
      </Stack>
      <Typography
        variant="body2"
        sx={{
          mt: ".15rem",
          mb: "-1rem",
          lineHeight: 1.2,
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: 2,
        }}
      >
        {props.description}
      </Typography>
    </>
  );
};

export default Persona;