import { useMutation } from '@apollo/react-hooks';
import { Avatar, IconButton, Typography, makeStyles, useMediaQuery, Tooltip } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';
import { ADD_REMOVE_SONG } from '../graphql/mutations';

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

const QueuedSongList = ({ queue }) => {
    const mediumScreen = useMediaQuery(theme => theme.breakpoints.up('md'));

    return mediumScreen && (
        <div style={{ margin: '10px 0' }}>
            <Typography color='textSecondary' variant='button'>
                QUEUE ({queue.queue.length})
            </Typography>
            {queue.queue.map((song, i) => (
                <QueuedSong key={i} song={song} />
            ))}
        </div>
    )
};


const QueuedSong = ({ song }) => {
    const cls = useStyle();
    const { title, artist, image } = song;
    const [addOrRemove] = useMutation(ADD_REMOVE_SONG, {
        onCompleted: data => {
            localStorage.setItem('queue', JSON.stringify(data.addOrRemove))
        }
    });

    const handleAddRemoveToQueue = () => {
        addOrRemove({
            variables: { input: { ...song, __typename: 'Song' } }
        })
    }

    return (
        <div className={cls.container}>
            <Avatar
                src={image}
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
            <Tooltip title='Remove from queue' arrow>
                <div style={{ width: '65px', margin: '0 auto' }}>
                    <IconButton onClick={handleAddRemoveToQueue} >
                        <Delete color='error' />
                    </IconButton>
                </div>
            </Tooltip>
        </div>
    )
}

export default QueuedSongList;