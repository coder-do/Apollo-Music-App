import Header from './components/Header';
import AddSong from './components/AddSong';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import { Grid, CssBaseline, useMediaQuery } from '@material-ui/core';

function App() {
    const mediumScreen = useMediaQuery(theme => theme.breakpoints.up('md'));

    return (
        <>
            <Header />
            <CssBaseline />
            <Grid container
                style={{ paddingTop: '80px' }}>
                <Grid item xs={12} md={7}>
                    <AddSong />
                    <SongList />
                </Grid>
                <Grid item xs={12} md={5} style={
                    mediumScreen ? {
                        position: 'fixed',
                        width: '100%',
                        right: -25,
                        top: 95
                    } : {
                        position: 'fixed',
                        width: '100vw',
                        bottom: 0
                    }
                }>
                    <SongPlayer />
                </Grid>
            </Grid>
        </>
    );
}

export default App;
