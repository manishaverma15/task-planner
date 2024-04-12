import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TasksComponent from '../tasks/Tasks';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import styles from './TaskList.module.css';
import CustomModal from '../taskModal/TaskModal';
import { Task } from './taskListSlice';

const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.addTask.tasks);
  const [open, setOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingTaskId, setEditingTaskId] = React.useState<string>('');

  const selectedTask = useSelector((state: RootState) =>
    state.addTask.tasks.find((task: Task) => task.id === editingTaskId)) || { id: '', text: '', priority: '' };

  const handleEdit = (taskId: string) => {
    setOpen(true);
    setIsEditing(true);
    setEditingTaskId(taskId);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Box className={styles.containerWrapper}>
      <Box className={styles.mainContainer}>
        <Box className='page_wrapper'>
          <Box className={styles.taskListHeading}>
            <h1>Task List</h1>
            <Button variant='contained'
              className={styles.addTaskButton}
              onClick={() => setOpen(true)}
            >
              <AddIcon className={styles.addIcon} />
              <Typography className={styles.addTitle}>Add Task</Typography>
            </Button>
          </Box>
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className={styles.list}>
                <>
                  <Box>
                    <TasksComponent
                      task={task}
                      handleEdit={() => handleEdit(task.id)}
                    />
                  </Box>
                </>
              </li>
            ))}
          </ul>
          <Box>
            <CustomModal open={open} handleClose={handleClose}
              isEditing={isEditing} selectedTask={selectedTask} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default TaskList;
