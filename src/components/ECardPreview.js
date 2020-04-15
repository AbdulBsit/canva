import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Dimensions} from 'react-native';
const ECardPreview = ({item, index}, editCard) => {
  return (
    <TouchableOpacity
      onPress={() => editCard(item)}
      style={{
        width: Dimensions.get('window').width / 2 - 30,
        margin: 10,
        elevation: 10,
        backgroundColor: item?.style?.backgroundColor ?? '#ffffff',
        height: item.orientation === 'portrait' ? 260 : 130,
      }}
    />
  );
};
export default ECardPreview;
