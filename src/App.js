import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


// Include the main Main Component
import Main from "./components/Main";

//Render
// ReactDOM.render(
// 	(
// 		<BrowserRouter>
// 			<Route path="/" component={Main} />
// 		</BrowserRouter>
// 	),
// 	document.getElementById("app")
// );

const App = () => (
	<Router>
		<div>
			<Switch>
				<Route exact path="/" component={Main}/>
			</Switch>
		</div>
	</Router>
);

export default App;
