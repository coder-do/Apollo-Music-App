import React, { useState } from 'react';
import { AddBoxOutlined, Link } from '@material-ui/icons';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    TextField,
    makeStyles
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    urlInput: {
        margin: theme.spacing(1)
    },
    addSongButton: {
        margin: theme.spacing(1)
    },
    dialog: {
        textAlign: 'center'
    },
    thumbnail: {
        width: '90%'
    }
}))

const AddSong = () => {
    const [open, setOpen] = useState(false);
    const cls = useStyles();
    const handleOpen = () => setOpen(false);
    return (
        <div className={cls.container}>
            <Dialog
                open={open}
                onClose={handleOpen}
                className={cls.dialog}
            >
                <DialogTitle>Edit song</DialogTitle>
                <DialogContent>
                    <img
                        src='https://i.pinimg.com/originals/64/62/24/6462243c87f1604b1d9046bac1bfe47f.jpg'
                        className={cls.thumbnail}
                        alt='edit song image'
                    />
                    <TextField
                        margin='dense'
                        name='title'
                        label='Title'
                        fullWidth
                    />
                    <TextField
                        margin='dense'
                        name='artist'
                        label='Artist'
                        fullWidth
                    />
                    <TextField
                        margin='dense'
                        name='thumbnail'
                        label='Thumbnail'
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOpen} color='secondary'>Cancel</Button>
                    <Button className={cls.addSongButton} variant='outlined' color='primary'>Add song</Button>
                </DialogActions>
            </Dialog>
            <TextField
                placeholder='Add Youtube or Soundcloud Url'
                className={cls.urlInput}
                fullWidth
                margin='normal'
                type='url'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <Link />
                        </InputAdornment>
                    )
                }}
            />
            <Button
                variant='contained'
                color='primary'
                onClick={() => setOpen(true)}
                endIcon={<AddBoxOutlined style={{ margin: '0 0px 2px -3px' }} />}
            >
                Add
            </Button>
        </div>
    )
}

export default AddSong;