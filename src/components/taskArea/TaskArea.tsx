import React, { FC, ReactElement, useContext, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { format } from 'date-fns';
import { styled } from '@mui/material/styles';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LinearProgress, Alert } from '@mui/material';

import { TaskCounter } from '../taskCounter/TaskCounter';
import { Task } from '../task/Task';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { URL } from '../../utils/constants';
import { ITaskApi } from './interfaces/ITaskApi';
import { Status } from '../taskForm/enums/Status';
import { IUptateTask } from '../taskForm/interfaces/IUptateTask';
import { countTasks } from './helpers/countTasks';
import { TaskStatusChangeedContext } from '../../context';

const Container = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'column',
})) as typeof Grid;

const CounterWrapper = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  flexDirection: 'row',
  alignItems: 'center',
})) as typeof Grid;

const TasksWrapper = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
})) as typeof Grid;

export const TaskArea: FC = (): ReactElement => {
  const { error, isLoading, data, refetch } = useQuery(['tasks'], async () => {
    return await sendApiRequest<ITaskApi[]>(URL, 'GET');
  });

  const tasksUpdatedContext = useContext(TaskStatusChangeedContext);

  const updateTaskMutation = useMutation((data: IUptateTask) =>
    sendApiRequest<ITaskApi>(URL, 'PUT', data),
  );

  useEffect(() => {
    refetch();
  }, [tasksUpdatedContext.updated]);

  useEffect(() => {
    if (updateTaskMutation.isSuccess) {
      tasksUpdatedContext.toggle();
    }
  }, [updateTaskMutation.isSuccess]);

  function onStatusChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) {
    updateTaskMutation.mutate({
      id,
      status: e.target.checked ? Status.inProgress : Status.todo,
    });
  }

  function markCompleteHandler(
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    updateTaskMutation.mutate({
      id,
      status: Status.completed,
    });
  }

  if (error)
    return (
      <TasksWrapper container item md={8}>
        <Alert severity="error">There was an error fetching your task</Alert>
      </TasksWrapper>
    );

  if (!error && Array.isArray(data) && data.length === 0) {
    <TasksWrapper container item md={8}>
      <Alert severity="warning">You do not have any task yet...</Alert>
    </TasksWrapper>;
  }

  return (
    <Container item md={8} px={4}>
      <Box mb={8} px={4}>
        <h4>Status of your task as on {format(new Date(), 'PPPP')}</h4>
      </Box>
      <CounterWrapper container item md={10} xs={12} mb={8}>
        <TaskCounter
          status={Status.todo}
          count={data ? countTasks(data, Status.todo) : undefined}
        />
        <TaskCounter
          status={Status.inProgress}
          count={data ? countTasks(data, Status.inProgress) : undefined}
        />
        <TaskCounter
          status={Status.completed}
          count={data ? countTasks(data, Status.completed) : undefined}
        />
      </CounterWrapper>
      <TasksWrapper container item md={8}>
        {isLoading ? (
          <LinearProgress />
        ) : (
          Array.isArray(data) &&
          data.length > 0 &&
          data.map((item, index) => {
            return item.status === Status.todo ||
              item.status === Status.inProgress ? (
              <Task
                id={item.id}
                key={item.id + index}
                title={item.title}
                date={new Date(item.date)}
                description={item.description}
                priority={item.priority}
                status={item.status}
                onStatusChange={onStatusChangeHandler}
                onClick={markCompleteHandler}
              />
            ) : null;
          })
        )}
      </TasksWrapper>
    </Container>
  );
};
