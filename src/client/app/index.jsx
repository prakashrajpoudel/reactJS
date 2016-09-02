import React from 'react';
import {render} from 'react-dom';
import { Button } from 'react-bootstrap';

class App extends React.Component {
	render() {
	  return (<Button bsStyle="success"> Hello, World </Button>);
	}
}

render(<App />, document.getElementById('app'));
