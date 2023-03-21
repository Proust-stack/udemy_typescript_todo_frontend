import React, { FC, ReactElement } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Profile } from '../profile/Profile';
import { TaskForm } from '../taskForm/taskForm';

const SidebarContainer = styled(Grid)(({ theme }) => ({
  height: '100vh',
  position: 'fixed',
  right: 0,
  top: 0,
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
})) as typeof Grid;

export const Sidebar: FC = (): ReactElement => {
  return (
    <SidebarContainer item md={4} px={4}>
      <Profile name="Me" />
      <TaskForm />
    </SidebarContainer>
  );
};
