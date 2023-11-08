import React, { createContext, useState } from 'react';

const TopicContext = createContext();

const TopicProvider = ({ children }) => {
  const [selectedTopicKey, setSelectedTopicKey] = useState(null);

  return (
    <TopicContext.Provider value={{ selectedTopicKey, setSelectedTopicKey }}>
      {children}
    </TopicContext.Provider>
  );
};

export { TopicContext, TopicProvider };
