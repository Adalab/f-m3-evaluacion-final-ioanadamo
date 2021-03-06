import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import CardsDetail from './components/CardsDetail';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			people: {
				data: [],
				isFetching: true
			},
			filters: {
				value: ''
			}
		};

		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		this.fetchCharacters();
	}
	fetchCharacters() {
		fetch('https://hp-api.herokuapp.com/api/characters')
			.then(response => response.json())
			.then(data => {
				const newData = data.map((item, key) => {
					return {
						...item,
						id: key
					};
				});
				this.setState({
					people: {
						isFetching: false,
						data: newData
					}
				});
			});
	}

	handleChange(e) {
		const inpValue = e.currentTarget.value;

		this.setState({
			filters: {
				value: inpValue
			}
		});
	}

	render() {
		return (
			<div className="App">
				<Switch>
					<Route
						exact
						path="/"
						render={() => (
							<HomePage
								people={this.state.people.data}
								isFetching={this.state.people.isFetching}
								value={this.state.filters.value}
								handleChange={this.handleChange}
							/>
						)}
					/>
					<Route
						path="/people/:peopleId"
						render={routerProps => (
							<CardsDetail
								match={routerProps.match}
								people={this.state.people.data}
							/>
						)}
					/>
				</Switch>
			</div>
		);
	}
}

export default App;
