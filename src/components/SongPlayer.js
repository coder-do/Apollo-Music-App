import { PlayArrow, SkipNext, SkipPrevious } from '@material-ui/icons';
import React from 'react';
import QueuedSongList from './QueuedSongList';
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
    const mediaScreen = useMediaQuery(theme => theme.breakpoints.up('md'));
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
                            Title
                        </Typography>
                        <Typography variant='subtitle1' component='p' color='textSecondary'>
                            Artist
                        </Typography>
                    </CardContent>
                    <div className={cls.controls}>
                        <IconButton >
                            <SkipPrevious />
                        </IconButton>
                        <IconButton>
                            <PlayArrow className={cls.playIcon} />
                        </IconButton>
                        <IconButton>
                            <SkipNext />
                        </IconButton>
                        <Typography variant='subtitle1' component='p' color='textSecondary'>
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
                    image='http://i3.ytimg.com/vi/O8vICMWyP_Q/hqdefault.jpg'
                />
            </Card>
            <QueuedSongList />
        </>
    )
}

export default SongPlayer;