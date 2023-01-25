import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import PostList from './feature/post/postList'
import AddPostForm from './feature/post/AddPostForm'
import SinglePostPage from './feature/post/SinglePostPage'
import EditPostForm from './feature/post/EditPostForm'
import { Navbar } from './app/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddPostForm />
                <PostList />
              </React.Fragment>
            )}
          />
          <Route exact path="/posts/:id" component={SinglePostPage}></Route>
          <Route exact path="/editposts/:id" component={EditPostForm}></Route>

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
