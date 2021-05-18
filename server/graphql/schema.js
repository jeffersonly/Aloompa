const { GraphQLSchema } = require("graphql");

// queries
const RootQuery = require("./queries");

// mutations
const mutation = require("./mutations");

module.exports = new GraphQLSchema({
    query: RootQuery, 
    mutation
});
