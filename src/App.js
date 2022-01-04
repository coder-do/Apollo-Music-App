import Header from './components/Header';
import AddSong from './components/AddSong';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import { Grid, CssBaseline, useMediaQuery } from '@material-ui/core';
import { createContext, useContext, useReducer } from 'react';
import { songReducer } from './reducer';

export const SongContext = createContext({
    song: {
        id: "26099b64-2d2d-4591-a157-b0060f052f3b",
        title: "✵Сижу я на травке✵",
        artist: "Blatnoy Udar",
        image: "http://img.youtube.com/vi/O8vICMWyP_Q/0.jpg",
        url: "https://www.youtube.com/watch?v=O8vICMWyP_Q&t=198s",
        duration: 455,
        created_at: "2022-01-04T12:24:33.183768+00:00"
    },
    isPlaying: false
})

function App() {
    const mediumScreen = useMediaQuery(theme => theme.breakpoints.up('md'));
    const songState = useContext(SongContext);
    const [state, dispatch] = useReducer(songReducer, songState)

    return (
        <SongContext.Provider value={{ state, dispatch }}>
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
        </SongContext.Provider>
    );
}

export default App;
