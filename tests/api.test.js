import {expect} from "chai"
import pkg from 'pactum';
const {spec} = pkg;
import 'dotenv/config'
import { baseUrl, userID } from "../helpers/data.js"

describe("Api tests", () =>{
    it("get request", async () => {
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
            password: process.env.PASSWORD,
        })
        .inspect()
        expect(response.statusCode).to.eql(201)
    })
})