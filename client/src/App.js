import './App.css';
import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card'

function App() {
  const GET_ALL_APPS = gql `
    query AppsQuery {
      get_all_apps {
        id,
        name
      }
    }
  `;

  const GET_ALL_STAGES = gql `
    query StagesQuery {
      get_all_stages {
        id,
        name
      }
    }
  `;

  const GET_ALL_EVENTS = gql `
    query EventsQuery {
      get_all_events {
        id,
        appId,
        stageId,
        name,
        description,
        image,
        startsAt,
        endsAt
      }
    }
  `;

  const { loading: appsLoading, error: appsError, data: appsData } = useQuery(GET_ALL_APPS);
  const { loading: stagesLoading, error: stagesError, data: stagesData } = useQuery(GET_ALL_STAGES);
  const { loading: eventsLoading, error: eventsError, data: eventsData } = useQuery(GET_ALL_EVENTS);

  useEffect(() => {
    console.log(appsData);
    console.log(eventsData);
    console.log(stagesData);
  }, [appsData, eventsData, stagesData])

  if(appsLoading || stagesLoading || eventsLoading) {
    return <div id="loading-spinner">
      <div className="block">
        <Spinner animation="border" variant="light" className="spinner" />
        <h2>Loading...</h2>
      </div>
    </div>
  }

  if(appsError || stagesError || eventsError) {
    return <div id="loading-spinner">
      <div className="block">
        {appsError ? <h2>Errors with fetching apps: {appsError}</h2> : null}
        {stagesError ? <h2>Errors with fetching stages: {stagesError}</h2> : null}
        {eventsError ? <h2>Errors with fetching events: {eventsError}</h2> : null}
      </div>
    </div>
  }

  function displayApps() {
    return (
      <>
        {appsData.get_all_apps.map(app => {
          return (
            <Card key={app.id} className="info-card">
              <Card.Header>{app.__typename}</Card.Header>
              <Card.Body>
                <Card.Title>{app.name}</Card.Title>
                <Card.Text>
                  id: {app.id}
                </Card.Text>
              </Card.Body>
            </Card>
          )
        })}
      </>
    )
  }

  function displayStages() {
    return (
      <>
        {stagesData.get_all_stages.map(stage => {
          return (
            <Card key={stage.id} className="info-card">
              <Card.Header>{stage.__typename}</Card.Header>
              <Card.Body>
                <Card.Title>{stage.name}</Card.Title>
                <Card.Text>
                  id: {stage.id}
                </Card.Text>
              </Card.Body>
            </Card>
          )
        })}
      </>
    )
  }

  function displayEvents() {
    return (
      <>
        {eventsData.get_all_events.map(event => {
          return (
            <Card key={event.id} className="info-card">
              <Card.Img variant="top" src={event.image} />
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>
                  <b>App Id:</b> {event.appId} <br/>
                  <b>Stage Id:</b> {event.stageId} <br/>
                  <b>id:</b> {event.id} <br/> 
                  <b>Description:</b> {event.description} <br/>
                  <b>Starts at:</b> {event.startsAt} <br/>
                  <b>Ends at:</b> {event.endsAt}
                </Card.Text>
              </Card.Body>
            </Card>
          )
        })}
      </>
    )
  }

  return (
    <div className="App">
      <h1>Aloompa Challenge</h1>
      <h2>Apps</h2>
      <div className="container">
        {displayApps()}
      </div>
      
      <h2>Stages</h2>
      <div className="container">
        {displayStages()}
      </div>

      <h2>Events</h2>
      <div className="container">
        {displayEvents()}
      </div>
    </div>
  );
}

export default App;
