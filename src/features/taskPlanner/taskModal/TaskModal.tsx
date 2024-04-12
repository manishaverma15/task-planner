import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Box, TextField, Button, InputLabel } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import styles from './TaskModal.module.css';
import { Task, addTask, editTask } from '../taskList/taskListSlice';
import { useAppDispatch } from '../../../app/hooks';

type Props = {
  open: boolean;
  handleClose: () => void;
  selectedTask: Task;
  isEditing: boolean
}

const TaskModal = (props: Props) => {
  const dispatch = useAppDispatch();
  const { open, handleClose, selectedTask, isEditing } = props;

  const [text, setText] = React.useState(selectedTask ? selectedTask.text : '');
  const [prioritySelected, setPrioritySelected] = React.useState(selectedTask ? selectedTask.priority : 'low');
  const [isTextInputEmpty, setIsTextInputEmpty] = useState(true);

  React.useEffect(() => {
    if (selectedTask) {
      setText(selectedTask.text);
      setPrioritySelected(selectedTask.priority);
    }
  }, [selectedTask]);

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

    if (isEditing) {
      dispatch(editTask({ id: selectedTask.id, text, priority: prioritySelected }))
    }
    else {
      dispatch(addTask({ text, priority: prioritySelected }));
    }

    localStorage.setItem('task', JSON.stringify({ text, priority: prioritySelected }));
    setText('');
    handleClose();
    setPrioritySelected('low')
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className={styles.mainContainer}>
          <Box className={styles.formWrapper}>
            <form>
              <Box className={styles.titleWrapper}>
                {isEditing ?
                  <Typography id='modal-modal-title' variant='h5' component='h2' className={styles.title}>
                    Edit Task
                  </Typography>
                  :
                  <Typography id='modal-modal-title' variant='h5' component='h2' className={styles.title}>
                    Add Task
                  </Typography>
                }
                <ClearIcon onClick={handleClose} />
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
                <span className={styles.priorityList}>Priority</span>
                <ul className={styles.priorityButtons}>
                  <li onClick={() => selectPriority('high')}
                    className={prioritySelected === 'high' ? styles.highSelected : styles.high}>High</li>
                  <li onClick={() => selectPriority('medium')}
                    className={prioritySelected === 'medium' ? styles.mediumSelected : styles.medium}>Medium</li>
                  <li onClick={() => selectPriority('low')}
                    className={prioritySelected === 'low' ? styles.lowSelected : styles.low}>Low</li>
                </ul>
              </Box>
              <Box className={styles.actionButtons}>
                {isEditing ?
                  <Button
                    onClick={(e) => handleSubmit(e)}
                    className={styles.actionButton}>
                    Edit
                  </Button>
                  :
                  <Button
                    disabled={isTextInputEmpty}
                    onClick={(e) => handleSubmit(e)}
                    className={styles.actionButton}>
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

export default TaskModal;
