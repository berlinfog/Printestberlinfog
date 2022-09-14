import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import {BrowserRouter as Router} from "react-router-dom"
import App from "./App"

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');




createRoot(container).render(
    <Router>
        <App/>
    </Router>,
);
