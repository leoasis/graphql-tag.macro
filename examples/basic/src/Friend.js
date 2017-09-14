import React from 'react';
import gql from 'graphql-tag.macro';

function Friend({ friend }) {
  return (
    <h6>
      {friend.name}:{' '}
      {friend.appearsIn.map(x => x && x.toLowerCase()).join(', ')}
    </h6>
  );
}

Friend.fragments = {
  friend: gql`
    fragment Friend_friend on Character {
      name
      appearsIn
    }
  `
}

export default Friend;
