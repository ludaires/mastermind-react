import React from 'react';
import { connect } from 'react-redux';

import { restart } from '../actions';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.handleRestart.bind(this);
  }

  handleRestart = e => {
    this.props.restart();
  };

  render() {
    const { game } = this.props;
    let history = [];
    if (game) {
      history = game.history;
    }

    if (history.length === 0) {
      return null;
    }

    return (
      <div>
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted">Attempts</span>
          <span className="badge badge-secondary badge-pill">{this.props.game.attempts}</span>
        </h4>
        <ul className="list-group mb-3">
          { history.map((row, index) => {
            return (
              <li key={index} className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">{!!row.numbers ? row.numbers.join('') : ''}</h6>
                  <small className="text-muted">{row.message}</small>
                </div>
                <span className="text-muted">{index+1}</span>
              </li>
            );
          }) }
        </ul>
        <form className="card p-2" onSubmit={ this.handleRestart }>
          <div className="input-group">
            <button type="submit" className="btn btn-secondary btn-block">
              Restart
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    game: state.game
  }
};

export default connect(mapStateToProps, { restart })(History);
