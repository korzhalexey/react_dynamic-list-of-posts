import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addNewComment, getPostComments } from '../../api/posts';

import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, setPostComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  return (
    <form
      className="newCommentForm"
      onSubmit={(event) => {
        event.preventDefault();

        addNewComment({
          name,
          postId,
          email,
          body,
        })
          .then(response => (
            getPostComments(postId)
              .then(setPostComments)
          ));
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="newCommentForm__input"
          required
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="newCommentForm__input"
          required
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="newCommentForm__input newCommentForm__textarea"
          required
          value={body}
          onChange={event => setBody(event.target.value)}
        />
      </div>

      <button
        type="submit"
        className="newCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  setPostComments: PropTypes.func.isRequired,
};
