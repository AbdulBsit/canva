/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useContext, createRef, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Animated,
  ScrollView,
  Easing,
  Dimensions,
  FlatList,
} from 'react-native';
import Slider from '@react-native-community/slider';
import CameraRoll from '@react-native-community/cameraroll';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import ECard from './ECard';
import {colors} from '../constant';
import TextInputScreen from '../components/TextInputScreen';
import useActions from '../canvasState/Action';
import {CanvasContext} from '../canvasState/Store';
import ColorPicker from './ColorPicker';
import ViewShot, {captureRef} from 'react-native-view-shot';
const ECardScreen = ({templateData}) => {
  const [template] = useContext(CanvasContext);
  const {
    loadTemplate,
    editBackgroundImage,
    editBackgroundColor,
    updateFontStyle,
  } = useActions();
  const viewShotRef = useRef();
  const [aligner, setAligner] = useState(false);
  const [colorPicker, setColorPicker] = useState(null);
  const [sizeRenderer, setSizeRenderer] = useState(null);
  const [editPannel, setEditPannel] = useState(null);
  const [textScreen, setTextScreen] = useState(false);
  const [fontPicker, setFontPicker] = useState(false);

  // bottom value initals , for animations
  const [addPanelAnimation, setAddPanelAnimation] = useState(
    new Animated.Value(-100),
  );
  const [editPannelAnimation, setEditPannelOpacity] = useState(
    new Animated.Value(-100),
  );
  const [sizeRendererAnimation, setSizeRendererAnimation] = useState(
    new Animated.Value(-100),
  );
  const [colorPickerAnimation, setcolorPickerAnimation] = useState(
    new Animated.Value(-100),
  );
  const [alignAnimation, setAlignAnimation] = useState(
    new Animated.Value(-100),
  );
  const [fontPickerAnimation, setFontPickerAnimation] = useState(
    new Animated.Value(-100),
  );

  useEffect(() => {
    loadTemplate(templateData);
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
        Animated.timing(colorPickerAnimation, {
          toValue: -100,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: false,
        }).reset();
        break;
      default:
        return;
    }
  };

  const renderAddPannel = () => {
    Animated.timing(addPanelAnimation, {
      duration: 400,
      toValue: 0,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    return (
      <Animated.View style={[styles.panelView, {bottom: addPanelAnimation}]}>
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
      </Animated.View>
    );
  };
  const renderTextAligner = () => {
    Animated.timing(alignAnimation, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    return (
      <Animated.View
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          alignItems: 'center',
          bottom: alignAnimation,
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
      </Animated.View>
    );
  };
  const renderSizeSlider = () => {
    Animated.timing(sizeRendererAnimation, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    return (
      <Animated.View
        style={{
          bottom: sizeRendererAnimation,
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
      </Animated.View>
    );
  };
  const renderColorPicker = pickerFor => {
    // set color if for background
    if (pickerFor === 'background') {
      Animated.timing(colorPickerAnimation, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
      return (
        <Animated.View
          style={{
            backgroundColor: 'white',
            bottom: colorPickerAnimation,
          }}>
          <ColorPicker
            selected={template.style.backgroundColor}
            onChange={color => editBackgroundColor(color)}
          />
        </Animated.View>
      );
    } else {
      Animated.timing(colorPickerAnimation, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
      return (
        <Animated.View
          style={{
            backgroundColor: 'white',
            bottom: colorPickerAnimation,
          }}>
          <ColorPicker
            selected={template.components[editPannel?.id ?? null].style.color}
            onChange={color =>
              updateFontStyle(editPannel?.id ?? null, {
                color,
              })
            }
          />
        </Animated.View>
      );
    }
  };

  const renderFontPicker = () => {
    Animated.timing(fontPickerAnimation, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    return (
      <Animated.View
        style={{
          height: 150,
          margin: 10,
          alignItems: 'center',
          backgroundColor: 'white',
          bottom: fontPickerAnimation,
        }}>
        <FlatList
          keyExtractor={(item, index) => item + index}
          style={{width: Dimensions.get('window').width}}
          data={[
            'normal',
            'notoserif',
            'sans-serif',
            'sans-serif-light',
            'sans-serif-thin',
            'sans-serif-condensed',
            'sans-serif-medium',
            'serif',
            'Roboto',
            'monospace',
          ]}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={item + index}
              onPress={() =>
                updateFontStyle(editPannel?.id ?? null, {
                  fontFamily: item,
                })
              }>
              <Text
                style={{fontFamily: item, fontSize: 18, textAlign: 'center'}}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
    );
  };

  const handleTextEditOpener = state => {
    // set all false then set State as per state
    setSizeRenderer(null); // for size render
    setColorPicker(null); // for color picker
    setTextScreen(null); // for text screen
    setAligner(false); //for aligner
    setFontPicker(false); // font picker
    //state can be size, edit, color,align,fontFamily
    switch (state) {
      case 'size':
        // set size to true
        setSizeRenderer(true);

        Animated.timing(sizeRendererAnimation, {
          toValue: -100,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: false,
        }).reset();

        break;
      case 'textScreen':
        setTextScreen(true);
        break;
      case 'color':
        Animated.timing(colorPickerAnimation, {
          toValue: -100,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: false,
        }).reset();
        setColorPicker({pickerFor: 'text'});
        break;
      case 'aligner':
        Animated.timing(alignAnimation, {
          toValue: -100,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: false,
        }).reset();
        setAligner(true);
        break;
      case 'fontPicker':
        Animated.timing(fontPickerAnimation, {
          toValue: -100,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: false,
        }).reset();
        setFontPicker(true);
    }
  };
  const renderTextEditPannel = id => {
    return (
      <Animated.View style={[styles.panelView, {bottom: editPannelAnimation}]}>
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
            onPress={() => handleTextEditOpener('fontPicker')}>
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
            <Ionicons
              style={styles.panelIcon}
              name="ios-resize"
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
          {fontPicker && renderFontPicker()}
        </View>
      </Animated.View>
    );
  };
  const renderEditPannel = (type, id) => {
    Animated.timing(editPannelAnimation, {
      duration: 500,
      toValue: 0,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();

    switch (type) {
      case 'text':
        return renderTextEditPannel(id);
    }
  };
  const handleReset = () => {
    Animated.timing(addPanelAnimation, {
      toValue: -100,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).reset();
    setFontPicker(false);
    setSizeRenderer(false);
    setColorPicker(null);
    setAligner(false);
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
  const handleEditPannel = value => {
    setEditPannel(value);
    Animated.timing(editPannelAnimation, {
      toValue: -100,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).reset();
  };

  // saves image to library
  const saveImage = async () => {
    try {
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      await PermissionsAndroid.request(permission);

      const url = await captureRef(viewShotRef.current);
      CameraRoll.saveToCameraRoll(url);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{backgroundColor: 'white', alignItems: 'center'}}
        onPress={saveImage}>
        <Text style={{color: 'green', fontSize: 20}}>Save</Text>
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={handleReset}>
        <View style={styles.card}>
          {/* height and width will be of users choice */}
          <ViewShot ref={viewShotRef} options={{height: 600, width: 400}}>
            <ECard
              setTextScreen={setTextScreen}
              editPannel={editPannel}
              setEditPannel={handleEditPannel}
            />
          </ViewShot>
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
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 1,
    margin: 15,
    marginBottom: 90,
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
