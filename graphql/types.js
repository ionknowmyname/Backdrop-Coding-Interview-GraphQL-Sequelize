const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
} = require("graphql");

const UserType = new GraphQLObjectType({
    name: "User",
    description: "User type",
    fields: () => ({
        id: { type: GraphQLID },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        middle_name: { type: GraphQLString },
        account_number: { type: GraphQLString },
        bank_code: { type: GraphQLString },
        is_verified: { type: GraphQLBoolean },
    }),
});

module.exports = { UserType };
