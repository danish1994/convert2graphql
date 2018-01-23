const convert2Graph = require('./index')

let query = new convert2Graph('mutation')
query.addQuery({
    name: 'addFCMToken',
    args: {
        token: 'abc'
    }
})
console.log(query.getGraphQLString())
