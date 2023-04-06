const { GraphQLSchema, GraphQLObjectType } = require("graphql");

// Import queries
const { getAccountNameByAccountNumber } = require("./queries");

// Import mutations
const { verifyUser } = require("./mutations");

// Define QueryType
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Queries",
    fields: { getAccountNameByAccountNumber },
});

// Define MutationType
const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Mutations",
    fields: { verifyUser },
});

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
});
