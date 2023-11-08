import React, { useState, useEffect, useContext } from 'react';
import './SideBar.css';
import axios from 'axios';
import { TopicContext } from './TopicContext';

const SideBar = () => {
  const { setSelectedTopicKey } = useContext(TopicContext);
  const [redditData, setRedditData] = useState(null);

  useEffect(() => {
    axios.get('https://www.reddit.com/r/reddit.json')
      .then(response => {
        setRedditData(response.data);
      })
      .catch(error => {
        console.error('Error fetching Reddit data:', error);
      });
  }, []);

  const handleTopicClick = (index) => {
    setSelectedTopicKey(index);
  };

  return (
    <div className="container">
      <h1>Topics</h1>
      {redditData && (
        <ul>
          {redditData.data.children.map((post, index) => (
            <li className="post" key={index}>
              <p onClick={() => handleTopicClick(index)}>{post.data.title}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SideBar;
