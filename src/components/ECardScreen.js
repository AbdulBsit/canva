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
  const [aligner, setAligner] = useState(false);
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
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          },
          position: {x: -10.581741333007812, y: 417.49365234375},

          value: 'Test',
        },
        id2: {
          type: 'text',
          style: {
            fontSize: 20,
            textAlign: 'center',
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
  const handleAddComponentOpener = state => {
    // set all state to null or false
    setTextScreen(false);
    setColorPicker(null);

    switch (state) {
      case 'text':
        setTextScreen(true);
        break;
      case 'color':
        setColorPicker({pickerFor: 'background'});
        break;
      default:
        return;
    }
  };
  const renderAddPannel = () => {
    return (
      <View style={styles.panelView}>
        <View style={styles.panel}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleAddComponentOpener('text')}>
            <MaterialCommunityIcons
              style={[
                styles.panelIcon,
                {color: textScreen ? 'green' : 'black'},
              ]}
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
            onPress={() => handleAddComponentOpener('color')}>
            <MaterialCommunityIcons
              style={[
                styles.panelIcon,
                {
                  color: colorPicker ? 'green' : 'black',
                },
              ]}
              name="brush"
              size={30}
            />
            <Text
              style={[
                styles.panelText,
                {
                  color: colorPicker ? 'green' : 'black',
                },
              ]}>
              Color
            </Text>
          </TouchableOpacity>
        </View>
        {colorPicker && renderColorPicker(colorPicker?.pickerFor)}
      </View>
    );
  };
  const renderTextAligner = () => {
    return (
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              updateFontStyle(editPannel?.id ?? null, {
                textAlign: 'left',
              })
            }>
            <MaterialCommunityIcons
              style={[
                styles.alignIcons,
                {
                  color:
                    template.components[editPannel.id].style.textAlign ===
                    'left'
                      ? 'blue'
                      : 'black',
                },
              ]}
              name="format-align-left"
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              updateFontStyle(editPannel?.id ?? null, {
                textAlign: 'center',
              })
            }>
            <MaterialCommunityIcons
              style={[
                styles.alignIcons,
                {
                  color:
                    template.components[editPannel.id].style.textAlign ===
                    'center'
                      ? 'blue'
                      : 'black',
                },
              ]}
              name="format-align-center"
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              updateFontStyle(editPannel?.id ?? null, {
                textAlign: 'right',
              })
            }>
            <MaterialCommunityIcons
              style={[
                styles.alignIcons,
                {
                  color:
                    template.components[editPannel.id].style.textAlign ===
                    'right'
                      ? 'blue'
                      : 'black',
                },
              ]}
              name="format-align-right"
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderSizeSlider = () => {
    return (
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          alignItems: 'center',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Font Size</Text>
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
  const handleTextEditOpener = state => {
    // set all false then set State as per state
    setSizeRenderer(null); // for size render
    setColorPicker(null); // for color picker
    setTextScreen(null); // for text screen
    setAligner(false); //for aligner
    //state can be size, edit, color,align,fontFamily
    switch (state) {
      case 'size':
        // set size to true
        setSizeRenderer(true);
        break;
      case 'textScreen':
        setTextScreen(true);
        break;
      case 'color':
        setColorPicker({pickerFor: 'text'});
        break;
      case 'aligner':
        setAligner(true);
        break;
    }
  };
  const renderTextEditPannel = id => {
    return (
      <View style={styles.panelView}>
        <View style={styles.panel}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleTextEditOpener('textScreen')}>
            <Icon
              style={styles.panelIcon}
              name="edit"
              size={30}
              color={textScreen ? '#1fed59' : 'black'}
            />
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
            onPress={() => handleTextEditOpener('size')}>
            <AntDesign
              style={styles.panelIcon}
              name="arrowsalt"
              size={30}
              color={sizeRenderer ? '#1fed59' : 'black'}
            />
            <Text
              style={[
                styles.panelText,
                {color: sizeRenderer ? '#1fed59' : 'black'},
              ]}>
              Size
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleTextEditOpener('color')}>
            <MaterialCommunityIcons
              style={styles.panelIcon}
              name="brush"
              size={30}
              color={colorPicker ? '#1fed59' : 'black'}
            />
            <Text
              style={[
                styles.panelText,
                {color: colorPicker ? '#1fed59' : 'black'},
              ]}>
              Color
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleTextEditOpener('aligner')}>
            <MaterialCommunityIcons
              style={styles.panelIcon}
              name="format-align-center"
              size={30}
              color={aligner ? '#1fed59' : 'black'}
            />
            <Text
              style={[
                styles.panelText,
                {color: aligner ? '#1fed59' : 'black'},
              ]}>
              Align
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: 'white'}}>
          {sizeRenderer && renderSizeSlider()}
          {aligner && renderTextAligner()}
          {colorPicker && renderColorPicker(colorPicker?.pickerFor)}
        </View>
      </View>
    );
  };
  const renderEditPannel = (type, id) => {
    switch (type) {
      case 'text':
        return renderTextEditPannel(id);
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
    </View>
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
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 8,
    paddingBottom: 5,
    borderColor: 'lightgrey',
    borderBottomWidth: 0.4,
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
  panelView: {
    borderTopWidth: 1,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderColor: 'lightgrey',
    flexDirection: 'column',
    bottom: 0,
    alignSelf: 'center',
    backgroundColor: 'white',
    position: 'absolute',
  },
  alignIcons: {
    paddingLeft: 40,
    paddingRight: 40,
  },
});
