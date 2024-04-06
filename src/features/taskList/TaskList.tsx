import React from "react";
import { Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CustomModal from "../customModal/CustomModal";
import TasksComponent from "../tasks/Tasks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import styles from './TaskList.module.css';


const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.addTask.tasks);
  console.log('tasks', tasks)

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }


  return (
    <Box sx={{ backgroundColor: 'lightgray', height: '100vh' }}>
      <Box className={styles.mainContainer}>
        <Box className='page_wrapper'>
          <Box
            sx={{ display: 'flex', alignItems: 'flex-start', paddingTop: '30px', justifyContent: 'space-around' }}>
            <h1>Task List</h1>
            <Button variant="contained"
              sx={{ backgroundColor: '#713fff', marginTop: 3, textTransform: 'none' }}
              onClick={handleOpen}
            >
              <AddIcon />Add Task</Button>
          </Box>
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className={styles.list}>
                <>
                  {console.log("Task ID:", task.id)}
                  <Box>
                    <TasksComponent text={task.text} priority={task.priority} id={task.id} />
                  </Box>
                </>
              </li>
            ))}
          </ul>
          <Box>
            <CustomModal open={open} handleClose={handleClose} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default TaskList;