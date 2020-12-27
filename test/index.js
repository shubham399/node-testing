// Importing superTest to make Request to the Express App
const { expect, assert } = require("chai");
let request = require("supertest");
let {app,server} = require("../index"); // to Have a express app copy.


describe("Index Test", function(){
    it("Test The Get Route", async function(){
        let res = await request(app).get("/");
        assert.strictEqual(res.status, 200, 'Status is not 200');
        assert.strictEqual(res.text, "URL Shortner UP", 'Body Should be `"URL Shortner UP"`');
    })    
    it("Try Adding a New URL and Test for if That short URL is Redirecting", async function(){
        let res = await request(app).post("/").send({"url":"http://shubhkumar.in"});
        assert.strictEqual(res.status, 200, 'Status is not 200');
        assert.hasAllKeys(res.body, ["url","shortURL"], 'Body Should have `url` and `shortURL` in Response');
        // Check if that Short URL is Redirecting

        res = await request(app).get(`/${res.body.shortURL}`);
        assert.strictEqual(res.status, 302, 'Status is not 302');
        assert.equal(res.status, 302, 'Status is not 302');
    })
})

