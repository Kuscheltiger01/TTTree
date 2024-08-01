import React, { useState, useRef } from 'react';
import { StyleSheet, View, PanResponder } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Uebungen = () => {
  const [path, setPath] = useState('');
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        const { locationX, locationY } = evt.nativeEvent;
        setPath(`M${locationX},${locationY}`);
      },
      onPanResponderMove: (evt, gestureState) => {
        const { locationX, locationY } = evt.nativeEvent;
        setPath(prevPath => `${prevPath} L${locationX},${locationY}`);
      },
      onPanResponderRelease: () => {
        // Optionally handle when touch ends
      },
    })
  ).current;

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.drawingArea} {...panResponder.panHandlers}>
        <Svg height="100%" width="100%">
          <Path d={path} fill="none" stroke="black" strokeWidth="5" />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawingArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Uebungen;
