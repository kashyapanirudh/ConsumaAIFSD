import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../components/home';
import Post from '../components/post';
import PostForm from '../components/PostForm';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/posts/new" component={PostForm} />
        <Route exact path="/posts/:id" component={Post} />
      </Switch>
    </Router>
  );
};

export default App;
