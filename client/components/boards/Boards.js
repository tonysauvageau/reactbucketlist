import React from 'react';
import Form from '../Form';
import Board from './Board';

class Boards extends React.Component {
  constructor(props) {
    super(props);
    this.state = { boards: [] }
  }

  componentDidMount() {
    $.ajax({
      url: '/boards',
      type: 'GET'
    }).done( boards => {
      this.setState({ boards });
    });
  }

  addBoard = (name) => {
    $.ajax({
      url: '/boards',
      type: 'POST',
      data: { name }
    }).done( board => {
      this.setState({ boards: [...this.state.boards, board] });
    });
  }

  updateBoard = (board) => {
    let { _id, name } = board;
    $.ajax({
      url: `/boards/${_id}`,
      type: 'PUT',
      data: { name }
    }).done( board => {
      let boards = this.state.boards.map( b => {
        if (b._id === _id)
          return board
        return b
      });

      this.setState({ boards });
    });
  }

  deleteBoard = (id) => {
    $.ajax({
      url: `/boards/${id}`,
      type: 'DELETE'
    }).done( () => {
      this.setState({ boards: this.state.boards.filter( b => b._id !== id ) });
    });
  }

  render() {
    let boards = this.state.boards.map( board => {
      return (
        <Board
          key={board._id}
          deleteBoard={this.deleteBoard}
          updateBoard={this.updateBoard}
          {...board}
        />
      )
    });

    return (
      <div>
        <Form add={this.addBoard} placeholer="Add Board" />
        <div className="row">
          { boards }
        </div>
      </div>
    )
  }
}

export default Boards;













