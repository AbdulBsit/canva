import React, {forwardRef, useContext, useEffect} from 'react';
import {View, ImageBackground} from 'react-native';
import {CanvasContext} from '../canvasState/Store';
import DraggableText from './DraggableText';

const ECard = ({setEditPannel, editPannel}) => {
  const [template] = useContext(CanvasContext);

  useEffect(() => {}, [editPannel, template]);
  return (
    <View style={[template.style, {overflow: 'hidden'}]}>
      <ImageBackground
        resizeMode={template.backgroundImage.resizeMode}
        onPress={() => console.log('hide ')}
        source={require('../assets/border.png')}
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
                  id={item}>
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
