import React, { useState, useRef } from 'react';
import { StyleSheet, View, PanResponder } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Picker } from '@react-native-picker/picker';

const Uebungen = () => {
  const [path, setPath] = useState('');
  const [color, setColor] = useState('black');
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
    <View style={styles.container}> 
      <View style={styles.drawingArea} {...panResponder.panHandlers}>
        <Svg height="100%" width="100%">
          <Path d={path} fill="none" stroke={color} strokeWidth="5" />
        </Svg>
      </View>

      <View style={styles.colorPickerContainer}>
        <Picker style={styles.picker}
          selectedValue={color}
          onValueChange={(itemValue) => setColor(itemValue)}>
          <Picker.Item label="Black" value="black" />
          <Picker.Item label="Red" value="red" />
          <Picker.Item label="Blue" value="blue" />
          {/* Add more colors */}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'row', // Arrange children in a row
    justifyContent: 'start',
    backgroundColor: 'white'
  },
  drawingArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  picker: {
    width: '100%', 
    height: '100%', 
  },
  colorPickerContainer: {
    width: 70, 
    justifyContent: 'top', 
    height: 50,
    backgroundColor: '#f0f0f0', 
    borderWidth: 1,
    borderColor: '#ddd', 
  },
});


export default Uebungen;
