import Header from './components/Header';
import AddSong from './components/AddSong';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import { Grid, CssBaseline, useMediaQuery } from '@material-ui/core';
import { createContext, useContext, useReducer } from 'react';
import { songReducer } from './reducer';

export const SongContext = createContext({
    song: {
        id: "7c8e4045-9e4e-4d64-852f-9d4f6ef0f397",
        title: "Making All Things New",
        artist: "dougwaterman",
        image: "https://i1.sndcdn.com/artworks-000046345510-6qi96p-t500x500.jpg",
        url: "https://soundcloud.com/user-961145082/sets/as-beautiful-as-it-sounds",
        duration: 159.7,
        created_at: "2022-01-04T11:41:51.879222+00:00"
    },
    isPlaying: true
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
