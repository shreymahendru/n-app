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
    
    // test("Page tree building", () =>
    // {
        
    // });
});