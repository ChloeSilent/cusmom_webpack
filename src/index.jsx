import Post from '@models/post';
import './styles/styles.css';
import './styles/less.less';
import './styles/scss.scss';
import WebpackLogo from './assets/webpack-logo.png';
import './babel';
import React from 'react';
import ReactDOM from 'react-dom';

const post = new Post("Webpack post title2", WebpackLogo);
//$('pre').html(post.toString())


const App = () => (
    <div class="container">
        <h1>Webpack course</h1>
        <div className="logo"></div>
        <hr/>
        <pre></pre>
        <div className="box">
            <h2>ho ho ho! I have less style</h2>
        </div>
        <div className="hohoho">
            <h2>ho ho ho! I have SCSS style</h2>
        </div>
    </div>
);
ReactDOM.render(<App />, document.getElementById('app'));
