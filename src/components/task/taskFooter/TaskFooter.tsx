import React, { FC, ReactElement } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { ITaskFooter } from '../interfaces/ITaskFooter';
import { Status } from '../../taskForm/enums/Status';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '2rem',
  width: '100%',
})) as typeof Box;

export const TaskFooter: FC<ITaskFooter> = (props): ReactElement => {
  const {
    id,
    status,
    onStatusChange = (e) => console.log(e.target),
    onClick = (e) => console.log(e.target),
  } = props;
  return (
    <Container>
      <FormControlLabel
        label="In progress"
        control={
          <Switch
            defaultChecked={status === Status.inProgress}
            color="warning"
            onChange={(e) => onStatusChange(e, id)}
          />
        }
      />
      <Button
        variant="contained"
        color="success"
        size="small"
        sx={{ color: 'white' }}
        onClick={(e) => onClick(e, id)}
      >
        Mark complete
      </Button>
    </Container>
  );
};

TaskFooter.propTypes = {
  onStatusChange: PropTypes.func,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  status: PropTypes.string,
};
