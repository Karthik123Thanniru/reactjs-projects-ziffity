import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './HomePage.css';
import { FaRegCommentAlt } from 'react-icons/fa';
import { BsFillShareFill } from 'react-icons/bs';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { TopicContext } from './TopicContext';
import he from 'he';

const HomePage = () => {
  const [redditData, setRedditData] = useState(null);
  const { selectedTopicKey, setSelectedTopicKey } = useContext(TopicContext);
  const [sampleData, setSampleData] = useState('');

  useEffect(() => {
    axios.get('https://www.reddit.com/r/reddit.json')
      .then(response => {
        setRedditData(response.data);
      })
      .catch(error => {
        console.error('Error fetching Reddit data:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedTopicKey === null || selectedTopicKey === undefined) {
      setSelectedTopicKey(0);
    }
  }, [selectedTopicKey, setSelectedTopicKey]);

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setSampleData('The url is Copied');
    setTimeout(() => {
      setSampleData('');
    }, 1000);
  };

  return (
    <div className="container">
      <h1>Reddit Data</h1>
      {redditData && (
        <ul>
          {redditData.data.children.map((post, index) => (
            index === selectedTopicKey && (
              <li className="post" key={index}>
                <p className="credit-bar">
                  <img
                    className="subreddit-icon"
                    src="https://styles.redditmedia.com/t5_5s5qbl/styles/communityIcon_hkq7zlki8ug81.png"
                    alt="subreddit icon"
                  />
                  <div className="meta-info">
                    <span>{post.data.subreddit_name_prefixed}</span>
                    <span>{post.data.author}</span>
                  </div>
                </p>
                <h2>{post.data.title}</h2>
                <div
                  className="post-content"
                  dangerouslySetInnerHTML={{
                    __html: he.decode(post.data.selftext_html).replace(/\n/g, '<br>')
                  }}
                />
                <div className='comment-sections'>
                  <a><AiFillLike /></a>
                  <a><AiFillDislike /></a>
                  <a href={`https://www.reddit.com${post.data.permalink}`}>
                    <FaRegCommentAlt />
                  </a>
                  <a onClick={() => copyToClipboard(`${post.data.url}`)}>
                    <BsFillShareFill /> Share
                  </a>
                  <span>{sampleData}</span>
                </div>
              </li>
            )
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
