var Sequelize = require('sequelize');
var sequelize = new Sequelize('sandbox0', 'root', 'root',
    {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        logging: false
        //true 
    }
);

var User = sequelize.define('user', {
    login: Sequelize.STRING,
    mail: Sequelize.STRING,
    password:  Sequelize.TEXT,
    
});

var Snippet = sequelize.define('snippet', {
    title: Sequelize.STRING,
    code:  Sequelize.STRING,
    key: {type: Sequelize.STRING, 
        unique: true
    }
})

Snippet.beforeCreate(function(model, options) {
    return new Promise ((resolve, reject) => {
        var shajs = require('sha.js')
        model.key = shajs('sha256').update(`${Math.random}${(new Date()).toString()}${this.title}${this.code}`).digest('hex')
        resolve(model, options)
    });
})

User.hasMany(Snippet)
Snippet.belongsTo(User)
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
        snippet(id: String!, userId: Int!): Snippet
        user(id: Int!): User
        users: [User]
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
        timestamp: Int,
        userId: Int
        
    }


    
    type Snippet {
        id: Int
        key: String
        title: String
        code:  String
        snippetId: Int
        userId: Int
    }

    type Mutation {
        createUser(login: String!, mail: String!, password: String!): User
        createSnippet(userId: Int!, title: String!, code: String!): Snippet
        updateSnippet(snippetId: String!, userId: Int!, code: String!): Snippet
    }
    
    
`);

async function getSnippet({id}){
    let snippet = await Snippet.findOne({
        where: {
            key: id
        }
    })
    // if (user){
    //     user.snippets = await user.getSnippet()
    //     user.timestamp = user.createdAt.getTime()/1000
       
    // }
   
    return snippet;
}

async function updateSnippet(args){
    let id = args.snippetId
    let code = args.code
    var snippet = await Snippet.findOne({
        where: {
            key: id
        }
    })
    // .then(snippet => snippet.update({code}));
    console.log(snippet);
    if (snippet){
        snippet.update({code})
    //    snippet => snippet.update({code})
console.log("success");
    }
    else{
       console.log("error");
    }
    
   
    return snippet;
}

// async function updateSnippet(args){
//     let id = args.snippetId
//     let code = args.code
//     console.log(args)
//     return await Snippet.findOne({
//         where: {
//             key: id
//         }
//     })
//     .then(snippet => snippet.update({code}));
// }

function getUser(args){
    let id = args.id
    // console.log(args)
    return User.findById(id)
}


function getUserSnippets(args){
    let id = args.id
    return User.findById(id)
    .then( user => user.getSnippet() )
    .then( snippets => snippets.filter(snippet => !snippet.snippetId))
}

// function getUserByIdSnippet(args){
//     let id = args.id
//     return User.findById(snippetIid).then( user => user.getSnippets() )
// }

async function createUser({login, mail, password}){
    return User.create({login, mail, password})
}

// async function updateSnippet({code}){
//     let snippet = await getSnippet({id})

//     return snippet
// }

async function createSnippet({userId, title, code}){
    let user    = await User.findById(userId)
    let snippet = await Snippet.create({title,code})
    user.addSnippet(snippet)
    return snippet
    console.log(userId)
}

async function getUsers(args){
    let users = await User.findAll({})
    for (let user of users){
        user.timestamp = user.createdAt.getTime()/1000
    }
    return users;
}



// Root resolver
var root = {
    snippet: getSnippet,
    user: getUser,
    users: getUsers,
    snippets: getUserSnippets,
    createUser,
    createSnippet,
    updateSnippet
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

// function getSnippets(args){
//     let id = args.id
//     // console.log(args)
//     return Snippet.findById(id)
// }


// function getUserSnippets(args){
//     let id = args.id
//     return User.findById(id)
//     .then( user => user.getSnippets() )
//     .then( snippets => snippets.filter(snippet => !snippet.snippetId))
// }








 