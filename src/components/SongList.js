import React, { useContext, useEffect, useState } from 'react';
import { GET_SONGS } from '../graphql/subscriptions';
import { SongContext } from '../App';
import { ADD_REMOVE_SONG } from '../graphql/mutations';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import { Pause, PlayArrow, Save } from '@material-ui/icons';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    IconButton,
    Typography,
    makeStyles,
    Tooltip
} from '@material-ui/core';

const SongList = () => {
    const { data, loading } = useSubscription(GET_SONGS);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '50px'
            }}>
                <CircularProgress />
            </div>
        )
    }
    return (
        <div>
            {data.songs.map(song => (
                <Song key={song.id} song={song} />
            ))}
        </div>
    )
}

const useStyle = makeStyles(theme => ({
    container: {
        margin: theme.spacing(5)
    },
    songInfoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    songInfo: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    thumbnail: {
        objectFit: 'cover',
        width: 140,
        height: 140
    }
}))

const Song = ({ song }) => {
    const { state, dispatch } = useContext(SongContext);
    const [songPlaying, setSongPlaying] = useState(false);
    const [addOrRemove] = useMutation(ADD_REMOVE_SONG, {
        onCompleted: data => {
            localStorage.setItem('queue', JSON.stringify(data.addOrRemove))
        }
    });
    const cls = useStyle();
    const { id, title, artist, image } = song;

    useEffect(() => {
        const plays = state.isPlaying && id === state.song.id;
        setSongPlaying(plays);
    }, [id, state.song.id, state.isPlaying]);

    const handlePlay = () => {
        dispatch({ type: 'SET_SONG', payload: { song } })
        dispatch(!state.isPlaying ? { type: 'TOGGLE_PAUSE' } : { type: 'TOGGLE_PLAY' })
    };

    const handleAddRemoveToQueue = () => {
        addOrRemove({
            variables: { input: { ...song, __typename: 'Song' } }
        });
    };

    return (
        <Card className={cls.container}>
            <div className={cls.songInfoContainer}>
                <CardMedia className={cls.thumbnail} image={image} />
                <div className={cls.songInfo}>
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                            {title}
                        </Typography>
                        <Typography variant='body1' component='p' color='textSecondary'>
                            {artist}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Tooltip title='Play' placement='top' arrow>
                            <IconButton
                                size='small'
                                color='primary'
                                onClick={handlePlay}
                            >
                                {
                                    songPlaying ?
                                        <Pause className={cls.playIcon} />
                                        :
                                        <PlayArrow className={cls.playIcon} />
                                }
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Add to queue' placement='top' arrow>
                            <IconButton
                                size='small'
                                color='secondary'
                                onClick={handleAddRemoveToQueue}
                            >
                                <Save />
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </div>
            </div>
        </Card>
    )
}

export default SongList;