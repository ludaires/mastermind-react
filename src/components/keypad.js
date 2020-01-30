import React from 'react';
import { connect } from 'react-redux';
import UIfx from "uifx";

import { guess } from '../actions';
import { GameStatus } from '../services/game';
import clickAudio from '../assets/sounds/phone-bump.wav';

const clickFx = new UIfx(clickAudio);

class Keypad extends React.Component {
  constructor(props) {
    super(props);
    this.state = { code: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    clickFx.play();
    this.setState({code: e.target.value});
  }


  handleSubmit(e) {
    e.preventDefault();
    const { game } = this.props;
    const { code } = this.state;

    if (game.status !== GameStatus.STARTED) {
      return false;
    }

    const numbers = code.split('');
    this.props.guess(numbers);
  };

  getLabel() {
    const { game } = this.props;
    const { status, win } = game;

    if (status === GameStatus.ENDED) {
        if (win) {
          return 'Congratulations! 🍻';
        } else {
          return 'Game over! \u2620'
        }
    } else {
      return 'Guess';
    }
  }

  render() {
    const { game } = this.props;
    const { code } = this.state;

    return (
      <div>
        <h4 className="mb-3">Code</h4>
        <form className="needs-validation" onSubmit={this.handleSubmit} disabled={game.status !== GameStatus.STARTED}>
          <div className="mb-3">
            <input type="number" id="numbers"
                   className="form-control"
                   min="0" max="9999"
                   minLength="4" maxLength="4"
                   placeholder="****"
                   onChange={this.handleChange}
                   value={code}
                   required autoFocus/>
            <div className="invalid-feedback">Valid code is required.</div>
          </div>
          <hr className="mb-4" />
          <button className="btn btn-primary btn-lg btn-block"
                  type="submit" disabled={game.status !== GameStatus.STARTED}>
            {this.getLabel()}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game,
  }
};

export default connect(mapStateToProps, { guess })(Keypad);
