import React, { FC, ReactElement } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { ITaskHeader } from '../interfaces/ITaskHeader';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '2rem',
})) as typeof Box;

export const TaskHeader: FC<ITaskHeader> = (props): ReactElement => {
  const { title = 'Default title', date = new Date() } = props;
  return (
    <Container>
      <Box>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box>
        <Chip variant="outlined" label={format(date, 'PPP')} />
      </Box>
    </Container>
  );
};

TaskHeader.propTypes = {
  title: PropTypes.string,
  date: PropTypes.instanceOf(Date),
};
