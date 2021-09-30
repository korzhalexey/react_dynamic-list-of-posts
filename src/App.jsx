import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { Loader } from './components/Loader';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts } from './api/posts';

import './App.scss';
import './styles/general.scss';

const App = () => {
  const [postsFromServer, setPostsFromServer] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, selectPost] = useState(0);
  const [postComments, setPostComments] = useState([]);
  const [sidebarVisibility, setSidebarVisibility] = useState(false);
  const [isLoaded, setLoading] = useState(false);
  const [isCommentsLoaded, changeCommentsLoaded] = useState(false);

  useEffect(() => {
    (async function() {
      setLoading(false);

      await getPosts()
        .then((posts) => {
          setPostsFromServer(posts);
          setFilteredPosts(posts);
        });

      setLoading(true);
    })();
  }, []);

  const changeSidebarVisibility = (id) => {
    if (selectedPost !== id) {
      selectPost(id);
      setSidebarVisibility(true);
    } else {
      selectPost(0);
      setSidebarVisibility(false);
    }
  };

  const filterByUser = (event) => {
    const value = +event.target.value;

    if (value === 0) {
      setFilteredPosts(postsFromServer);
    } else {
      setFilteredPosts(
        postsFromServer.filter(post => post.userId === value),
      );
    }
  };

  return (
    <div className="app">
      <header className="app__header">
        <label>
          Select a user: &nbsp;

          <select
            className="app__user-selector"
            onChange={filterByUser}
          >
            <option value="0">All users</option>
            <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
            <option value="10">Leanne Graham</option>
          </select>
        </label>
      </header>

      <main className="app__main">
        <div className="app__content">
          {
            isLoaded ? (
              <PostsList
                posts={filteredPosts}
                postId={selectedPost}
                changeSidebarVisibility={changeSidebarVisibility}
                setPostComments={setPostComments}
                isCommentsLoaded={isCommentsLoaded}
                changeCommentsLoaded={changeCommentsLoaded}
              />
            ) : (
              <Loader />
            )
          }
        </div>

        <div className={cn({
          app__sidebar: true,
          hidden: !sidebarVisibility,
        })}
        >
          <PostDetails
            postComments={postComments}
            postId={selectedPost}
            postBody={filteredPosts[selectedPost]?.body}
            setPostComments={setPostComments}
            isCommentsLoaded={isCommentsLoaded}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
