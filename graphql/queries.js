const { GraphQLString } = require("graphql");

const Utility = require("../utils");

const getAccountNameByAccountNumber = {
    type: GraphQLString,
    description:
        "Return correct user account name using account number & bank code",
    args: {
        user_account_number: { type: GraphQLString },
        user_bank_code: { type: GraphQLString },
    },
    async resolve(_, args) {
        const account_number = args.user_account_number;
        const bank_code = args.user_bank_code;
        const finalName = "";

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
                finalName = Utility.compareName2(
                    dbName,
                    responseData.data.account_name
                );

                foundUser = Utility.updateUserStatus(account_number, true);
            }
        } else {
            throw new Error("No user with account number found");
        }

        return finalName;
    },
};

module.exports = { getAccountNameByAccountNumber };
