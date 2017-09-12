import React, {PropTypes} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text
} from 'react-native';
import MapView from 'react-native-maps';

// Redux
import {bindActionCreators} from 'redux';
import * as appActions from './actions/actions';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window');

const LATITUDE_DELTA = 0.00000894375;
const LONGITUDE_DELTA = 0.0000894375;

class AdventureMap extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      regionState: new MapView.AnimatedRegion({
        latitude: 40.741895,
        longitude: -73.989308,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
      currentUserMovements: new MapView.AnimatedRegion({
        latitude: 40.741895,
        longitude: -73.989308,
      }),
    }
    this.testing = {
      latitude: 40.741895,
      longitude: -73.989308,
    }
    this.getUserCoordinates = this.getUserCoordinates.bind(this);
  }

  getUserCoordinates(event) {
    const {actions} = this.props;
    let coordinate = event.coordinate;
    actions.userCoordinates(coordinate);
  }

  followCamera() {
    const {currentUserMarker} = this.refs;
    const {actions} = this.props;

    if(typeof(currentUserMarker) !== 'undefined') {
      this.testing = {
        latitude: currentUserMarker.props.coordinate.longitude._value,
        longitude: currentUserMarker.props.coordinate.latitude._value,
      };
    }
  }

  render() {
    const {userCoordinates} = this.props;
    const {regionState, currentUserMovements} = this.state;

    regionState.timing({
      latitude: userCoordinates.latitude === 0 ? 40.741895 : userCoordinates.latitude,
      longitude: userCoordinates.longitude === 0 ? -73.989308 : userCoordinates.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
      duration: 3000,
    }).start();

    currentUserMovements.timing({
      latitude: userCoordinates.latitude === 0 ? 40.741895 : userCoordinates.latitude,
      longitude: userCoordinates.longitude === 0 ? -73.989308 : userCoordinates.longitude,
      duration: 15000,
    }).start();

    return (
      <View style={styles.container}>
        <MapView.Animated style={styles.map}
          region={regionState, {tilt: 90,}}
          loadingEnabled={true}
          zoomEnabled={false}
          maxZoomLevel={20}
          rotateEnabled={true}
          onRegionChange={this.followCamera()}
          onPress={(e)=>{this.getUserCoordinates(e.nativeEvent)}}
        >

          <MapView.Marker.Animated
            ref='currentUserMarker'
            coordinate={currentUserMovements}
          >

          </MapView.Marker.Animated>

        </MapView.Animated>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

AdventureMap.propTypes = {
  actions: PropTypes.object.isRequired,
  userCoordinates: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    userCoordinates: state.UserCoordinates,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdventureMap);
