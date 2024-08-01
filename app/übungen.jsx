import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Modal, FlatList } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const { height, width } = Dimensions.get('window');
const colors = ['red', 'blue', 'green', 'yellow', 'black', 'purple', 'orange', 'pink'];

export default () => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [isEraser, setIsEraser] = useState(false);
  const [color, setColor] = useState('red');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onTouchEnd = () => {
    if (currentPath.length > 0) {
      setPaths([...paths, { path: currentPath, color, isEraser }]);
      setCurrentPath([]);
    }
  };

  const onTouchMove = (event) => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    const newPoint = `${currentPath.length === 0 ? 'M' : ''}${locationX.toFixed(0)},${locationY.toFixed(0)} `;
    setCurrentPath([...currentPath, newPoint]);
  };

  const handleClearButtonClick = () => {
    setPaths([]);
    setCurrentPath([]);
  };

  const toggleEraser = () => {
    setIsEraser(!isEraser);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const selectColor = (newColor) => {
    setColor(newColor);
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.svgContainer} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <Svg height={height * 0.7} width={width}>
          {paths.map((pathData, index) => (
            <Path
              key={`path-${index}`}
              d={pathData.path.join('')}
              stroke={pathData.isEraser ? 'white' : pathData.color}
              fill="transparent"
              strokeWidth={pathData.isEraser ? 10 : 3} // Larger stroke for eraser
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}
          <Path
            d={currentPath.join('')}
            stroke={isEraser ? 'white' : color}
            fill="transparent"
            strokeWidth={isEraser ? 10 : 3} // Larger stroke for eraser
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </Svg>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleClearButtonClick}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleEraser}>
          <Text style={styles.buttonText}>{isEraser ? 'Eraser' : 'Draw'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={toggleModal}>
          <Text style={styles.buttonText}>Color</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Color</Text>
            <FlatList
              data={colors}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.colorOption, { backgroundColor: item }]}
                  onPress={() => selectColor(item)}
                />
              )}
              numColumns={4}
            />
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    height: height * 0.7,
    width,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  colorOption: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 25,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
