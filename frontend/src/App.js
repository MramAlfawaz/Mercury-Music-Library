import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Albums from "./component/album/Albums";
import OneAlbum from "./component/album/OneAlbum";
import Home from "./component/Home";
import { Signin } from "./component/auth/Signin";
import { Signup } from "./component/auth/Signup";
import Nave from "./component/Nave";
import Playlist from "./component/playlist/Playlist";
import Profile from "./component/playlist/Profile";
import Forgot from "./component/auth/Forgot";
import Reset from "./component/auth/Reset";
import Songs from "./component/Songs";
import jwt_decode from "jwt-decode";

import { Switch, Route } from "react-router-dom";

export default class App extends Component {
  state = {
    user: null,
    isSignin: false,
  };
  componentDidMount() {
    this.userSignin();
  }
  userSignin = () => {
    if (localStorage.token) {
      let token = localStorage.token;
      let user = jwt_decode(token, "SECRET").user;
      this.setState({
        user: user,
        isLogin: true,
      });
    } else {
      this.setState({
        user: null,
        isLogin: false,
      });
    }
  };
  render() {
    return (
      <div>
        <Nave isSignin={this.state.isSignin} userSignin={this.userSignin} />

        <Switch>
          <Route path="/home" render={() => <Home name={"Home"} />} />
          <Route exact path="/songs" component={Songs} />

          <Route path="/albums" component={Albums} />
          <Route path="/albums/:id" component={OneAlbum} />

          <Route path="/profile" component={Profile} />
          <Route path="/profile/:id" component={Playlist} />

          <Route
            path="/signin"
            render={(props) => (
              <Signin {...props} userSignin={this.userSignin} />
            )}
          />

          <Route path="/signin" component={Signin} />
          <Route path="/forgot" component={Forgot} />
          <Route
            exact
            path="/reset/:token"
            render={(props) => <Reset {...props} />}
          />

          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    );
  }
}
