const { GraphQLSchema } = require("graphql");

// queries
const RootQuery = require("./queries");

// mutations
const { mutations } = require("./mutations");

module.exports = new GraphQLSchema({
    query: RootQuery, 
    mutations
});
