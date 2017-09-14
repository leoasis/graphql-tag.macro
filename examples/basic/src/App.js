import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag.macro';
import Friend from './Friend';

const HERO_QUERY = gql`
  query GetCharacter($episode: Episode!) {
    hero(episode: $episode) {
      name
      id
      friends {
        id
        ...Friend_friend
      }
    }
  }

  ${Friend.fragments.friend}
`;

const withData = graphql(HERO_QUERY, {
  options: ({ episode }) => ({
    variables: { episode },
  }),
  props: ({ data }) => ({ ...data }),
});

const CharacterWithoutData = ({ loading, hero, error }) => {
  if (loading) return <div>Loading</div>;
  if (error) return <h1>ERROR</h1>;
  return (
    <div>
      {hero &&
        <div>
          <h3>
            {hero.name}
          </h3>

          {hero.friends &&
            hero.friends.map(
              friend =>
                friend &&
                <Friend key={friend.id} friend={friend} />
            )}
        </div>}
    </div>
  );
};

const Character = withData(CharacterWithoutData);

const App = () =>
  <div>
    <Character episode="NEWHOPE" />
  </div>;

export default App;
