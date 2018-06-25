import React from 'react';
import ReactDOM from 'react-dom';

import Landing from './components/Landing';

import { BrowserRouter } from 'react-router-dom';

//
const app = document.getElementById("container");
ReactDOM.render(
	<BrowserRouter>
		<Landing />
	</BrowserRouter>
	, app
);