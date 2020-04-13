/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Dimensions, View, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const ColorCircle = ({color, onChange, selected}) => {
  return (
    <TouchableOpacity
      onPress={() => onChange(color)}
      style={{
        elevation: 5,
        backgroundColor: color,
        margin: 5,
        height: 30,
        width: 30,
        justifyContent: 'center',
        borderRadius: 15,
        marginLeft: 10,
        marginRightL: 10,
      }}>
      {selected === color && (
        <MaterialCommunityIcons name="circle-outline" color="white" size={30} />
      )}
    </TouchableOpacity>
  );
};

export default function ColorPicker({selected = '#000000', onChange}) {
  const [colorArray, setColorArray] = useState([
    '#000000',

    '#bada55',
    '#ff0000',
    '#ffd700',
    '#420420',
    '#5ac18e',
  ]);
  const moreColorsArray = [
    '#c0c0c0',
    '#ffffff',
    '#d3ffce',
    '#800080',
    '#000080',
    '#ff4040',
    '#00ff7f',
    '#6897bb',
    '#ff00ff',
    '#40e0d0',
    '#c39797',
    '#133337',
    '#daa520',
    '#333333',
    '#f5f5dc',
    '#8b0000',
    '#ccff00',
    '#f5f5f5',
    '#66cccc',
    '#ff4040',
  ];
  const [moreColors, setMoreColors] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        marginTop: 10,
        justifyContent: 'center',

        alignItems: 'center',
        marginBottom: 10,
        width: Dimensions.get('window').width,
      }}>
      <View style={{flexDirection: 'row', margin: 5, marginBottom: 0}}>
        {colorArray.map((item, index) => (
          <ColorCircle
            key={index}
            selected={selected}
            onChange={onChange}
            color={item}
          />
        ))}
        <TouchableOpacity
          onPress={() => setMoreColors(!moreColors)}
          style={{marginLeft: 10, marginRight: 10, alignSelf: 'center'}}>
          <MaterialCommunityIcons name="dots-horizontal" size={30} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          margin: 5,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
        {moreColors &&
          moreColorsArray.map((item, index) => (
            <ColorCircle
              key={index}
              selected={selected}
              onChange={onChange}
              color={item}
            />
          ))}
      </View>
    </View>
  );
}
