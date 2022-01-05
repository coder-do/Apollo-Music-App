import { gql } from "apollo-boost";


export const ADD_SONG = gql`
    mutation addSong($title: String!, $artist: String, $image: String!, $duration: Float!, $url: String!) {
        insert_songs(objects: {title: $title, artist: $artist, image: $image, duration: $duration, url: $url}) {
            affected_rows
        }
    }
`;

export const ADD_REMOVE_SONG = gql`
    mutation addOrRemove($input: SongInput!) {
        addOrRemove(input: $input) @client
    }
`