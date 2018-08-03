var Sequelize = require('sequelize');
var sequelize = new Sequelize('sandbox2', 'root', 'root',
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

var SnippetStruct = sequelize.define('snippetStruct', {
    code:  Sequelize.TEXT,
    key: Sequelize.STRING
})

Snippet.beforeCreate(function(model, options) {
    return new Promise ((resolve, reject) => {
        var shajs = require('sha.js')
        model.key = shajs('sha256').update(`${Math.random}${(new Date()).toString()}${this.code}${this.title}`).digest('hex')
        resolve(model, options)
    });
})

Snippet.hasMany(SnippetStruct)
SnippetStruct.belongsTo(Snippet)

async function fillDB(){
    await sequelize.sync()
    var snippet1 = await Snippet.create( {
                            title: 'First Snippet',
                            code: 'First Snippet -few letters of code-'
                        })
    var snippet2 = await Snippet.create(
                        {
                            title: 'Second Snippet',
                            code: 'Second Snippet -few letters of code-'
                        })
    var snippet3 = await Snippet.create(
                        {
                            title: 'Third Snippet',
                            code: 'Third Snippet -few letters of code-'
                        })
    var snippet4 = await Snippet.create(
                        {
                            title: 'Four Snippet',
                            code: 'Four Snippet -few letters of code-'
                        })

                        var snippetStruct1 = await SnippetStruct.create({code: 'test code of 1 snippetStruct for first snippet'})
                        var snippetStruct2 = await SnippetStruct.create({code: 'test code of 2 snippetStruct for second snippet'})
                        var snippetStruct3 = await SnippetStruct.create({code: 'test code of 3 snippetStruct for third snippet'})
                        var snippetStruct4 = await SnippetStruct.create({code: 'test code of 4 snippetStruct for four snippet'})

snippet1.addSnippetStruct(SnippetStruct1);
snippet2.addSnippetStruct(SnippetStruct2);
snippet3.addSnippetStruct(SnippetStruct3);
snippet4.addSnippetStruct(SnippetStruct4);

}

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


 // snippetStruct(id: Int!): SnippetStruct

 // type SnippetStruct {
    //     key: String
    //     code:  String
    // }