import React, {useRef, useContext, useEffect, useState} from 'react';
import {
  Animated,
  PanResponder,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {CanvasContext} from '../canvasState/Store';
import useActions from '../canvasState/Action';
import Feather from 'react-native-vector-icons/Feather';
export default function DraggableText({
  children,
  setEditPannel,
  editPannel,
  type,
  id,
}) {
  const [editId, setEditId] = useState(editPannel ? editPannel?.id : null);
  const [opacity, setOpacity] = useState(1);
  const [template] = useContext(CanvasContext);
  const {setPosition, updateTemplate} = useActions();
  const pan = useRef(new Animated.ValueXY(template.components[id].position))
    .current;

  useEffect(() => {
    setEditId(editPannel ? editPannel?.id : null);
  }, [editPannel, editId, id, template]);

  const handleDelete = () => {
    delete template.components[id];
    updateTemplate(template);
    setEditPannel(null);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setOpacity(0.4);
        pan.setOffset({
          x: template.components[id].position.x,
          y: template.components[id].position.y,
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

        // here sets the position of element in global template
        setPosition(id, pan.x._value, pan.y._value);
        setOpacity(1);
        // open edit panel for text
        setEditPannel({type, id});
      },
    }),
  ).current;

  return (
    <Animated.View
      key={editId}
      style={{
        opacity,
        backgroundColor: editId === id ? 'lightgrey' : 'rgb(255,255,255,0)',
        borderStyle: 'dashed',
        borderRadius: 1,
        borderWidth: 2,
        zIndex: 999,
        alignSelf: 'center',
        borderColor: 'grey',
        transform: [{translateX: pan.x}, {translateY: pan.y}],
      }}
      {...panResponder.panHandlers}>
      <Text
        style={template.components[id].style}
        onPress={() => {
          // handle Opening of panel
          setEditPannel({type, id});
        }}>
        {children}
      </Text>
      {editId === id && (
        <Feather
          style={{backgroundColor: 'white', textAlign: 'center'}}
          onPress={handleDelete}
          name="trash-2"
          size={22}
        />
      )}
    </Animated.View>
  );
}
