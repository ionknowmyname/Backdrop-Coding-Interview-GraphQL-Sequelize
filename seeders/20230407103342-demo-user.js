"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Users",
            [
                {
                    first_name: "Faithful",
                    last_name: "Olaleru",
                    middle_name: "Ibukun",
                    account_number: "2283814251",
                    bank_code: "057",
                    is_verified: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    first_name: "Faithful",
                    last_name: "Olaleru",
                    middle_name: "Ibukun",
                    account_number: "3157324566",
                    bank_code: "011",
                    is_verified: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    first_name: "Faithful",
                    last_name: "Olaleru",
                    middle_name: "Ibukun",
                    account_number: "6501580951",
                    bank_code: "101",
                    is_verified: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
