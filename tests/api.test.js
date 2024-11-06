import {expect} from "chai"
import pkg from 'pactum';
const {spec} = pkg;
import 'dotenv/config'
import { baseUrl, password, userID, user } from "../helpers/data.js"

let token_response;

describe("Api tests", () =>{
    it.skip("get request", async () => {
        const response = await spec()
        .get (`${baseUrl}BookStore/v1/Books`)
        .inspect()
        const responseB = JSON.stringify(response.body)
        // console.log("test dotenv : " + process.env.PASSWORD)
        expect(response.statusCode).to.eql(200)
        expect(responseB).to.include("Learning JavaScript Design Patterns")
        expect(responseB).to.include("Eloquent JavaScript, Second Edition")
        //expect(response.body.books[1].title).to.eql("Learning JavaScript Design Patterns")
        //expect(response.body.books[4].author).to.eql("Kyle Simpson")
    })

    it.skip("Create a user", async () => {
        const response = await spec()
        .post(`${baseUrl}Account/v1/User`)
        .withBody({
            userName: "testgr",
            password: password,
        })
        .inspect()
        expect(response.statusCode).to.eql(201)
    })

    it("Generate token", async () => {
        const response = await spec()
        .post(`${baseUrl}Account/v1/GenerateToken`)
        .withBody({
            userName: user,
            password: password,
        })
        .inspect()
        token_response = response.body.token
        console.log(token_response)
        expect(response.statusCode).to.eql(200)
        expect(response.body.result).to.eql("User authorized successfully.")

    })

    //it("Check token", async () => {
    //    console.log("another block", token_response)
    //})

    it.skip("Add book", async () => {
        const response = await spec()
        .post(`${baseUrl}Bookstore/v1/Books`)
        .withBearerToken(token_response)
        .withBody({
            userId: userID,
            collectionOfIsbns: [
            {
                isbn : "9781491904244"
            }
        ]
        })
        .inspect()
        expect(response.statusCode).to.eql(201)
    })

    it("Check book for user", async () => {
        const response = await spec()
        .get(`${baseUrl}Account/v1/User/${userID}`)
        .inspect()
        .withBearerToken(token_response)
        expect(response.statusCode).to.eql(200)
    })

    it("Delete all books for user", async() => {
        const response = await spec()
        .delete(`${baseUrl}BookStore/v1/Books/${userID}`)
        .inspect()
        .withBearerToken(token_response)
        expect(response.statusCode).to.eql(204)
    })

    it("Check book for user", async () => {
        const response = await spec()
        .get(`${baseUrl}Account/v1/User/${userID}`)
        .inspect()
        .withBearerToken(token_response)
        expect(response.statusCode).to.eql(200)
        expect(response.body.books).to.eql/([])
    })
})