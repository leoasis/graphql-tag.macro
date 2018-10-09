import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import Friend from "./Friend";

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

const Character = ({ episode }) => (
  <Query query={HERO_QUERY} variables={{ episode }}>
    {({ loading, data, error }) => {
      if (loading) return <div>Loading</div>;
      if (error) return <h1>ERROR</h1>;
      const { hero } = data;

      return (
        <div>
          {hero && (
            <div>
              <h3>{hero.name}</h3>

              {hero.friends &&
                hero.friends.map(
                  friend => friend && <Friend key={friend.id} friend={friend} />
                )}
            </div>
          )}
        </div>
      );
    }}
  </Query>
);

const App = () => (
  <div>
    <Character episode="NEWHOPE" />
  </div>
);

export default App;
