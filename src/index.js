import Post from './post';
import json from './assets/json.json';
import xml from './assets/data.xml';
import csv from './assets/data.csv';
import './styles/styles.css'
import WebpackLogo from './assets/webpack-logo.png';

const post = new Post("Webpack post title2", WebpackLogo);

console.log("Post to string", post.toString())
console.log("json", json)
console.log("xml", xml)
console.log("csv", csv)
