// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    timerLimitInMinutes: 25,
    timeElapsedInSeconds: 0,
    isTimerRunning: false,
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      timerLimitInMinutes,
      timeElapsedInSeconds,
      isTimerRunning,
    } = this.state

    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.setState({
        timeElapsedInSeconds: 0,
      })
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({
      timerLimitInMinutes: 25,
      timeElapsedInSeconds: 0,
      isTimerRunning: false,
    })
  }

  onIncrementTimerLimit = () => {
    const {isTimerRunning} = this.state

    if (!isTimerRunning) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
        timeElapsedInSeconds: 0,
      }))
    }
  }

  onDecrementTimerLimit = () => {
    const {isTimerRunning, timerLimitInMinutes} = this.state

    if (!isTimerRunning && timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
        timeElapsedInSeconds: 0,
      }))
    }
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state

    const totalTimeInSeconds = timerLimitInMinutes * 60
    const remainingTimeInSeconds = totalTimeInSeconds - timeElapsedInSeconds

    const minutes = Math.floor(remainingTimeInSeconds / 60)
    const seconds = remainingTimeInSeconds % 60

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {timerLimitInMinutes, isTimerRunning} = this.state
    const digitalTimer = this.getElapsedSecondsInTimeFormat()

    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const timeStatus = isTimerRunning ? 'Running' : 'Paused'
    const startPauseBtn = isTimerRunning ? 'Pause' : 'Start'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="timer-container">
              <h1 className="timer">{digitalTimer}</h1>
              <p className="timer-status">{timeStatus}</p>
            </div>
          </div>
          <div className="timer-controller-container">
            <div className="controller-card">
              <button
                type="button"
                className="timer-controller-btn"
                onClick={this.onStartOrPauseTimer}
              >
                <img
                  src={startOrPauseImageUrl}
                  alt={startOrPauseAltText}
                  className="icon"
                />
                <p className="timer-controller-label">{startPauseBtn}</p>
              </button>
              <button
                type="button"
                className="timer-controller-btn"
                onClick={this.onResetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon"
                />
                <p className="timer-controller-label">Reset</p>
              </button>
            </div>
            <p className="button-label">Set Timer limit</p>
            <div className="timer-limit-container">
              <button
                type="button"
                className="timer-limit-btn"
                onClick={this.onDecrementTimerLimit}
              >
                -
              </button>
              <p className="set-minutes">{timerLimitInMinutes}</p>
              <button
                type="button"
                className="timer-limit-btn"
                onClick={this.onIncrementTimerLimit}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
