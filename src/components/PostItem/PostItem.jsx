import React from 'react';
import PropTypes from 'prop-types';
import { PostType } from '../../types';
import { getPostComments } from '../../api/posts';

function PostItem({
  post,
  postId,
  changeSidebarVisibility,
  setPostComments,
  changeCommentsLoaded,
}) {
  const { userId, title, id } = post;

  return (
    <>
      <div>
        <b>
          {`[User # ${userId}]: `}
        </b>
        { title }
      </div>
      <button
        type="button"
        className="postsList__button button"
        onClick={async() => {
          changeSidebarVisibility(id);
          changeCommentsLoaded(false);

          await getPostComments(id)
            .then(setPostComments);

          changeCommentsLoaded(true);
        }}
      >
        { postId === id ? 'Close' : 'Open' }
      </button>
    </>
  );
}

export default PostItem;

PostItem.propTypes = {
  post: PostType.isRequired,
  postId: PropTypes.number.isRequired,
  changeSidebarVisibility: PropTypes.func.isRequired,
  setPostComments: PropTypes.func.isRequired,
  changeCommentsLoaded: PropTypes.func.isRequired,
};
