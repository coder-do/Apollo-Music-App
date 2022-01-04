import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@material-ui/icons';
import React, { useContext } from 'react';
import QueuedSongList from './QueuedSongList';
import { SongContext } from '../App';
import {
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Slider,
    Typography,
    makeStyles,
    useMediaQuery,
    Tooltip
} from '@material-ui/core';

const useStyle = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 15px'
    },
    content: {
        flex: '0 1 auto'
    },
    thumbnail: {
        width: 150
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    playIcon: {
        height: 38,
        width: 38
    }
}))

const SongPlayer = () => {
    const cls = useStyle();
    const { state, dispatch } = useContext(SongContext);
    const mediaScreen = useMediaQuery(theme => theme.breakpoints.up('md'));

    const handlePlay = () => {
        dispatch(state.isPlaying ? { type: 'TOGGLE_PAUSE' } : { type: 'TOGGLE_PLAY' })
    }

    return (
        <>
            <Card
                variant='outlined'
                className={cls.container}
                style={mediaScreen ? { width: '95%' } : { width: '100%' }}
            >
                <div className={cls.details}>
                    <CardContent>
                        <Typography variant='h5' component='h3'>
                            {state.song.title}
                        </Typography>
                        <Typography variant='subtitle1' component='p' color='textSecondary'>
                            {state.song.artist}
                        </Typography>
                    </CardContent>
                    <div className={cls.controls}>
                        <Tooltip title='Previous' arrow>
                            <IconButton >
                                <SkipPrevious />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Play' arrow>
                            <IconButton onClick={handlePlay}>
                                {
                                    state.isPlaying ?
                                        <Pause className={cls.playIcon} />
                                        :
                                        <PlayArrow className={cls.playIcon} />
                                }
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Next' arrow>
                            <IconButton>
                                <SkipNext />
                            </IconButton>
                        </Tooltip>
                        <Typography
                            component='p'
                            variant='subtitle1'
                            color='textSecondary'
                            style={{ userSelect: 'none' }}
                        >
                            00:03:45
                        </Typography>
                    </div>
                    <Slider
                        type='range'
                        min={0}
                        max={1}
                        step={0.01}
                    />
                </div>
                <CardMedia
                    className={cls.thumbnail}
                    image={state.song.image}
                />
            </Card>
            <QueuedSongList />
        </>
    )
}

export default SongPlayer;