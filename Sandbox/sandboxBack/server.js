var Sequelize = require('sequelize');
var sequelize = new Sequelize('sandbox1', 'root', 'root',
    {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        logging: false
    }
);

var User = sequelize.define('user', {
    login: Sequelize.STRING,
    mail: Sequelize.STRING,
    password:  Sequelize.TEXT,
    key: {type: Sequelize.STRING, 
        unique: true
    }
});

User.beforeCreate(function(model, options) {
    return new Promise ((resolve, reject) => {
        var shajs = require('sha.js')
        model.key = shajs('sha256').update(`${Math.random}${(new Date()).toString()}${this.login}${this.mail}`).digest('hex')
        resolve(model, options)
    });
})

var Snippet = sequelize.define('snippet', {
    title: Sequelize.STRING,
    code:  Sequelize.STRING
    // key: Sequelize.STRING
})

User.hasMany(Snippet)
Snippet.belongsTo(User, {through: 'UserSnippet'})
// sequelize.sync()

async function fillDB(){
    await sequelize.sync()
    var user1 = await User.create( {
                            login: 'First',
                            mail: 'first@google.com',
                            password: '123456'
                        })
    var user2 = await User.create(
                        {
                            login: 'Second',
                            mail: 'second@yahoo.com',
                            password: '654321'
                        })
    
    var snippetUs1_1 = await Snippet.create({title: 'first snippet first',code:'first for first user'})
    var snippetUs1_2 = await Snippet.create({title: 'second snippet first',code:'second for first user'})
    
    user1.addSnippet(snippetUs1_1)
    user1.addSnippet(snippetUs1_2)
    
    var snippetUs2_1 = await Snippet.create({title: 'first snippet second',code:'first for second user'})
    var snippetUs2_2 = await Snippet.create({title: 'second snippet second',code:'second for second user'})
    
    user2.addSnippet(snippetUs2_1)
    user2.addSnippet(snippetUs2_2)
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
        user(id: String!): User
        snippets: [Snippet]
    }

    type User {
        id: Int
        login: String
        mail: String
        title: String
        code: String
        password:  String
        snippets: [Snippet]
        timestamp: Int
        key: String
    }
    
    type Snippet {
        id: Int
        key: String
        title: String
        code:  String
        snippetId: Int
    }

    type Mutation {
        createUser(login: String!, mail: String!, password: String!): User
        createSnippet(userID: Int!, title: String!, code: String!): User
    }
    
    
`);

async function getUser({id}){
    let user = await User.findOne({
        where: {
            key: id
        }
    })
    if (user){
        user.snippets = await user.getSnippets()
        user.timestamp = user.createdAt.getTime()/1000
       
    }
   
    return user;
}

function getSnippets(args){
    let id = args.id
    // console.log(args)
    return Snippet.findById(id)
}


function getUserSnippets(args){
    let id = args.id
    return User.findById(id).then( user => user.getSnippets() )
}

async function createUser({login, mail, password}){
    return User.create({login, mail, password})
}
async function createSnippet({userID, title, code}){
    let user    = await User.findById(userID)
    let snippet = await Snippet.create({title,code})
    user.addSnippet(snippet)
    return snippet
}

// Root resolver
var root = {
    snippet: getSnippets,
    user: getUser,
    snippets: getUserSnippets,
    createUser,
    createSnippet
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

// mutation createUser($login: String!, $mail:String!, $password: String!) {
//   createUser(login: $login, mail: $mail, password: $password) {
//      login
//      mail
//      password
//   }
// }

// mutation createSnippet($userID:String!, $text:String!) {
//   createComment(userID: $userID, title: $title, code: $code) {     
//      title
//      code
//   }
// }

// var Sequelize = require('sequelize');
// var sequelize = new Sequelize('sandbox5', 'root', 'root',
//     {
//         host: 'localhost',
//         dialect: 'mysql',
//         pool: {
//             max: 5,
//             min: 0,
//             idle: 10000
//         },
//         logging: true
//     }
// );
// var Snippet = sequelize.define('snippet', {
//     title: Sequelize.STRING,
//     code:  Sequelize.TEXT,
//     key: Sequelize.STRING
// })

// var SnippetStruct = sequelize.define('snippetStruct', {
//     code:  Sequelize.TEXT,
//     key: Sequelize.STRING
// })

// Snippet.beforeCreate(function(model, options) {
//     return new Promise ((resolve, reject) => {
//         var shajs = require('sha.js')
//         model.key = shajs('sha256').update(`${Math.random}${(new Date()).toString()}${this.code}${this.title}`).digest('hex')
//         resolve(model, options)
//     });
// })


// // var User = sequelize.define('user', {
// //     login:  Sequelize.TEXT,
// //     mail:  Sequelize.TEXT,
// //     password:  Sequelize.TEXT
// // })

// // Snippet.beforeCreate(function(model, options) {
// //     return new Promise ((resolve, reject) => {
// //         var shajs = require('sha.js')
// //         model.key = shajs('sha256').update(`${Math.random}${(new Date()).toString()}${this.code}${this.title}`).digest('hex')
// //         resolve(model, options)
// //     });
// // })

// // User.beforeCreate(function(model, options) {
// //     return new Promise ((resolve, reject) => {
// //         var shajs = require('sha.js')
// //         model.key = shajs('sha256').update(`${Math.random}${(new Date()).toString()}${this.login}${this.mail}`).digest('hex')
// //         resolve(model, options)
// //     });
// // })

// // User.hasMany(Snippet)
// // Snippet.belongsTo(User, {through: 'UserSnippet'})
// // // sequelize.sync()

// // async function fillDB(){
// //     await sequelize.sync()
// //     var snippet1 = await Snippet.create( {
// //                             title: 'First Snippet',
// //                             code: 'First Snippet -few letters of code-'
// //                         })
// //     var snippet2 = await Snippet.create(
// //                         {
// //                             title: 'Second Snippet',
// //                             code: 'Second Snippet -few letters of code-'
// //                         })
// //     var snippet3 = await Snippet.create(
// //                         {
// //                             title: 'Third Snippet',
// //                             code: 'Third Snippet -few letters of code-'
// //                         })
// //     var snippet4 = await Snippet.create(
// //                         {
// //                             title: 'Four Snippet',
// //                             code: 'Four Snippet -few letters of code-'
// //                         })

// //     var user1 = await User.create( {
// //                             login: 'example',
// //                             mail: 'example@example.com',
// //                             password: '12345'
// //                         })

// //     var user2 = await User.create( {
// //                             login: 'next',
// //                             mail: 'next@next.com',
// //                             password: '54321'
// //                         })

// //     var user3 = await User.create( {
// //                             login: 'before',
// //                             mail: 'before@before.com',
// //                             password: '678910'
// //                         })

// //     var user4 = await User.create( {
// //                             login: 'last',
// //                             mail: 'last@last.com',
// //                             password: '109876'
// //                         })

// // user1.addSnippet(snippet1);
// // user2.addSnippet(snippet2);
// // user3.addSnippet(snippet3);
// // user4.addSnippet(snippet4);

// // }

// Snippet.hasMany(SnippetStruct)
// SnippetStruct.belongsTo(Snippet)

// async function fillDB(){
//     await sequelize.sync()
//     var snippet1 = await Snippet.create( {
//                             title: 'First Snippet',
//                             code: 'First Snippet -few letters of code-'
//                         })
//     var snippet2 = await Snippet.create(
//                         {
//                             title: 'Second Snippet',
//                             code: 'Second Snippet -few letters of code-'
//                         })
//     var snippet3 = await Snippet.create(
//                         {
//                             title: 'Third Snippet',
//                             code: 'Third Snippet -few letters of code-'
//                         })
//     var snippet4 = await Snippet.create(
//                         {
//                             title: 'Four Snippet',
//                             code: 'Four Snippet -few letters of code-'
//                         })

//                         var snippetStruct1 = await SnippetStruct.create({code: 'test code of 1 snippetStruct for first snippet'})
//                         var snippetStruct2 = await SnippetStruct.create({code: 'test code of 2 snippetStruct for second snippet'})
//                         var snippetStruct3 = await SnippetStruct.create({code: 'test code of 3 snippetStruct for third snippet'})
//                         var snippetStruct4 = await SnippetStruct.create({code: 'test code of 4 snippetStruct for four snippet'})

// snippet1.addSnippetStruct(SnippetStruct1);
// snippet2.addSnippetStruct(SnippetStruct2);
// snippet3.addSnippetStruct(SnippetStruct3);
// snippet4.addSnippetStruct(SnippetStruct4);

// }


// //  sequelize.sync()
// // fillDB()
// //
// //

// var express = require('express');
// const cors  = require('cors')
// var express_graphql = require('express-graphql');
// var { buildSchema } = require('graphql');
// // GraphQL schema
// //
// var schema = buildSchema(`
//     type Query {
//         snippet(id: Int!): Snippet
//         user(id: Int!): User
        
//     }
    

//     type Snippet {
//         id: Int
//         key: String
//         title: String
//         code:  String
//     }

//     // type User {
//     //     id: Int
//     //     key: String
//     //     login: String
//     //     mail:  String
//     //     snippets: [Snippet]
//     // }

    
    
// `);

// async function getUser(args){
//     let id = args.id
//     let user = await User.findById(id)
//     user.snippets = await user.getSnippets()
//     // console.log(args)
//     return User.findById(id)
// }

// function getSnippet(args){
//     let id = args.id
//     // console.log(args)
//     return Snippet.findById(id)
// }

// function getUserSnippets(args){
//     let id = args.id
//     return User.findById(id).then( user => user.getSnippets() )
// }

// // async function getSnippet({id}){
// //     let snippet = await Snippet.findOne({
// //         where:{
// //             key: id
// //         }
// //     })
// //     // console.log(snippet)
// //     return snippet
// // }

// // Root resolver
// var root = {
//     snippet: getSnippet,
//     // user: getUser,
//     // user: getUserSnippets
// };
// // Create an express server and a GraphQL endpoint
// var app = express();
// app.use(cors())

// app.use('/graphql', express_graphql({
//     schema: schema,
//     rootValue: root,
//     graphiql: true
// }));
// app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));


 