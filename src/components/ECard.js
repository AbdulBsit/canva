import React, {useRef, useContext, createRef, useEffect, useState} from 'react';
import {View, ImageBackground} from 'react-native';
import {CanvasContext} from '../canvasState/Store';
import DraggableText from './DraggableText';

const ECard = ({setEditPannel, editPannel}) => {
  const [template] = useContext(CanvasContext);

  useEffect(() => {}, [Object.keys(template.components), editPannel]);
  return (
    <View style={[template.style, {overflow: 'hidden'}]}>
      <ImageBackground
        onPress={() => console.log('hide ')}
        source={{uri: template.backgroundImage.uri}}
        style={template.backgroundImage.style}>
        {Object.keys(template.components).map((item, index) => {
          var {components} = template;
          switch (components[item].type) {
            case 'text':
              return (
                <DraggableText
                  editPannel={editPannel}
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

export default ECard;
