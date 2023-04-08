const { GraphQLString } = require("graphql");

const Utility = require("../utils");

const { getAccountName } = require("./resolver");

const getAccountNameByAccountNumber = {
    type: GraphQLString,
    description:
        "Return correct user account name using account number & bank code",
    args: {
        user_account_number: { type: GraphQLString },
        user_bank_code: { type: GraphQLString },
    },
    resolve: getAccountName,
};

module.exports = { getAccountNameByAccountNumber };
