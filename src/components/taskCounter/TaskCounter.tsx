import React, { FC, ReactElement } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { ITaskCounter } from './interfaces/ITaskCounter';
import { Status } from '../taskForm/enums/Status';
import { emitCorrectBorderColor } from './helpers/emitCorrectBorderColor';
import { emitCorrectLabel } from './helpers/emitCorrectLabel';

const TaskCounterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
})) as typeof Box;

const AvatarComponent = styled(Avatar)(({ theme }) => ({
  backgroundColor: 'transparent',
  border: '5px solid',
  width: '96px',
  height: '96px',
  marginBottom: '16px',
})) as typeof Avatar;

const CounterTypography = styled(Typography)(({ theme }) => ({
  color: 'white',
})) as typeof Typography;

const SubtitleTypography = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1.5rem',
})) as typeof Typography;

export const TaskCounter: FC<ITaskCounter> = (props): ReactElement => {
  const { status = Status.completed, count = 0 } = props;
  return (
    <TaskCounterContainer>
      <AvatarComponent
        sx={{ borderColor: `${emitCorrectBorderColor(status)}` }}
      >
        <CounterTypography variant="h4">{count}</CounterTypography>
      </AvatarComponent>
      <SubtitleTypography variant="h5">
        {emitCorrectLabel(status)}
      </SubtitleTypography>
    </TaskCounterContainer>
  );
};

TaskCounter.propTypes = {
  status: PropTypes.oneOf([Status.todo, Status.inProgress, Status.completed]),
  count: PropTypes.number,
};
