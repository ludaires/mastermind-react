import React from 'react';
import { connect } from 'react-redux';

const heartStyle = {
  color: '#e25555',
};

class Footer extends React.Component {
  render() {
    return (
      <footer className="my-5 pt-5 text-muted text-center text-small">
        <p className="mb-1">Made with <span style={heartStyle}>&#9829;</span> by Ludmilla</p>
        <ul className="list-inline">
          <li className="list-inline-item"><a href="https://github.com/ludaires/mastermind-react">Github</a></li>
          <li className="list-inline-item"><a href="mailto:ludaires@gmail.com">Contact</a></li>
        </ul>
      </footer>
    )
  }
}

export default connect()(Footer);
