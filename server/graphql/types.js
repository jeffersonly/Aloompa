// Create object types
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require("graphql");

// App Type
const AppType = new GraphQLObjectType({
    name: "App",
    fields: () => ({
        id: { type: GraphQLString }, 
        name: { type: GraphQLString }
    })
});

// Stage Type
const StageType = new GraphQLObjectType({
    name: "Stage",
    fields: () => ({
        id: { type: GraphQLString }, 
        name: { type: GraphQLString }
    })
});

// Event Type
const EventType = new GraphQLObjectType({
    name: "Event",
    fields: () => ({
        id: { type: GraphQLString },
        appId: { type: GraphQLString },
        stageId: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        image: { type: GraphQLString },
        startsAt: { type: GraphQLInt },
        endsAt: { type: GraphQLInt }
    })
});

module.exports = {
    AppType,
    StageType,
    EventType
};
