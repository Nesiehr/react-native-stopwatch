// Import React Libraries
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  StatusBarIOS
} = React;

// Import NPM Libraries
var formatTime = require('minutes-seconds-milliseconds');


// React StopWatch
var StopWatch = React.createClass({

  getInitialState: function() {
    return {
      timeElapsed: 0,
      totalTimeElapsed: 0,
      running: false,
      initStartTime: 0,
      startTime: 0,
      marks: []
    }
  },

  render: function() {
    return(
      StatusBarIOS.setStyle('light-content'),
      <View style={styles.viewContainer}>
        <View style={styles.topContainer}>
          <View style={styles.timerWrapper}>
            {this.totalTimer()}
            {this.timer()}
          </View>
          <View style={styles.buttonWrapper}>
          {this.startStopButton()}
          {this.markButton()}
          {this.clearButton()}
          </View>
        </View>

        <View style={styles.bottomContainer}>
          {this.marks()}
        </View>
      </View>
    )
  },

  totalTimer: function() {
    return(
      <View>
        <Text style={styles.totalTimer}>{formatTime(this.state.totalTimeElapsed)}</Text>
      </View>
    )
  },

  timer: function() {
    return(
      <View>
        <Text style={styles.timer}>{formatTime(this.state.timeElapsed)}</Text>
      </View>
    )
  },

  startStopButton: function() {

    var startButtonStyle = this.state.running ? styles.activeButton : styles.activeButton;
    var startButtonTextStyle = this.state.running ? styles.activeButtonText : styles.activeButtonText;

    return(
      <TouchableHighlight underlayColor="#58C9B9" onPress={this.handleStartPress} style={[styles.button, startButtonStyle]}>
        <Text style={startButtonTextStyle}>
          {this.state.running ? 'Stop' : 'Start'}
        </Text>
      </TouchableHighlight>
    )
  },

  markButton: function() {
    var markButtonStyle = this.state.running ? styles.activeButton : styles.passiveButton;
    var markButtonTextStyle = this.state.running ? styles.activeButtonText : styles.passiveButtonText;

    return(
      <TouchableHighlight underlayColor="#58C9B9" onPress={this.handleMarkPress} style={[styles.button, markButtonStyle]}>
        <Text style={markButtonTextStyle}>Mark</Text>
      </TouchableHighlight>
    )
  },

  clearButton: function() {
    var clearButtonStyle = this.state.marks.length > 0 ? styles.activeButton : styles.passiveButton;
    var clearButtonTextStyle = this.state.marks.length > 0 ? styles.activeButtonText : styles.passiveButtonText;

    return (
        <TouchableHighlight underlayColor="#58C9B9" onPress={this.handleClearPress} style={[styles.button, clearButtonStyle]}>
          <Text style={clearButtonTextStyle}>Clear</Text>
        </TouchableHighlight>
    )
  },

  handleStartPress: function() {

    if(this.state.running) {
      clearInterval(this.interval);
      this.setState({running: false});
      return
    }

    this.setState({initStartTime: new Date()});
    this.setState({startTime: new Date()});

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        totalTimeElapsed: new Date() - this.state.initStartTime,
        running: true
      });
    }, 30);
  },

  handleMarkPress: function() {
    if(this.state.running) {
      var mark = this.state.timeElapsed;
      this.setState({
        startTime: new Date(),
        marks: this.state.marks.concat([mark])
      });
    }
  },

  handleClearPress: function() {
    this.setState({
      marks: []
    });
  },

  marks: function() {
    return this.state.marks.map(function(time, index) {
      var markStyle = index == 0 ? styles.firstMark : null;
      return (
        <View style={[styles.mark, markStyle]}>
          <Text style={styles.markText}>Mark {index + 1}</Text>
          <Text style={styles.markText}>{formatTime(time)}</Text>
        </View>
      )
    });
  },
});

var styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#58C9B9',
  },
  topContainer: {
    flex: 5,
  },
  bottomContainer: {
    flex: 4,
  },
  timerWrapper: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  totalTimer: {
    fontSize: 20,
    fontFamily: 'HelveticaNeue-Light',
    fontWeight: '200',
    color: '#ddf4f1',
  },
  timer: {
    fontSize: 60,
    fontFamily: 'HelveticaNeue-Light',
    fontWeight: '200',
    color: '#F8F8FF',
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    borderColor: '#FAFAFA',
  },
  activeButtonText: {
    color: '#FAFAFA',
  },
  passiveButton: {
    borderColor: '#9aded5',
  },
  passiveButtonText: {
    color: '#9aded5',
  },
  mark: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#9aded5',
    paddingTop: 5,
    paddingBottom: 5,
  },
  firstMark: {
    borderTopWidth: 2,
  },
  markText: {
    color: '#FAFAFA',
    fontSize: 20,
  },
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);
