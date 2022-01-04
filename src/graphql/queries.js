import { gql } from "apollo-boost";


export const GET_SONGS = gql`
    query getSongs {
        songs(order_by: {created_at: desc}) {
            id
            title
            artist
            image
            url
            duration
            created_at
        }
    }
`