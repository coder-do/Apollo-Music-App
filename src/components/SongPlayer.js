import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@material-ui/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import QueuedSongList from './QueuedSongList';
import { SongContext } from '../App';
import { GET_QUEUED_SONGS } from '../graphql/queries';
import {
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Slider,
    Typography,
    makeStyles,
    useMediaQuery
} from '@material-ui/core';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import ReactPlayer from 'react-player';
import { GET_SONGS } from '../graphql/subscriptions';

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
    const playerRef = useRef();
    const [played, setPlayed] = useState(0);
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [positionInQueue, setPositionInQueue] = useState(0);
    const { data } = useQuery(GET_QUEUED_SONGS);
    const { state, dispatch } = useContext(SongContext);
    const mediaScreen = useMediaQuery(theme => theme.breakpoints.up('md'));

    useEffect(() => {
        const index = data.queue.findIndex(song => song.id === state.song.id);
        setPositionInQueue(index);
    }, [data.queue, state.song.id])

    useEffect(() => {
        const nextSong = data.queue[positionInQueue + 1];
        if (played >= 0.99 && nextSong) {
            setPlayed(0);
            dispatch({ type: 'SET_SONG', payload: { song: nextSong } })
        }
    }, [data.queue, played, dispatch, positionInQueue])

    const handlePlay = () => dispatch(state.isPlaying ? { type: 'TOGGLE_PAUSE' } : { type: 'TOGGLE_PLAY' });

    const handleSliderChange = (e, newValue) => setPlayed(newValue);

    const handleSeeking = () => setSeeking(true);

    const handleSeekingUp = () => {
        setSeeking(false);
        playerRef.current.seekTo(played);
    };

    const formatDuration = (dur) => {
        return new Date(dur * 1000).toISOString().substr(11, 8)
    };

    const handlePlayNextSong = () => {
        const nextSong = data.queue[positionInQueue + 1];
        if (nextSong) {
            setPlayed(0);
            dispatch({ type: 'SET_SONG', payload: { song: nextSong } })
        }
    }

    const handlePlayPrevSong = () => {
        const prevSong = data.queue[positionInQueue - 1];
        if (prevSong) {
            setPlayed(0);
            dispatch({ type: 'SET_SONG', payload: { song: prevSong } })
        }
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
                        <Typography variant='h6' component='h3'>
                            {state.song.title}
                        </Typography>
                        <Typography variant='subtitle1' component='p' color='textSecondary'>
                            {state.song.artist}
                        </Typography>
                    </CardContent>
                    <div className={cls.controls}>
                        <IconButton onClick={handlePlayPrevSong}>
                            <SkipPrevious />
                        </IconButton>
                        <IconButton onClick={handlePlay}>
                            {
                                state.isPlaying ?
                                    <Pause className={cls.playIcon} />
                                    :
                                    <PlayArrow className={cls.playIcon} />
                            }
                        </IconButton>
                        <IconButton onClick={handlePlayNextSong}>
                            <SkipNext />
                        </IconButton>
                        <Typography
                            component='p'
                            variant='subtitle1'
                            color='textSecondary'
                            style={{ userSelect: 'none' }}
                        >
                            {formatDuration(playedSeconds)}
                        </Typography>
                    </div>
                    <Slider
                        type='range'
                        value={played}
                        onChange={handleSliderChange}
                        onMouseDown={handleSeeking}
                        onMouseUp={handleSeekingUp}
                        min={0}
                        max={1}
                        step={0.01}
                    />
                </div>
                <ReactPlayer
                    hidden
                    ref={playerRef}
                    url={state.song.url}
                    playing={state.isPlaying}
                    onProgress={({ played, playedSeconds }) => {
                        if (!seeking) {
                            setPlayed(played);
                            setPlayedSeconds(playedSeconds)
                        }
                    }}
                />
                <CardMedia
                    className={cls.thumbnail}
                    image={state.song.image}
                />
            </Card>
            <QueuedSongList queue={data} />
        </>
    )
}

export default SongPlayer;