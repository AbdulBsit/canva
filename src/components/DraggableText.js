import React, {useRef, useState} from 'react';
import {Animated, PanResponder, Text} from 'react-native';

export default function DraggableText({
  children,
  setEditPannel,
  type,
  style,
  id,
}) {
  const [opacity, setOpacity] = useState(1);
  const [state, setState] = useState({
    backgroundImage: {
      uri: null,
      style: {resizeMode: 'contain', flex: 1},
    },

    style: {
      height: '100%',
      width: '100%',
      backgroundColor: 'blue',
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
        position: {
          x: 50,
          y: 100,
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
          y: 100,
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
  const pan = useRef(new Animated.ValueXY(state.components[id].position))
    .current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setOpacity(0.4);
        pan.setOffset({
          x: state.components[id].position.x,
          y: state.components[id].position.y,
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: pan.x,
            dy: pan.y,
          },
        ],
        {
          useNativeDriver: false,
        },
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();

        // here sets the position of element in global state
        state.components[id].position.x = pan.x._value;
        state.components[id].position.y = pan.y._value;
        setState(state);
        setOpacity(1);
        // open edit panel for text
        setEditPannel({type, id});
      },
    }),
  ).current;

  return (
    <Animated.View
      key={id}
      style={{
        width: 'auto',
        opacity,
        borderStyle: 'dashed',
        borderRadius: 1,
        borderWidth: 2,
        borderColor: 'grey',
        transform: [{translateX: pan.x}, {translateY: pan.y}],
      }}
      {...panResponder.panHandlers}>
      <Text
        style={style}
        onPress={() => {
          // handle Opening of panel
          setEditPannel({type, id});
        }}>
        {children}
      </Text>
    </Animated.View>
  );
}
