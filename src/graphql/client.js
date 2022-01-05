import ApolloClient from "apollo-client";
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from "apollo-cache-inmemory";
import { gql } from "apollo-boost";
import { GET_QUEUED_SONGS } from './queries';

const client = new ApolloClient({
    link: new WebSocketLink({
        uri: 'wss://apollo-misuc-store.herokuapp.com/v1/graphql',
        options: {
            reconnect: true
        }
    }),
    cache: new InMemoryCache(),
    typeDefs: gql`
        type Song {
            id: uuid!,
            title: String!,
            artist: String!,
            image: String!,
            duration: Float!,
            url: String!
        }

        input SongInput {
            id: uuid!,
            title: String!,
            artist: String!,
            image: String!,
            duration: Float!,
            url: String!
        }

        type Query {
            queue: [Song]!
        }

        type Mutation {
            addOrRemove(input: SongInput!): [Song]!
        }
    `,
    resolvers: {
        Mutation: {
            addOrRemove: (_, { input }, { cache }) => {
                const queryRes = cache.readQuery({
                    query: GET_QUEUED_SONGS
                });
                if (queryRes) {
                    const { queue } = queryRes;
                    const isInQueue = queue.some(elem => elem.id === input.id);
                    const newQueue = isInQueue ?
                        queue.filter(song => song.id !== input.id) :
                        [...queue, input]
                    cache.writeQuery({
                        query: GET_QUEUED_SONGS,
                        data: { queue: newQueue }
                    });
                    return newQueue;
                } else {
                    return []
                }
            }
        }
    }
});

const isInBrowser = Boolean(localStorage.getItem('queue'));

const data = {
    queue: isInBrowser ? JSON.parse(localStorage.getItem('queue')) : []
};

client.writeData({ data })

export default client;