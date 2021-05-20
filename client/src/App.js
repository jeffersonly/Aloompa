import './App.css';
import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';



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

  const { loading2, error2, data2 } = useQuery(GET_ALL_APPS);
  const { loading, error, data } = useQuery(GET_ALL_STAGES);

  useEffect(() => {
    // console.log(loading);
    // console.log(error);
    // console.log(data);
    // console.log("hello");

    console.log(loading2);
    console.log(error2);
    console.log(data2);
  }, [data, data2])

  return (
    <div className="App">
    </div>
  );
}

export default App;
