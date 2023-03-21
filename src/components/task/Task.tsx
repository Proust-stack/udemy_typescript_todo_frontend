import React, { FC, ReactElement } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { TaskHeader } from './taskHeader/TaskHeader';
import { TaskDescription } from './taskDescription/TaskDescription';
import { TaskFooter } from './taskFooter/TaskFooter';
import { ITask } from './interfaces/ITask';
import { Status } from '../taskForm/enums/Status';
import { Priority } from '../taskForm/enums/Priority';
import PropTypes from 'prop-types';
import { renderPriorityColor } from './helpers/renderPriorityColor';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  marginBottom: '2rem',
  padding: '1rem',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  border: '1px solid',
})) as typeof Box;

export const Task: FC<ITask> = (props): ReactElement => {
  const {
    title = 'add title',
    date = new Date(),
    description = 'add description',
    priority = Priority.normal,
    status = Status.inProgress,
    id,
    onStatusChange,
    onClick,
  } = props;
  return (
    <Container sx={{ borderColor: renderPriorityColor(priority) }}>
      <TaskHeader title={title} date={date} />
      <TaskDescription description={description} />
      <TaskFooter
        onStatusChange={onStatusChange}
        onClick={onClick}
        id={id}
        status={status}
      />
    </Container>
  );
};

Task.propTypes = {
  title: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  onStatusChange: PropTypes.func,
  onClick: PropTypes.func,
  priority: PropTypes.string,
  status: PropTypes.string,
};
