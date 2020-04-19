import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Albums from './component/album/Albums'
import OneAlbum from './component/album/OneAlbum'
import Home from './component/Home'
import Signin from './component/auth/Signin'
import Signup from './component/auth/Signup'
import Nave from './component/Nave'
import Playlist from './component/playlist/Playlist'
import Profile from './component/playlist/Profile'
import Songs from './component/Songs'

import {Switch, Route} from 'react-router-dom'


export default class App extends Component {
  render() {
    return (
      <div>
        <Nave />

        <Switch>

        <Route path="/home" render={()=> <Home name= {"Home"} />} /> 
        <Route exact path="/songs" component={Songs} />


        <Route path="/albums" component={Albums} />
        <Route path="/albums/:id" component={OneAlbum} />

        <Route path="/profile" component={Profile} />
        <Route path="/profile/:id" component={Playlist} />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />       

        </Switch>
      </div>
    )
  }
}
