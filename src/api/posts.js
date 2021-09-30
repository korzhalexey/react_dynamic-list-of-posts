import { BASE_URL } from './base-api';

export const getPosts = () => fetch(`${BASE_URL}/posts`)
  .then(response => response.json())
  .catch(error => error);

export const getPostComments = postId => (
  fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(response => response.json())
    .catch(error => error)
);

export const addNewComment = comment => (
  fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  })
);

export const deleteComment = commentId => (
  fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' })
);
