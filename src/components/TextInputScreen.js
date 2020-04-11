import React, {useContext, useState} from 'react';
import {
  TextInput,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import useActions from '../canvasState/Action';
import {CanvasContext} from '../canvasState/Store';
export default function TextInputScreen({editId, onClose}) {
  console.log(editId);
  const [template] = useContext(CanvasContext);
  const [text, setText] = useState(
    editId ? template.components[editId].value : '',
  );

  const {updateTemplate} = useActions();
  const handleSubmit = () => {
    if (editId) {
      template.components[editId].value = text;
      updateTemplate(template);
      onClose();
    } else {
      var id = Math.trunc(Math.random() * 10000).toString();
      // add new text
      template.components[id] = {
        type: 'text',
        style: {
          fontSize: 20,
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'black',
        },
        position: {x: -13.789215087890625, y: 121.59564208984375},
        value: text,
      };
      updateTemplate(template);
      console.log(template);
      onClose();
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={{fontSize: 20}}>{editId ? 'Edit Text' : 'Add Text'}</Text>
        <TextInput
          textAlignVertical="top"
          style={{
            padding: 10,
            fontSize: 20,
            borderWidth: 1,
            margin: 20,
            marginBottom: 0,
            height: 200,
            maxHeight: 250,
          }}
          multiline={true}
          placeholder="Add Text"
          value={text}
          onChangeText={t => setText(t)}
        />
        <View style={styles.buttonView}>
          <TouchableOpacity style={{margin: 10, height: 35}} onPress={onClose}>
            <Text style={[styles.buttonText, {color: 'black'}]}>cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>{editId ? 'Update' : 'Add'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    margin: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    padding: 5,
    width: 100,
    height: 35,
    margin: 10,
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingTop: 0,
    marginBottom: 5,
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
  },
});
