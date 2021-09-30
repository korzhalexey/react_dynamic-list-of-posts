import React from 'react';
import PropTypes from 'prop-types';
import PostItem from '../PostItem/PostItem';
import { PostType } from '../../types';

import './PostsList.scss';

export const PostsList = ({
  posts,
  postId,
  changeSidebarVisibility,
  setPostComments,
  changeCommentsLoaded,
}) => (
  <div className="postsList">
    <h2>Posts:</h2>

    <ul className="postsList__list">
      {
        posts.map(post => (
          <li
            className="postsList__item"
            key={post.id}
          >
            <PostItem
              post={post}
              postId={postId}
              changeSidebarVisibility={changeSidebarVisibility}
              setPostComments={setPostComments}
              changeCommentsLoaded={changeCommentsLoaded}
            />
          </li>
        ))
      }
    </ul>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PostType).isRequired,
  postId: PropTypes.number.isRequired,
  changeSidebarVisibility: PropTypes.func.isRequired,
  setPostComments: PropTypes.func.isRequired,
  changeCommentsLoaded: PropTypes.func.isRequired,
};
