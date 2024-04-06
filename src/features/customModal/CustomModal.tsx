import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Box, TextField, Button, InputLabel } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import styles from './CustomModal.module.css';
import { addTask } from '../taskList/taskListSlice';
import { useAppDispatch } from '../../app/hooks';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 12
};

const CustomModal = (props: any) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const [prioritySelected, setPrioritySelected] = useState('low');
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
    console.log(dispatch(addTask({ text, priority: prioritySelected })));
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
        <Box sx={style}>
          <Box sx={{ padding: '20px 40px' }}>
            <form>
              <Box sx={{ display: 'flex', justifyContent: "space-between", marginBottom: '30px' }}>
                <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight: 'bold', fontSize: 22 }}>
                  Add Task
                </Typography>
                <ClearIcon onClick={props.handleClose} />
              </Box>
              <Box>
                <InputLabel sx={{ fontWeight: 700, fontSize: 14, color: '#7d8592', marginBottom: 2 }}>Task</InputLabel>
                <TextField
                  required
                  placeholder='Type your task here....'
                  sx={{ borderRadius: 10, width: '100%', marginBottom: 2 }}
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
                <Button
                  disabled={isTextInputEmpty} onClick={(e) => handleSubmit(e)}>Add</Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
