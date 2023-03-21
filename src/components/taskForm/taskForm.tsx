import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { TaskTitleField } from './TaskTitleField';
import { TaskDescriptionField } from './TaskDescriptionField';
import Stack from '@mui/material/Stack';
import { TaskDateField } from './TaskDateField';
import { TaskSelectField } from './TaskSelectField';
import { Status } from './enums/Status';
import { Priority } from './enums/Priority';
import { LinearProgress, Button, Alert, AlertTitle } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ICreateTask } from '../taskArea/interfaces/ICreateTask';
import { URL } from '../../utils/constants';
import { TaskStatusChangeedContext } from '../../context';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  padding: '0 4px',
  margin: '6px 0',
})) as typeof Box;

const FormWrapper = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  padding: '0 4px',
  margin: '6px 0',
})) as typeof Stack;
const AlertComponent = styled(Alert)(({ theme }) => ({
  width: '100%',
})) as typeof Alert;

export const TaskForm: FC = (): ReactElement => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<string>(Status.todo);
  const [priority, setPriority] = useState<string>(Priority.normal);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const tasksUpdatedContext = useContext(TaskStatusChangeedContext);

  const createTaskMutation = useMutation((data: ICreateTask) =>
    sendApiRequest(URL, 'POST', data),
  );

  useEffect(() => {
    if (createTaskMutation.isSuccess) {
      setShowSuccess(true);
      tasksUpdatedContext.toggle();
    }
    const successTimeout = setTimeout(() => {
      setShowSuccess(false);
    }, 2000);

    return () => {
      clearTimeout(successTimeout);
    };
  }, [createTaskMutation.isSuccess]);

  function createTaskHandler() {
    if (!title || !date || !description) {
      return;
    }
    const task: ICreateTask = {
      title,
      description,
      date: date.toString(),
      status,
      priority,
    };
    createTaskMutation.mutate(task);
  }

  return (
    <Container>
      {showSuccess && (
        <AlertComponent severity="success">
          <AlertTitle>Success</AlertTitle>
          The task has been successfully created
        </AlertComponent>
      )}
      <Typography component="h2" variant="h6" mb={2}>
        Create a task
      </Typography>
      <FormWrapper spacing={2}>
        <TaskTitleField
          onChange={(e) => setTitle(e.target.value)}
          disabled={createTaskMutation.isLoading}
        />
        <TaskDescriptionField
          onChange={(e) => setDescription(e.target.value)}
          disabled={createTaskMutation.isLoading}
        />
        <TaskDateField
          value={date}
          onChange={(date) => setDate(date)}
          disabled={createTaskMutation.isLoading}
        />
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <TaskSelectField
            disabled={createTaskMutation.isLoading}
            label="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as string)}
            items={[
              { value: Status.todo, label: Status.todo },
              {
                value: Status.inProgress,
                label: Status.inProgress,
              },
              {
                value: Status.completed,
                label: Status.completed,
              },
            ]}
          />
          <TaskSelectField
            disabled={createTaskMutation.isLoading}
            label="priority"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as string)}
            items={[
              { value: Priority.high, label: Priority.high },
              {
                value: Priority.normal,
                label: Priority.normal,
              },
              {
                value: Priority.low,
                label: Priority.low,
              },
            ]}
          />
        </Stack>
        <Box sx={{ width: '100%' }}>
          {createTaskMutation.isLoading && <LinearProgress />}
        </Box>
        <Button
          disabled={!title || !description || !date || !status || !priority}
          variant="contained"
          size="large"
          fullWidth
          onClick={createTaskHandler}
        >
          Create a task
        </Button>
      </FormWrapper>
    </Container>
  );
};
