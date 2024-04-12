import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Box, Typography, Button } from '@mui/material';
import styles from './DeleteTask.module.css';

type Props = {
  open: boolean;
  handleDeleteTask: () => void;
  handleCancel: () => void;
}

const DeleteTask = (props: Props) => {
  const { open, handleDeleteTask, handleCancel } = props;

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
              <Typography className={styles.delete}>Are you sure you want to delete this task?</Typography>
            </form>
            <Box className={styles.actionButtons}>
              <Button variant='contained'
                className={styles.deleteButton}
                onClick={handleDeleteTask}>Delete</Button>
              <Button variant='outlined'
                className={styles.cancelButton}
                onClick={handleCancel}>Cancel</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
export default DeleteTask;