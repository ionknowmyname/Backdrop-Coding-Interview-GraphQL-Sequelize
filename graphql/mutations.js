const { GraphQLString } = require("graphql");
const { UserType } = require("./types");
const axios = require("axios");

const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
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

        let condition = {
            account_number: {
                [Op.eq]: `${account_number}`,
            },
        };

        const user = await User.findAll({ where: condition })
            .then(async (data) => {
                if (data) {
                    // call paystack, if account name matches call User.update else return user

                    const endpoint = `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`;

                    const config = {
                        headers: {
                            Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
                            "Content-Type": "application/json",
                        },
                    };

                    const response = await axios.get(endpoint, config);

                    if (response.data.status === true) {
                        const dbName =
                            data.last_name +
                            " " +
                            data.first_name +
                            " " +
                            data.middle_name;
                        const isMatch = Utility.compareName(
                            dbName,
                            response.data.data.account_name
                        );

                        if (isMatch) {
                            // update user to verified

                            User.update(
                                { is_verified: true },
                                { where: { account_number } }
                            )
                                .then((num) => {
                                    if (num == 1) {
                                        // updated successfully
                                        res.status(200).send({
                                            msg: "Food was updated successfully.",
                                            updatedData: req.body,
                                        });
                                    } else {
                                        res.status(400).send({
                                            msg: `Cannot update Food with id=${id}.`,
                                        });
                                    }
                                })
                                .catch((err) => console.error(err));
                        }
                    } else {
                        // don't verify the user, just return the user as is, don't throw error either
                        return data;
                    }
                }
            })
            .catch((err) => console.log(err));

        return user;
    },
};

module.exports = { verifyUser };
