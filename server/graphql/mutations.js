// Contains mutation code (CRUD functionality)
const axios = require("axios");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} = require("graphql");

const { StageType, EventType } = require("./types");

// mutations
const mutations = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // Stage Mutations
        addStage: {
            type: StageType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args) {
                return axios.post("http://localhost:3000/stages", {
                    name: args.name
                }).then(res => res.data);
            }
        },
        removeStage: {
            type: StageType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args) {
                return axios.delete("http://localhost:3000/stages/" + args.id)
                .then(res => res.data);
            }
        },
        editStage: {
            type: StageType,
            args: { 
                id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return axios.patch("http://localhost:3000/stages/" + args.id, args)
                .then(res => res.data);
            }
        },
        // Event Mutations
        addEvent: {
            type: EventType,
            args: {
                appId: { type: new GraphQLNonNull(GraphQLString) },
                stageId: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                image: { type: new GraphQLNonNull(GraphQLString) },
                startsAt: { type: new GraphQLNonNull(GraphQLInt) },
                endsAt: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parentValue, args) {
                return axios.post("http://localhost:3000/events", { 
                    appId: args.appId,
                    stageId: args.stageId,
                    name: args.name,
                    description: args.description,
                    image: args.image,
                    startsAt: args.startsAt,
                    endsAt: args.endsAt
                }).then(res => res.data);
            }
        },
        removeEvent: {
            type: EventType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args) {
                return axios.delete("http://localhost:3000/events/" + args.id)
                .then(res => res.data);
            }
        },
        editEvent: {
            type: EventType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                appId: { type: GraphQLString },
                stageId: { type: GraphQLString },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                image: { type: GraphQLString },
                startsAt: { type: GraphQLString },
                endsAt: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return axios.patch("http://localhost:3000/events/" + args.id, args)
                .then(res => res.data);
            }
        },
    }
}); 

module.exports = mutations;