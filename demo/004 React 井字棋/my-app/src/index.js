import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        style={this.props.highlightStyle}
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  highlightDots(i) {
    if (this.props.winDots.length && this.props.winDots.indexOf(i) > -1) {
      return { background: "green" };
    }
    return {};
  }

  renderSquare(i) {
    let style = this.highlightDots(i);
    return (
      <Square
        key={i}
        highlightStyle={style}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let board = [];
    let rows = [];
    let index = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        index = i * 3 + j;
        rows.push(this.renderSquare(index));
      }
      board.push(
        <div className="board-row" key={i}>
          {rows}
        </div>
      );
      rows = [];
    }
    return (
      <div>
        <div>{board}</div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          thatCol: 0,
          thatRow: 0,
          active: false,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      toggle: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // 当前点行列获取
    const col = Math.floor(i % 3) + 1;
    const row = Math.floor(i / 3) + 1;

    // 注意这里实际获取的是赢家名 X 或者 O 或者 null
    const isWin = calculateWinner(squares).isWin;
    if (isWin || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          thatCol: col,
          thatRow: row,
          active: false,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    let history = this.state.history;

    // 设置当前步加粗
    history.forEach((i) => {
      i.active = false;
    });
    history[step].active = true;

    this.setState({
      history: history,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  // 只改变顶级变量
  toggleMoves() {
    const toggle = !this.state.toggle;
    this.setState({
      toggle: toggle,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const res = calculateWinner(current.squares);
    const isWin = res.isWin;
    const winner = res.winner;
    const dots = res.dots;
    const isDraw = res.isDraw;

    // 传入的是一个函数组件
    const moves = history.map((step, move) => {
      const desc = move
        ? `Go to move #${move} (${step.thatCol}, ${step.thatRow})`
        : "Go to game start";
      let style = {};
      if (step.active) {
        style = {
          fontWeight: 600,
        };
      }
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)} style={style}>
            {desc}
          </button>
        </li>
      );
    });

    // 历史记录排序
    moves.sort((a, b) => {
      if (this.state.toggle) {
        return b.key - a.key;
      } else {
        return a.key - b.key;
      }
    });

    let status;
    if (isWin) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    if (isDraw) {
      status = "平局！！！";
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winDots={isWin ? dots : []}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.toggleMoves()}>切换历史顺序</button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  // 将所有成功的三个点列出
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let res = {
    isWin: false,
    isDraw: false,
    winner: null,
    dots: [],
  };
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // 判断 a 是否存在，并判断 a = b = c
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      res.isWin = true;
      res.winner = squares[a];
      res.dots.push(a, b, c);
      // 返回 X 或者 O
      return res;
    }
  }
  res.isDraw = squares.every((i) => i !== null);
  return res;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
