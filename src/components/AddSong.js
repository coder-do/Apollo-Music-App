import React, { useEffect, useState } from 'react';
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
import ReactPlayer from "react-player";
import { useMutation } from '@apollo/react-hooks';
import { ADD_SONG } from '../graphql/mutations';


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
}));

const INITIAL_SONG = {
    title: '',
    artist: '',
    image: '',
    duration: 0
}

const AddSong = () => {
    const [open, setOpen] = useState(false);
    const [playable, setPlayable] = useState(false);
    const [addSong, { error }] = useMutation(ADD_SONG);
    const [url, setUrl] = useState('');
    const [song, setSong] = useState(INITIAL_SONG);
    const cls = useStyles();

    const handleOpen = () => setOpen(false);

    const handleAdd = async () => {
        const { title, artist, image, duration, url } = song;
        try {
            await addSong({
                variables: {
                    title: title.length > 0 ? title : null,
                    artist: artist.length > 0 ? artist : null,
                    image: image.length > 0 ? image : null,
                    duration: duration > 0 ? duration : null,
                    url: url.length > 0 ? url : null
                }
            });
            handleOpen();
            setSong(INITIAL_SONG);
            setUrl('')
        } catch (err) {
            console.log(`error while adding song ${err}`);
        }
    }

    const handleError = (field) => {
        return error?.graphQLErrors[0]?.extensions?.path.includes(field);
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setSong(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleEdit = async ({ player }) => {
        const nestedPlayer = player.player.player;
        let songData;
        if (nestedPlayer.getVideoData) {
            songData = getInfo(nestedPlayer)
        } else if (nestedPlayer.getCurrentSound) {
            songData = await getSoundCloundInfo(nestedPlayer);
        }
        setSong({ ...songData, url })
    }

    const getSoundCloundInfo = (sound) => {
        return new Promise(resolve => {
            sound.getCurrentSound(data => {
                if (data) {
                    resolve({
                        duration: Number(data.duration / 1000),
                        title: data.title,
                        artist: data.user.username,
                        image: data.artwork_url.replace('-large', '-t500x500')
                    })
                }
            })
        })
    }

    const getInfo = (player) => {
        const dur = player.getDuration();
        const { title, video_id, author } = player.getVideoData();
        const image = `http://img.youtube.com/vi/${video_id}/0.jpg`;
        return {
            duration: dur,
            title,
            artist: author,
            image
        }
    }

    useEffect(() => {
        const canPLay = ReactPlayer.canPlay(url.toString());
        setPlayable(canPLay);
    }, [url])

    const { title, image, artist } = song;

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
                        src={image.toString()}
                        className={cls.thumbnail}
                        alt='edit song image'
                    />
                    <TextField
                        margin='dense'
                        name='title'
                        value={title}
                        onChange={handleChange}
                        label='Title'
                        error={handleError('title')}
                        helperText={handleError('title') && 'Fill out field'}
                        fullWidth
                    />
                    <TextField
                        margin='dense'
                        name='artist'
                        value={artist}
                        onChange={handleChange}
                        error={handleError('artist')}
                        helperText={handleError('artist') && 'Fill out field'}
                        label='Artist'
                        fullWidth
                    />
                    <TextField
                        margin='dense'
                        value={image.toString()}
                        onChange={handleChange}
                        name='thumbnail'
                        label='Thumbnail'
                        error={handleError('thumbnail')}
                        helperText={handleError('thumbnail') && 'Fill out field'}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        color='secondary'
                        onClick={handleOpen}
                    >
                        Cancel
                    </Button>
                    <Button
                        color='primary'
                        variant='outlined'
                        className={cls.addSongButton}
                        onClick={handleAdd}
                    >
                        Add song
                    </Button>
                </DialogActions>
            </Dialog>
            <TextField
                placeholder='Add Youtube or Soundcloud Url'
                onChange={(e) => setUrl(e.target.value)}
                value={url}
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
                disabled={!playable}
                variant='contained'
                color='primary'
                onClick={() => setOpen(true)}
                endIcon={<AddBoxOutlined style={{ margin: '0 0px 2px -3px' }} />}
            >
                Add
            </Button>
            <ReactPlayer url={url} hidden onReady={handleEdit} />
        </div>
    )
}

export default AddSong;