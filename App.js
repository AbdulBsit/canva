import React, {useRef, createRef, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ECardScreen from './src/components/ECardScreen';
import {StateProvider} from './src/canvasState/Store';
import ECardList from './src/components/ECardList';

const App = () => {
  const [showList, setShowList] = useState(true);
  const [templateData, setTemplateData] = useState(null);
  const editCard = data => {
    setTemplateData(data);
    setShowList(false);
  };
  const backButton = () => {
    setTemplateData([]);
    setShowList(true);
  };
  if (showList) {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 25}}>Choose Template</Text>
        <ECardList editCard={editCard} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingBottom: 10,
          paddingTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{textAlign: 'center', marginRight: 75}}
          onPress={backButton}>
          <Text style={{fontSize: 18}}>Back</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 25}}>Edit Template</Text>
      </View>
      <StateProvider>
        {/* template data will pass through navigation param in app */}
        <ECardScreen templateData={templateData} />
      </StateProvider>
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    padding: 5,
    flex: 1,
    justifyContent: 'center',
  },
});
