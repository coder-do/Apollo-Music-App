import { Avatar, IconButton, Typography, makeStyles, useMediaQuery } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';

const QueuedSongList = () => {
    const mediumScreen = useMediaQuery(theme => theme.breakpoints.up('md'));

    const song = {
        title: 'Сижу я на травке',
        artist: 'Blatnoy Udar',
        thumbnail: 'http://i3.ytimg.com/vi/O8vICMWyP_Q/hqdefault.jpg'
    }

    return mediumScreen && (
        <div style={{ margin: '10px 0' }}>
            <Typography color='textSecondary' variant='button'>
                QUEUE (5)
            </Typography>
            {Array.from({ length: 5 }, () => song).map((song, i) => (
                <QueuedSong key={i} song={song} />
            ))}
        </div>
    )
};

const useStyle = makeStyles(() => ({
    avatar: {
        width: 44,
        height: 44
    },
    text: {
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    container: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateColumns: '50px auto 100px',
        gridGap: 12,
        alignItems: 'center',
        marginTop: 10
    },
    songInfoContainer: {
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    }
}))

const QueuedSong = ({ song }) => {
    const cls = useStyle();
    const { title, artist, thumbnail } = song;
    return (
        <div className={cls.container}>
            <Avatar
                src={thumbnail}
                className={cls.avatar}
                alt='song avatar'
            />
            <div className={cls.songInfoContainer}>
                <Typography
                    variant='subtitle2'
                    className={cls.text}
                >
                    {title}
                </Typography>
                <Typography
                    variant='body2'
                    color='textSecondary'
                    className={cls.text}
                >
                    {artist}
                </Typography>
            </div>
            <IconButton>
                <Delete color='error' />
            </IconButton>
        </div>
    )
}

export default QueuedSongList;