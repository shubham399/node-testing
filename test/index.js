// Importing superTest to make Request to the Express App
const { expect, assert } = require("chai");
let request = require("supertest");
let {app,server} = require("../index"); // to Have a express app copy.
let redirectURL = "http://shubhkumar.in"


describe("Index Test", function(){
    it("Test The Get Route", async function(){
        let res = await request(app).get("/");
        assert.strictEqual(res.status, 200, 'Status is not 200');
        assert.strictEqual(res.text, "URL Shortner UP", 'Body Should be `"URL Shortner UP"`');
    })    
    it("Try Adding a New URL and Test for if That short URL is Redirecting", async function(){
        let res = await request(app).post("/").send({"url":redirectURL});
        assert.strictEqual(res.status, 200, 'Status is not 200');
        assert.hasAllKeys(res.body, ["url","id"], 'Body Should have `url` and `shortURL` in Response');
        // Check if that Short URL is Redirecting

        res = await request(app).get(`/${res.body.id}`);
        assert.strictEqual(res.status, 302, 'Status is not 302');
        assert.equal(res.headers.location, redirectURL, `Redirection should happen to ${redirectURL} and not ${res.headers.location}`);
    })   
    it("Try Adding with Empty Body", async function(){
        let res = await request(app).post("/").send();
        assert.strictEqual(res.status, 400, 'Status is not 400');
        assert.strictEqual(res.text, "Empty URL", 'Response must contain `Empty URL`');
    })
    it("Check with invalid ID",async function(){
        res = await request(app).get(`/NOTExisiting`);
        assert.strictEqual(res.status, 404, 'Status is not 302');
        assert.equal(res.text, `Not found`);
    })
})

