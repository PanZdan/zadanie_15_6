class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    }
  }

  reset() {
    this.stop();
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  }

  getFormattedTime() {
    const minutes = this.state.times.minutes;
    const seconds = this.state.times.seconds;
    const miliseconds = this.state.times.miliseconds;
    return `${pad0(minutes)}:${pad0(seconds)}:${pad0(Math.floor(miliseconds))}`;
  }
  
  start() {
    if (!this.state.running) {
      this.setState({
        running: true,
        watch: setInterval(() => this.step(), 10)
      });
    }
  }

  step() {
    if (!this.state.running) return;
    this.calculate();
  }

  calculate() {
    let minutes = this.state.times.minutes;
    let seconds = this.state.times.seconds;
    let miliseconds = this.state.times.miliseconds;

    miliseconds += 1;
    if (miliseconds >= 100) {
      seconds += 1;
      miliseconds = 0;
    }
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }

    this.setState({
      times: {
        minutes: minutes,
        seconds: seconds,
        miliseconds: miliseconds
      }
    });
  }

  stop() {
    this.setState({
      running: false
    })
    clearInterval(this.state.watch);
  }

  render() {
    return (
      <div>
        <nav class="controls">
          <button class="button" onClick={this.start.bind(this)}>Start</button>
          <button class="button" onClick={this.stop.bind(this)}>Stop</button>
          <button class="button" onClick={this.reset.bind(this)}>Reset</button>
        </nav>
        <div class="stopwatch">{this.getFormattedTime()}</div>
        <ul class="results"></ul>
      </div>
    );
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

ReactDOM.render(<Stopwatch />, document.getElementById("app"));
