const request = require("supertest");

const createServer = require("./server");

const app = createServer();

describe("Testing GraphQL", () => {
    test("mutation test", async () => {
        const query = `mutation {
            verifyUser(user_account_number: "3157324566", user_bank_code: "011", user_account_name: "Faithful Olaleru"){
                id, first_name, last_name, middle_name, is_verified, account_number, bank_code
            }
        }`;
        const response = await request(app)
            .post("/graphql")
            .send({ query: query });

        // console.log("response: --> ", response);

        expect(JSON.parse(response.text).errors).toEqual(undefined);
    });

    test("query test", async () => {
        const query = `query { 
            getAccountNameByAccountNumber(user_account_number: "2283814251", user_bank_code: "057")
        }`;
        const response = await request(app)
            .post("/graphql")
            .send({ query: query });

        // console.log("response: --> ", response);

        expect(JSON.parse(response.text).errors).toEqual(undefined);
    });
});
