import React from 'react';
import HomePage from './Components/RedditApp/HomePage';
import SideBar from './Components/RedditApp/SideBar';
import { TopicProvider } from './Components/RedditApp/TopicContext';
import './App.css';

function App() {
  return (
    <TopicProvider>
      <div style={{ display: "grid", gridTemplateColumns: "30% 60%",gridColumnGap: "10px" }}>
        <SideBar  />
        <HomePage />
      </div>
    </TopicProvider>
  );
}

export default App;
