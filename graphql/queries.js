const { GraphQLString } = require("graphql");

const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const Utility = require("../utils");

const getAccountNameByAccountNumber = {
    type: GraphQLString,
    description: "Return user account name using account number & bank code",
    args: {
        account_number: { type: GraphQLString },
        bank_code: { type: GraphQLString },
    },
    async resolve(_, args) {
        User.findOne({ title: args.title });
    },
};

module.exports = { getAccountNameByAccountNumber };
