// import * as Assert from "assert";
// import { given } from "@nivinjoseph/n-defensive";

suite("Random stuff", () =>
{
    test("string splitting", () =>
    {
        // let value = "/home/todo";
        const value = "/";
        const splitted = value.split("/");
        // assert.ok(splitted.length === 2);
        console.log(splitted);
        console.log(splitted.map(t => t.length));
    });
    
    // test.only("Schema conversion", () =>
    // {
    //     const schema = '{"foo?": "string", "bar": [], "baz": Nove, box: {b: "string"}}';
        
    //     const result = schemaToType(schema);
        
    //     console.log(result);
    //     const parsed = JSON.parse(result);
    //     console.log(parsed);
        
    //     Assert.ok(true);
    // });
});