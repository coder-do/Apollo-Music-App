import React, { useState } from 'react';
import { PlayArrow, Save } from '@material-ui/icons';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    IconButton,
    Typography,
    makeStyles
} from '@material-ui/core';

const SongList = () => {
    const [loading, setLoading] = useState(false);

    const song = {
        title: 'Сижу я на травке',
        artist: 'Blatnoy Udar',
        thumbnail: 'http://i3.ytimg.com/vi/O8vICMWyP_Q/hqdefault.jpg'
    }

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
        <div>{Array.from({ length: 10 }, () => song).map((elem, ind) => (
            <Song key={ind} song={elem} />
        ))}</div>
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
    const cls = useStyle();
    const { title, artist, thumbnail } = song;
    return (
        <Card className={cls.container}>
            <div className={cls.songInfoContainer}>
                <CardMedia className={cls.thumbnail} image={thumbnail} />
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
                        <IconButton size='small' color='primary'>
                            <PlayArrow />
                        </IconButton>
                        <IconButton size='small' color='secondary'>
                            <Save />
                        </IconButton>
                    </CardActions>
                </div>
            </div>
        </Card>
    )
}

export default SongList;