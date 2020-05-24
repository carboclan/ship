import React, { ReactChild } from 'react';

const commentProps = {
  text: string | ReactChild
}

function Comment({ text } =  commentProps) {
  return (
    <div style={{ padding: 5, opacity: 0.5 }}>
      {text}
    </div>
  );
}

export default Comment;