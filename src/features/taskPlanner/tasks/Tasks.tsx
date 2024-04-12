import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import styles from './Tasks.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useAppDispatch } from '../../../app/hooks';
import { deleteTask } from '../taskList/taskListSlice';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteTask from '../deleteTask/DeleteTask';

const ToDoStatus = () => (
  <CircularProgress variant='determinate'
    value={100} sx={{ color: '#e5e6e9' }} className={styles.circleProgress} />
);

const InProgressStatus = () => (
  <CircularProgress variant='determinate' value={50} color='primary'
    sx={{
      color: 'conic-gradient(primary 50%, lightgray 0)'
    }}
    className={styles.circleProgress}
  />
);

const DoneStatus = () => (
  <CircularProgress variant='determinate' value={100} color='primary' className={styles.circleProgress} />
);

const TasksComponent = (props: any) => {
  const { handleEdit } = props;
  const dispatch = useAppDispatch();
  const [taskStatus, setTaskStatus] = useState('To Do');
  const [open, setOpen] = useState(false);

  const handleTaskStatus = () => {
    if (taskStatus === 'To Do') {
      setTaskStatus('In Progress')
    }
    else if (taskStatus === 'In Progress') {
      setTaskStatus('Done')
    }
    else {
      setTaskStatus('To Do')
    }
  }

  const handleDeleteTask = () => {
    dispatch(deleteTask({ id: props.task.id }));
  }

  const handleCancel = () => {
    setOpen(false);
  }

  const handleEditTask = () => {
    handleEdit(props.task);
  }

  let StatusComponent;
  if (taskStatus === 'To Do') {
    StatusComponent = ToDoStatus;
  } else if (taskStatus === 'In Progress') {
    StatusComponent = InProgressStatus;
  } else {
    StatusComponent = DoneStatus;
  }

  let priorityColor = '';

  switch (props.task.priority) {
    case 'high':
      priorityColor = 'red';
      break;
    case 'medium':
      priorityColor = 'orange';
      break;
    case 'low':
      priorityColor = 'lightgreen';
      break;
    default:
      priorityColor = 'inherit';
  }

  return (
    <>
      <Box>
        <Box className={styles.taskCard}>
          <Box className={styles.titleContainer}>
            <span className={styles.taskTitle}>Task</span>
            <span className={styles.task}>{props.task.text}</span>
          </Box>
          <Box className={styles.priorityContainer}>
            <span className={styles.priorityTitle}>Priority</span>
            <span className={styles.priorityStatus} style={{ color: priorityColor }}>{props.task.priority}</span>
          </Box>
          <Box className={styles.taskStatusWrapper}>
            <Button className={styles.status} onClick={handleTaskStatus}>{taskStatus}</Button>
          </Box>
          <Stack spacing={2} direction='row'>
            <StatusComponent />
          </Stack>
          <Box className={styles.actions}>
            <EditNoteIcon className={styles.editTask} onClick={handleEditTask} />
            <DeleteIcon className={styles.deleteIcon} onClick={() => setOpen(true)} />
          </Box>
          <DeleteTask open={open} handleDeleteTask={handleDeleteTask} handleCancel={handleCancel} />
        </Box>
      </Box>
    </>
  )
}

export default TasksComponent;
