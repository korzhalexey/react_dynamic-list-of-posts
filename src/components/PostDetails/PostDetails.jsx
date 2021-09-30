import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Loader } from '../Loader';
import { deleteComment, getPostComments } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';

import './PostDetails.scss';

export const PostDetails = ({
  postComments,
  postId,
  postBody,
  setPostComments,
  isCommentsLoaded,
}) => {
  const [commentsVisibility, setCommentsVisibility] = useState(false);

  const changeCommentsVisibility = () => {
    setCommentsVisibility(!commentsVisibility);
  };

  return (
    <div className="postDetails">
      <h2>Post details:</h2>

      <section className="postDetails__post">
        <p>{ postBody }</p>
      </section>

      <section className="postDetails__comments">
        <button
          type="button"
          className="button postDetails__button"
          onClick={changeCommentsVisibility}
        >
          {
            commentsVisibility
              ? `Show ${postComments.length} comment(s)`
              : `Hide ${postComments.length} comment(s)`
          }
        </button>

        <ul
          className={cn({
            postDetails__list: true,
            hidden: commentsVisibility,
          })}
        >
          {
            isCommentsLoaded ? (
              postComments.map(comment => (
                <li
                  key={comment.id}
                  className="postDetails__list-item"
                >
                  <button
                    type="button"
                    className="postDetails__remove-button button"
                    onClick={() => (
                      deleteComment(comment.id)
                        .then(response => (
                          getPostComments(postId)
                            .then(setPostComments)
                        ))
                    )}
                  >
                    X
                  </button>
                  <p>
                    { comment.body }
                  </p>
                </li>
              ))
            ) : (
              <Loader />
            )
          }
        </ul>
      </section>

      <section>
        <div className="postDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
            setPostComments={setPostComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.defaultProps = {
  postBody: '',
};

PostDetails.propTypes = {
  postComments: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    postId: PropTypes.number.isRequired,
    updatedAt: PropTypes.string.isRequired,
  })).isRequired,
  postId: PropTypes.number.isRequired,
  postBody: PropTypes.string,
  setPostComments: PropTypes.func.isRequired,
  isCommentsLoaded: PropTypes.bool.isRequired,
};
