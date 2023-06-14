import React from 'react';

const PromptQuestion = ({ message }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
      <div style={{ backgroundColor: '#2dcacf', color: '#fff', padding: '10px', borderRadius: '5px', marginRight: '10px' }}>
        {message}
      </div>
    </div>
  );
};

export default PromptQuestion;
