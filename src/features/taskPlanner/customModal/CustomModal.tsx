import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Box, TextField, Button, InputLabel } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import styles from './CustomModal.module.css';
import { addTask, editTask } from '../taskList/taskListSlice';
import { useAppDispatch } from '../../../app/hooks';


const CustomModal = (props: any) => {
  const dispatch = useAppDispatch();
  const { open, handleClose, selectedTask } = props;
  console.log('selected-task', selectedTask)
  const [text, setText] = React.useState(selectedTask ? selectedTask.text : '');
  const [prioritySelected, setPrioritySelected] = React.useState(selectedTask ? selectedTask.priority : '');
  const [isTextInputEmpty, setIsTextInputEmpty] = useState(true);

  const selectPriority = (priority: string) => {
    setPrioritySelected(priority);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
    setIsTextInputEmpty(newText.trim() === '');
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('text and priority', text, prioritySelected);

    if (props.isEditing) {
      dispatch(editTask({ id: props.task.id, text: props.task.text, priority: props.task.priority }))
    }
    else {
      dispatch(addTask({ text, priority: prioritySelected }));
    }

    localStorage.setItem('task', JSON.stringify({ text, priority: prioritySelected }));
    setText('');
    props.handleClose();
    setPrioritySelected('low')
  };

  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.mainContainer}>
          <Box className={styles.formWrapper}>
            <form>
              <Box className={styles.titleWrapper}>
                {props.isEditing ?
                  <Typography id="modal-modal-title" variant="h5" component="h2" className={styles.title}>
                    Edit Task
                  </Typography>
                  :
                  <Typography id="modal-modal-title" variant="h5" component="h2" className={styles.title}>
                    Add Task
                  </Typography>
                }
                <ClearIcon onClick={props.handleClose} />
              </Box>
              <Box>
                <InputLabel className={styles.taskLabel}>Task</InputLabel>
                <TextField
                  required
                  placeholder='Type your task here....'
                  className={styles.textField}
                  value={text}
                  onChange={handleTextChange}
                />
              </Box>
              <Box>
                <span className={styles.priorityHeading}
                  style={{ fontWeight: 700, fontSize: 14, color: '#7d8592', marginBottom: 2 }}>Priority</span>
                <ul className={styles.priorityButtons}>
                  <li onClick={() => selectPriority('high')}
                    className={prioritySelected === 'high' ? styles.highSelected : styles.high}>High</li>
                  <li onClick={() => selectPriority('medium')}
                    className={prioritySelected === 'medium' ? styles.mediumSelected : styles.medium}>Medium</li>
                  <li onClick={() => selectPriority('low')}
                    className={prioritySelected === 'low' ? styles.lowSelected : styles.low}>Low</li>
                </ul>
              </Box>
              <Box>
                {props.isEditing ?
                  <Button onClick={props.handleEdit}>
                    Edit
                  </Button>
                  :
                  <Button
                    disabled={isTextInputEmpty} onClick={(e) => handleSubmit(e)}>
                    Add
                  </Button>
                }
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
