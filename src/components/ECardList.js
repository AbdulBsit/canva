import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import ECardPreview from './ECardPreview';

export default function ECardList({editCard}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // get All templates from database

    setData([
      {
        backgroundImage: {
          uri: null,
          style: {resizeMode: 'contain', flex: 1},
        },
        title: 'Template 1',
        category: 'birthday',
        orientation: 'landscape',
        style: {
          height: '100%',
          width: '100%',
          backgroundColor: '#676789',
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
              color: '#000000',
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
              color: '#000000',
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
      },
      {
        backgroundImage: {
          uri: null,
          style: {resizeMode: 'contain', flex: 1},
        },
        title: 'Template 1',
        orientation: 'portrait',
        category: 'birthday',
        style: {
          height: '100%',
          width: '100%',
          backgroundColor: '#789977',
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
              color: '#000000',
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
              color: '#000000',
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
      },
      {
        backgroundImage: {
          uri: null,
          style: {resizeMode: 'contain', flex: 1},
        },
        orientation: 'landscape',
        title: 'Template 1',
        category: 'birthday',
        style: {
          height: '100%',
          width: '100%',
          backgroundColor: '#267268',
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
              color: '#000000',
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
              color: '#000000',
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
      },
      {
        backgroundImage: {
          uri: null,
          style: {resizeMode: 'contain', flex: 1},
        },
        orientation: 'portrait',
        title: 'Template 1',
        category: 'birthday',
        style: {
          height: '100%',
          width: '100%',
          backgroundColor: '#232322',
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
              color: '#000000',
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
              color: '#000000',
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
      },
      {
        backgroundImage: {
          uri: null,
          style: {resizeMode: 'contain', flex: 1},
        },
        title: 'Template 1',
        category: 'birthday',
        orientation: 'portrait',
        style: {
          height: '100%',
          width: '100%',
          backgroundColor: '#008756',
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
              color: '#000000',
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
              color: '#000000',
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
      },
    ]);
  }, []);

  return (
    <FlatList
      ListHeaderComponent={
        <View style={{margin: 25}}>
          <Text style={{fontSize: 24}}>Awesome Templates</Text>
        </View>
      }
      numColumns={2}
      ListEmptyComponent={<Text>Sorry No Templates </Text>}
      style={{}}
      keyExtractor={(item, index) => index}
      data={data}
      renderItem={props => ECardPreview(props, editCard)}
    />
  );
}
