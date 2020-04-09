import React, {useRef, createRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import Canvas from './src/components/Canvas';
const App = () => {
  const [editPannel, setEditPannel] = useState(null);
  const renderEditPannel = (type, id) => {
    console.log(id);
    switch (type) {
      case 'text':
        return (
          <View style={styles.panle}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => Alert.alert('opens text editor')}>
              <Icon style={styles.panelIcon} name="edit" size={30} />
              <Text style={styles.panelText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.icon}
              onPress={() => Alert.alert('opens font chooser')}>
              <MaterialCommunityIcons
                style={styles.panelIcon}
                name="alphabetical"
                size={30}
              />
              <Text style={styles.panelText}>Font</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.icon}
              onPress={() => Alert.alert('opens Size editor')}>
              <AntDesign style={styles.panelIcon} name="arrowsalt" size={30} />
              <Text style={styles.panelText}>Size</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.icon}
              onPress={() => Alert.alert('opens Color changer')}>
              <MaterialCommunityIcons
                style={styles.panelIcon}
                name="brush"
                size={30}
              />
              <Text style={styles.panelText}>Color</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => Alert.alert('opens Aligner')}>
              <MaterialCommunityIcons
                style={styles.panelIcon}
                name="format-align-center"
                size={30}
              />
              <Text style={styles.panelText}>Align</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <View
      style={{
        padding: 5,
        flex: 1,
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 25}}>Edit Your Canvas</Text>
      <TouchableWithoutFeedback onPress={() => setEditPannel(null)}>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            elevation: 5,
            borderRadius: 1,
            margin: 15,
          }}>
          <Canvas editPannel={editPannel} setEditPannel={setEditPannel} />
        </View>
      </TouchableWithoutFeedback>

      {editPannel && renderEditPannel(editPannel.type, editPannel.id)}
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  panle: {
    flex: 0,
    flexDirection: 'row',
    elevation: 5,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },

  panelText: {
    paddingTop: 2,
    fontWeight: 'bold',
    fontSize: 15,
    paddingBottom: 4,
  },
  icon: {
    paddingTop: 15,
    marginLeft: 22,
    marginRight: 22,
    alignItems: 'center',
  },
});
