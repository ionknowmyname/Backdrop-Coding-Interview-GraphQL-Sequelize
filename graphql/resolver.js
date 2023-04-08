const Utility = require("../utils");

const Resolver = {
    validateUser: async (_, args) => {
        const account_number = args.user_account_number;
        const bank_code = args.user_bank_code;
        const account_name = args.user_account_name;

        let foundUser = await Utility.findUserByAccountNumber(account_number);
        // console.log("foundUser[0].User --> ", foundUser[0].dataValues);
        console.log("foundUser --> ", foundUser);

        // foundUser = foundUser[0].dataValues;

        if (foundUser.id !== null) {
            // found valid user
            const responseData = await Utility.callPayStack(
                account_number,
                bank_code
            );
            console.log("responseData --> ", responseData);

            if (responseData.status === true) {
                //  valid user gotten for bankcode & account number

                const { first_name, last_name, middle_name } = foundUser;
                const dbName = `${last_name} ${first_name} ${middle_name}`;

                // check that the names are same/similar
                const isMatch = await Utility.compareName(
                    dbName,
                    responseData.data.account_name
                );
                console.log("isMatch --> ", isMatch);

                if (isMatch) {
                    // names match, update user to verified
                    foundUser = await Utility.updateUserStatus(
                        account_number,
                        true
                    );
                }
                // else do nothing
            }
        } else {
            throw new Error("No user with account number found");
        }

        console.log("foundUser to return --> ", foundUser);
        return foundUser;
    },
    getAccountName: async (_, args) => {
        const account_number = args.user_account_number;
        const bank_code = args.user_bank_code;
        let finalName = "";

        let foundUser = await Utility.findUserByAccountNumber(account_number);

        if (foundUser.id !== null) {
            // found valid user
            const responseData = await Utility.callPayStack(
                account_number,
                bank_code
            );

            if (responseData.status === true) {
                //  valid user gotten for bankcode & account number

                const { first_name, last_name, middle_name } = foundUser;
                const dbName = `${last_name} ${first_name} ${middle_name}`;

                // check that the names are same/similar
                finalName = await Utility.compareName2(
                    dbName,
                    responseData.data.account_name
                );

                foundUser = await Utility.updateUserStatus(
                    account_number,
                    true
                );
            }
        } else {
            throw new Error("No user with account number found");
        }

        return finalName;
    },
};

module.exports = Resolver;
