// Handle queries
const axios = require("axios");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} = require("graphql");

const { AppType, StageType, EventType } = require("./types");

// root query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // APP QUERIES
        get_all_apps: { // get all apps
            type: new GraphQLList(AppType),
            resolve() {
                return axios.get("http://localhost:8000/apps/")
                .then(res => res.data);
            }
        },
        get_app: {
            type: AppType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) { 
                return axios.get("http://localhost:8000/apps/" + args.id)
                .then(res => res.data);
            }
        },
        // STAGE QUERIES
        get_all_stages: { // get all stages
            type: new GraphQLList(StageType),
            resolve() {
                return axios.get("http://localhost:8000/stages/")
                .then(res => res.data);
            }
        },
        get_stage: { // get specific stage
            type: StageType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) { 
                return axios.get("http://localhost:8000/stages/" + args.id)
                .then(res => res.data);
            }
        },
        search_stage_name: { // search stages by name (checks starting at the start of the string)
            type: new GraphQLList(StageType),
            args: {
                name: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return axios.get("http://localhost:8000/stages/")
                .then(res => { 
                    return res.data.filter(objs => objs.name.toLowerCase().startsWith(args.name.toLowerCase()));
                });
            }
        },
        // EVENT QUERIES 
        get_all_events: { // get all events
            type: new GraphQLList(EventType),
            resolve() {
                return axios.get("http://localhost:8000/events/")
                .then(res => res.data);
            }
        },
        get_event: { // get specific event 
            type: EventType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                // get data for a specific event
                return axios.get("http://localhost:8000/events/" + args.id)
                .then(res => res.data);
            }
        }, 
        search_event_name: { // search events by name (checks starting at the start of the string)
            type: new GraphQLList(EventType),
            args: {
                name: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return axios.get("http://localhost:8000/events/")
                .then(res => { 
                    return res.data.filter(objs => objs.name.toLowerCase().startsWith(args.name.toLowerCase()));
                });
            }
        },
        get_events_between: { // query events between two dates
            type: new GraphQLList(EventType),
            args: {
                startsAt: { type: GraphQLInt },
                endsAt: { type: GraphQLInt }
            },
            resolve(parentValue, args) {
                return axios.get("http://localhost:8000/events/")
                .then(res => { 
                    return res.data.filter(objs => args.startsAt <= objs.startsAt && objs.endsAt <= args.endsAt);
                });
            }
        },
        get_events_in_app: { // list all events in an app
            type: new GraphQLList(EventType),
            args: {
                appId: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return axios.get("http://localhost:8000/events/")
                .then(res => { 
                    return res.data.filter(objs => args.appId === objs.appId);
                });
            }
        },
        get_stages_in_app: { // list all stages in an app
            type: new GraphQLList(StageType),
            args: {
                appId: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return axios.get("http://localhost:8000/events/")
                .then(res => {
                    // get all events in a app and their stage ids, make list of the stage ids
                    let listOfEventsInApp = res.data.filter(objs => args.appId === objs.appId);
                    let uniqueListOfStageIDs = [];
                    for(let i = 0; i < listOfEventsInApp.length; i++) {
                        let currentEvent = listOfEventsInApp[i];
                        if(uniqueListOfStageIDs.includes(currentEvent.stageId)) {
                            continue;
                        } else {
                            uniqueListOfStageIDs.push(currentEvent.stageId);
                        }
                    }

                    // get all stages, filter stages in correlation to the list above
                    return axios.get("http://localhost:8000/stages/")
                    .then(res2 => {
                        return res2.data.filter(objs => uniqueListOfStageIDs.includes(objs.id));
                    });
                });
            }
        },
        get_stage_in_event: { // get stage in an event
            type: StageType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                // get data for a specific event
                return axios.get("http://localhost:8000/events/" + args.id)
                .then(res => {
                    return axios.get("http://localhost:8000/stages/" + res.data.stageId)
                    .then(res => res.data);
                });
            }
        },
        list_events_at_stage: { // list events at a stage
            type: new GraphQLList(EventType),
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                // get all events
                return axios.get("http://localhost:8000/events/")
                .then(res => {
                    return res.data.filter(objs => args.id === objs.stageId);
                });
            }
        }
    }
});

module.exports = RootQuery;
