import React, { FC, ReactElement } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import { ITaskDescription } from '../interfaces/ITaskDescription';

const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '2rem',
})) as typeof Box;

export const TaskDescription: FC<ITaskDescription> = (props): ReactElement => {
  const { description = 'add description' } = props;
  return (
    <Container>
      <Typography>{description}</Typography>
    </Container>
  );
};

TaskDescription.propTypes = {
  description: PropTypes.string,
};
