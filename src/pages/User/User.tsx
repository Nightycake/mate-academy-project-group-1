import React from 'react';
import './user.scss';
import { useUserSelector } from '../../app/redux/hooks/hooks';
import { useParams } from 'react-router-dom';

const User = () => {
  const { id } = useParams();
  const user = useUserSelector((state) =>
    state.users.users.find((user) => user.id === id)
  );
  return (
    <div className="container user">
      <div className="background">
        <img src={user?.background} className="background__landscape" />
        <h1 className="background__motto">{user?.motto}</h1>
      </div>
      <div className="info">
        <div className="details">
          <div className="details__datacontent">
            <h3 className="details__data">{user?.fullName}</h3>
            <h4 className="details__data">{user?.occupation}</h4>
          </div>
          <div className="details__datacounter">
            <div className="details__counter">
              <p className="details__name">posts</p>
              <p className="details__number">5</p>
            </div>
            <div className="details__counter">
              <p className="details__name">likes</p>
              <p className="details__number">34</p>
            </div>
            <div className="details__counter">
              <p className="details__name">dislikes</p>
              <p className="details__number">7</p>
            </div>
          </div>
        </div>
        <div className="about">
          <h2>About</h2>
          <p className="about__content">{user?.description}</p>
        </div>
      </div>
      <div className="photo">
        <img src={user?.avatar} className="photo__avatar" />
      </div>
    </div>
  );
};

export default User;