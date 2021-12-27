import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { HeadsetTwoTone } from '@material-ui/icons';

const useStyles = makeStyles({
    title: {
        marginLeft: '8px',
        cursor: 'pointer',
        userSelect: 'none'
    }
});

const Header = () => {
    const classes = useStyles();
    return (
        <>
            <AppBar position='fixed' color='primary'>
                <Toolbar>
                    <HeadsetTwoTone />
                    <Typography className={classes.title} variant='h6' component='h1'>
                        Apollo Music Share
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header;