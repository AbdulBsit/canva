import React, {useRef, useContext, createRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import ECard from './ECard';
import TextInputScreen from '../components/TextInputScreen';
import useActions from '../canvasState/Action';
import {CanvasContext} from '../canvasState/Store';
const ECardScreen = () => {
  const {loadTemplate} = useActions();
  const [editPannel, setEditPannel] = useState(null);
  const [textScreen, setTextScreen] = useState(false);
  useEffect(() => {
    loadTemplate({
      backgroundImage: {
        uri: null,
        style: {resizeMode: 'contain', flex: 1},
      },

      style: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 0,
        borderColor: '#000000',
        borderRadius: 0,
      },
      components: {
        id1: {
          type: 'text',
          style: {
            zIndex: 2,
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          },
          position: {x: -10.581741333007812, y: 417.49365234375},

          value: ' I am Centered',
        },
        id2: {
          type: 'text',
          style: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          },
          position: {x: -13.789215087890625, y: 121.59564208984375},
          value: ' I am Centered',
        },
        id3: {
          type: 'image',
          style: {
            zIndex: 2,
            width: '40%',
            height: '40%',
          },
          position: {
            x: 300,
            y: 50,
          },

          uri:
            'https://static-news.moneycontrol.com/static-mcnews/2019/01/uri-770x433.jpg',
        },
      },
    });
  }, []);
  const renderAddPannel = () => {
    return (
      <View style={styles.panel}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setTextScreen(true)}>
          <MaterialCommunityIcons
            style={styles.panelIcon}
            name="format-text"
            size={30}
          />
          <Text style={styles.panelText}>Add Text</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => Alert.alert('ADD Background Image')}>
          <Icon style={styles.panelIcon} name="image" size={30} />
          <Text style={styles.panelText}>Add Background Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => Alert.alert('opens color picker')}>
          <MaterialCommunityIcons
            style={styles.panelIcon}
            name="brush"
            size={30}
          />
          <Text style={styles.panelText}>Color</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderEditPannel = (type, id) => {
    switch (type) {
      case 'text':
        return (
          <View style={styles.panel}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setTextScreen(true)}>
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
  if (textScreen) {
    return (
      <TextInputScreen
        onClose={() => setTextScreen(false)}
        editId={editPannel?.id ?? null}
      />
    );
  }

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => setEditPannel(null)}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => setEditPannel(null)}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              elevation: 5,
              borderRadius: 1,
              margin: 15,
            }}>
            <ECard
              setTextScreen={setTextScreen}
              editPannel={editPannel}
              setEditPannel={setEditPannel}
            />
          </View>
        </TouchableWithoutFeedback>
        {editPannel
          ? renderEditPannel(editPannel.type, editPannel.id)
          : renderAddPannel()}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ECardScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  panel: {
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
