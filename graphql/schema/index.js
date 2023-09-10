const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Bookings {
        _id: ID!
        event: Event!
        user: User!
        createdAt: String!
        updatedAt: String!
    }
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
    }

    type User {
        _id: ID!
        username: String!
        password: String
        createdEvents: [Event!]
    }

    type AuthData {
        userId: String!
        token: String!
        tokenExpiration : Int!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input UserInput {
        username: String!
        password: String!
    }

    type Query {
        events: [Event!]!
        bookings: [Bookings!]
        login(email: String!, password: String!): AuthData!
    }

    type Mutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
        bookEvent(eventId : ID!) : Bookings!
        cancelBooking(bookingId : ID!): Event!
    }
`);

module.exports = schema;