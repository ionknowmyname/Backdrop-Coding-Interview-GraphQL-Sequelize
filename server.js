const express = require("express");
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./graphql/schema");

const app = express();

dotenv.config();

const createServer = () => {
    app.get("/", (req, res) => {
        res.json({ msg: "Tested & Trusted " });
    });

    app.use(
        "/graphql",
        graphqlHTTP({
            schema: schema,
            graphiql: true,
        })
    );

    return app;
};

module.exports = createServer;
