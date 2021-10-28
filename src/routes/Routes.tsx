import { Route, Switch } from "react-router-dom";

import About from 'pages/about/About';
import Terms_Conditions from 'pages/terms_conditions/Terms_Conditions';
import Privacy_Policy from 'pages/privacy_policy/Privacy_Policy';

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/terms_conditions" component={Terms_Conditions} />
			<Route exact path="/about" component={About} />
			<Route exact path="/privacy_policy" component={Privacy_Policy} />
		</Switch>
	);
};

export default Routes