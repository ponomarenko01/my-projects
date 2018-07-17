var Sequelize = require('sequelize');
var sequelize = new Sequelize('sandbox', 'root', 'root',
    {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        logging: true
    }
);
var Snippet = sequelize.define('snippet', {
    title: Sequelize.STRING,
    code:  Sequelize.TEXT,
    key: Sequelize.STRING
})



//  sequelize.sync()
// fillDB()
//
//

var express = require('express');
const cors  = require('cors')
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
// GraphQL schema
//
var schema = buildSchema(`
    type Query {
        snippet(id: Int!): Snippet
        
    }
    

    type Snippet {
        key: String
        title: String
        code:  String
    }
    
`);

function getSnippet(args){
    let id = args.id
    console.log(args)
    return Snippet.findById(id)
}


// Root resolver
var root = {
    snippet: getSnippet
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use(cors())

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
