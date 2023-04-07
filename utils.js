const axios = require("axios");
const db = require("./models");
const User = db.User;
const Op = db.Sequelize.Op;

const compareName = async (dbName, payStackName) => {
    // if they match, return true
    dbName = dbName.toUpperCase();

    if (dbName === payStackName) return true;

    return false;
};

const compareName2 = async (dbName, payStackName) => {
    // return dbName if available, otherwise return payStackName

    return dbName !== null ? dbName : payStackName;
};

const findUserByAccountNumber = async (accountNumber) => {
    let condition = {
        account_number: {
            [Op.eq]: `${accountNumber}`,
        },
    };

    const user = await User.findAll({ where: condition });

    return user[0].dataValues;
};

const callPayStack = async (accountNumber, bankCode) => {
    const endpoint = `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`;

    const config = {
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
            "Content-Type": "application/json",
        },
    };

    const response = await axios.get(endpoint, config);

    return response.data;
};

const updateUserStatus = async (accountNumber, newStatus) => {
    let condition = {
        account_number: {
            [Op.eq]: `${accountNumber}`,
        },
    };

    let user = await User.findAll({ where: condition });
    user = user[0];
    console.log("user in utils --> ", user);
    console.log("user.dataValues in utils --> ", user.dataValues);

    await user.update({
        is_verified: newStatus,
        updatedAt: new Date(),
    });

    user = await user.save();

    return user;
};

module.exports = {
    compareName,
    compareName2,
    findUserByAccountNumber,
    callPayStack,
    updateUserStatus,
};
