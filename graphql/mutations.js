const { GraphQLString } = require("graphql");
const { UserType } = require("./types");

const Utility = require("../utils");

const verifyUser = {
    type: UserType,
    description: "Verifies user if account name matches",
    args: {
        user_account_number: { type: GraphQLString },
        user_bank_code: { type: GraphQLString },
        user_account_name: { type: GraphQLString },
    },
    async resolve(parent, args) {
        const account_number = args.user_account_number;
        const bank_code = args.user_bank_code;
        const account_name = args.user_account_name;

        let foundUser = await Utility.findUserByAccountNumber(account_number);

        if (foundUser.id !== null) {
            // found valid user
            const responseData = Utility.callPayStack(
                account_number,
                bank_code
            );

            if (responseData.status === true) {
                //  valid user gotten for bankcode & account number

                const { first_name, last_name, middle_name } = foundUser;
                const dbName = "{0} {1} {2}".format(
                    last_name,
                    first_name,
                    middle_name
                );

                // check that the names are same/similar
                const isMatch = Utility.compareName(
                    dbName,
                    responseData.data.account_name
                );

                if (isMatch) {
                    // names match, update user to verifed
                    foundUser = Utility.updateUserStatus(account_number, true);
                }
            }
        } else {
            throw new Error("No user with account number found");
        }

        return foundUser;
    },
};

module.exports = { verifyUser };
