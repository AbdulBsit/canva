import React, {useRef, useContext, createRef, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import ColorPalette from 'react-native-color-palette';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import ECard from './ECard';
import {colors} from '../constant';
import TextInputScreen from '../components/TextInputScreen';
import useActions from '../canvasState/Action';
import {CanvasContext} from '../canvasState/Store';
const ECardScreen = () => {
  const [template] = useContext(CanvasContext);
  const {
    loadTemplate,
    editBackgroundImage,
    editBackgroundColor,
    updateFontStyle,
  } = useActions();

  const [colorPicker, setColorPicker] = useState(null);
  const [sizeRenderer, setSizeRenderer] = useState(null);
  const [colorsArray, setColorsArray] = useState(colors);
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
  useEffect(() => {}, [template]);

  const handleBackgroundImage = () => {
    // open gallery to chooose photo
    Alert.alert('Uploaded Image');
    editBackgroundImage(
      'https://cdn.zeebiz.com/sites/default/files/styles/zeebiz_850x478/public/2019/01/17/69037-uri.jpg',
    );
  };
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
        <TouchableOpacity style={styles.icon} onPress={handleBackgroundImage}>
          <Icon style={styles.panelIcon} name="image" size={30} />
          <Text style={styles.panelText}>Add Background Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setColorPicker({pickerFor: 'background'})}>
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
  const renderSizeSlider = () => {
    return (
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>Font Size</Text>
        <Slider
          thumbTintColor="blue"
          style={{width: 280, height: 40}}
          onValueChange={value =>
            updateFontStyle(editPannel?.id ?? null, {fontSize: parseInt(value)})
          }
          value={template.components[editPannel?.id ?? null].style.fontSize}
          minimumValue={20}
          step={1}
          maximumValue={100}
          minimumTrackTintColor="blue"
          maximumTrackTintColor="#000000"
        />
        <Text style={{fontWeight: 'bold', fontSize: 18}}>
          {template.components[editPannel?.id ?? null].style.fontSize}px
        </Text>
      </View>
    );
  };
  const renderColorPicker = pickerFor => {
    // set color if for background
    if (pickerFor === 'background') {
      return (
        <ScrollView
          style={{
            paddingTop: 10,
            height: 80,
            backgroundColor: 'white',
          }}
          horizontal={true}>
          <ColorPalette
            style={{flexDirection: 'row', margin: 10}}
            onChange={color => editBackgroundColor(color)}
            value={template.style.backgroundColor}
            title={null}
            colors={colorsArray}
            icon={<Entypo name={'circle'} size={25} color={'white'} />}
          />
        </ScrollView>
      );
    } else {
      return (
        <ScrollView
          style={{
            paddingTop: 10,
            height: 80,
            backgroundColor: 'white',
          }}
          horizontal={true}>
          <ColorPalette
            style={{flexDirection: 'row', margin: 10}}
            onChange={color => updateFontStyle(editPannel?.id ?? null, {color})}
            value={template.style.backgroundColor}
            title={null}
            colors={colorsArray}
            icon={<Entypo name={'circle'} size={25} color={'white'} />}
          />
        </ScrollView>
      );
    }
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
              onPress={() => setSizeRenderer(true)}>
              <AntDesign style={styles.panelIcon} name="arrowsalt" size={30} />
              <Text style={styles.panelText}>Size</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.icon}
              onPress={() => setColorPicker({pickerFor: 'text'})}>
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
  const handleReset = () => {
    setSizeRenderer(false);
    setColorPicker(null);
    setEditPannel(null);
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
    <TouchableWithoutFeedback onPress={() => setEditPannel(null)}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handleReset}>
          <View style={styles.card}>
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
        {sizeRenderer && renderSizeSlider()}
        {colorPicker && renderColorPicker(colorPicker?.pickerFor)}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ECardScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f0f0f0',
  },
  panel: {
    flexGrow: 1,
    height: 'auto',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  card: {
    flexShrink: 1,
    borderWidth: 1,

    height: 'auto',
    borderColor: 'lightgrey',
    borderRadius: 1,
    margin: 15,
  },
  panelText: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingBottom: 4,
  },
  icon: {
    paddingTop: 15,
    paddingLeft: 22,
    marginRight: 22,
    alignItems: 'center',
  },
});
