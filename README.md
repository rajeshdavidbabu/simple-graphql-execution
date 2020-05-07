# GraphQL.js

Node script dealing with simple graphQL execution `GraphQLSchema` with `graphql-js`.

# Running

```
npm install
npm start
```

# Easy Debugging

For easy debugging just make sure this object is part of .vscode > launch.json

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/src/index.js"
        }
    ]
}
```

Once you have it, you can add break-points and simply click on the debug tool to launch the program.

If this doesn't work you can always use the node debugging with ```npm start:debug```
