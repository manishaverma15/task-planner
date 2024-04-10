import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TasksComponent from "../tasks/Tasks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import styles from './TaskList.module.css';
import CustomModal from "../customModal/CustomModal";
import { useAppDispatch } from "../../../app/hooks";
import { Task, editTask, loadTasksFromLocalStorage } from "./taskListSlice";

const TaskList = () => {
  const dispatch = useAppDispatch();
  const tasks = useSelector((state: RootState) => state.addTask.tasks);
  const [open, setOpen] = React.useState(false);
  const [editingTaskId, setEditingTaskId] = React.useState<string | null>(null);
  const [editedText, setEditedText] = React.useState('');
  const [editedPriority, setEditedPriority] = React.useState('');
  const [isEditing, setIsEditing] = React.useState(false);
  
  const handleEdit = (taskId: string) => {
    console.log('task-id', taskId)
    setEditingTaskId(taskId);
    setOpen(true);
    setIsEditing(true)
    const task = tasks.find(task => task.id === taskId);
    return task;
  }

  const handleClose = () => {
    setOpen(false);
    setEditingTaskId(null);
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
              onClick={() => setOpen(true)}
            >
              <AddIcon />Add Task</Button>
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
             isEditing={isEditing} handleEdit={handleEdit}/>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default TaskList;

// const TaskList = () => {
//   const dispatch =  useAppDispatch();
//   const tasks = useSelector((state: RootState) => state.addTask.tasks);
//   const [open, setOpen] = React.useState(false);
//   const [editingTaskId, setEditingTaskId] = React.useState<string | null>(null);

//   const handleEdit = (task: Task) => {
//     setEditingTaskId(task.id);
//     setOpen(true);
//   }
  
//   const handleClose = () => {
//     setOpen(false);
//     setEditingTaskId(null);
//   }

//   return (
//     <Box sx={{ backgroundColor: 'lightgray', height: '100vh' }}>
//       <Box className={styles.mainContainer}>
//         <Box className='page_wrapper'>
//           <Box
//             sx={{ display: 'flex', alignItems: 'flex-start', paddingTop: '30px', justifyContent: 'space-around' }}>
//             <h1>Task List</h1>
//             <Button variant="contained"
//               sx={{ backgroundColor: '#713fff', marginTop: 3, textTransform: 'none' }}
//               onClick={() => setOpen(true)}
//             >
//               <AddIcon />Add Task</Button>
//           </Box>
//           <ul>
//             {tasks.map((task) => (
//               <li key={task.id} className={styles.list}>
//                 <>
//                   <Box>
//                     <TasksComponent
//                       text={task.text} priority={task.priority} id={task.id}
//                       handleEdit={() => handleEdit(task)} />
//                   </Box>
//                 </>
//               </li>
//             ))}
//           </ul>
//           <Box>
//             <CustomModal open={open} handleClose={handleClose} editingTaskId={editingTaskId} />
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   )
// }
// export default TaskList;
