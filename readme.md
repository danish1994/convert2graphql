# Convert2GraphQL

[![NPM](https://nodei.co/npm/convert2graphql.png)](https://nodei.co/npm/convert2graphql/)

### This module helps to convert JSON objects into GraphQL strings needed for API calls.

#### User can add as many queries/mutations (either of them) in a single object to run them parallely.

## Usage

Install Package: 
```
npm install --save convert2graphql
```

Import Module:
```js
const convert2GraphQL = require('convert2graphql')
```

Create Object by passing type of query you want to generate ("query" or "mutation"). Default value = "query": 
```js
let query = new convert2GraphQL() //Or new convert2GraphQL('query')
let mutation = new convert2GraphQL('mutation') 
```

Add multiple Query/Mutation
```js
//Example Query 1
query.addQuery({
    name: 'getChats',
    args: {
        chatOption: {
            sortLatest: true,
            limit: 1
        },
        msgOption: {
            sortLatest: false,
            limit: 5
        },
        timestamp: "Sat Jan 20 2018 01:56:37 GMT+0530 (IST)"
    },
    nodes: {
        name: "name",
        msgs: {
            msg: "msg",
            createdBy: "createdBy"
        }
    }
})

// Example Query 2
query.addQuery({
    name: 'getMsgs',
    args: {
        msgOption: {
            sortLatest: true,
            limit: 1
        },
        chatSlug: "slug"
    },
    nodes: {
        msg: "msg",
        createdBy: "createdBy"
    }
})
```

Get GraphQL String:

```js
query.getGraphQLString()


/**
 * 
 * Following Output is Generated
 * 
 * 
 * {
 *   getChats (chatOption: { sortLatest: true  limit: 1 }msgOption: { sortLatest: false  limit: 5 } timestamp: "Sat Jan 20 2018 01:56:37 GMT+0530 (IST)" ) {
 *       name
 *       msgs{
 *           msg  createdBy
 *       }
 *   }
 *   
 *   getMsgs (msgOption: { sortLatest: true  limit: 1 } chatSlug: "slug" ) {
 *       msg 
 *       createdBy
 *   }
 * } 
 */
```