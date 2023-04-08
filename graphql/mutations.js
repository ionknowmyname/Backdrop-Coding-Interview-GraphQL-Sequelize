const { GraphQLString } = require("graphql");
const { UserType } = require("./types");

const Utility = require("../utils");

const { validateUser } = require("./resolver");

const verifyUser = {
    type: UserType,
    description: "Verifies user if account name matches",
    args: {
        user_account_number: { type: GraphQLString },
        user_bank_code: { type: GraphQLString },
        user_account_name: { type: GraphQLString },
    },
    resolve: validateUser,
};

module.exports = { verifyUser };
