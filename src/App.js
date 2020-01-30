import React from 'react';
import { connect } from 'react-redux';

import logo from './assets/circuit.svg';
import Footer from './components/footer';
import History from './components/history';
import KeyPad from './components/keypad';

import { getGame, restart } from './actions';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    this.fetchGame();
  }

  fetchGame() {
    this.props.getGame();
  }

  render() {
    const { game } = this.props;

    return (
      <div className="App">
        <div className="container">
          <div className="py-5 text-center">
            <img className="d-block mx-auto mb-4" src={logo} width="72" height="72" alt="Mastermind"/>
            <h2>Mastermind</h2>
            <p className="lead">Can you find the secret code in less than 10 attempts?</p>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4 order-md-1">
              <KeyPad game={game} />
            </div>
            <div className="col-md-8 order-md-2">
              <History game={game}/>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    game: state.game
  });
};

export default connect(mapStateToProps, {getGame, restart})(App);
