import React, {useRef, createRef, useEffect, useState} from 'react';
import {
  Animated,
  View,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  PanResponder,
  Text,
  StatusBar,
  Easing,
  TouchableOpacity,
} from 'react-native';
import DraggableText from './DraggableText';
const Canvas = ({setEditPannel}) => {
  const [state, setState] = useState({
    backgroundImage: {
      uri: null,
      style: {resizeMode: 'contain', flex: 1},
    },

    style: {
      height: '100%',
      width: '100%',
      zIndex: 99,
      backgroundColor: 'lightgreen',
      borderColor: '#000000',
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
        position: {
          x: 50,
          y: 5,
        },

        value: ' I am Centered',
      },
      id2: {
        type: 'text',
        style: {
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
        },
        position: {
          x: 50,
          y: 5,
        },

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

  return (
    <View style={[state.style, {overflow: 'hidden'}]}>
      <ImageBackground
        onPress={() => console.log('hide ')}
        source={{uri: state.backgroundImage.uri}}
        style={state.backgroundImage.style}>
        {Object.keys(state.components).map((item, index) => {
          var {components} = state;
          switch (components[item].type) {
            case 'text':
              return (
                <DraggableText
                  setEditPannel={setEditPannel}
                  type={components[item].type}
                  key={item}
                  id={item}
                  style={components[item].style}>
                  {components[item].value}
                </DraggableText>
              );
            // case 'image':
            //   return (
            //     <Animated.Image
            //       key={index}
            //       source={{uri: item.uri}}
            //       style={[
            //         item.style,
            //         {
            //           transform: [
            //             {translateX: item.position.x},
            //             {translateY: item.position.y},
            //           ],
            //         },
            //       ]}
            //     />
            //   );
          }
        })}
      </ImageBackground>
    </View>
  );
};

export default Canvas;
