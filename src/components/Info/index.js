import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'

const Info = ({ reference, content }) => {
  function Item({ data }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{data.locale}</Text>
        <Text>{data.status}</Text>
        <Text>{data.observation}</Text>
        <Text>{data.trackedAt}</Text>
      </View>
    )
  }

  return (
    <RBSheet
      ref={reference}
      height={620}
      minClosingHeight={200}
      openDuration={300}
      closeOnDragDown={true}
      closeOnPressMask={true}
      closeOnPressBack={true}
      keyboardAvoidingViewEnabled={true}
      customStyles={{
        container: {
          justifyContent: 'center',
          alignItems: 'center',
          padding: 15,
          paddingVertical: 0,
        },
        draggableIcon: {
          backgroundColor: '#ccc',
        },
      }}
    >
      <Text>{content.code}</Text>
      <FlatList
        data={content.tracks}
        renderItem={({ item }) => <Item data={item} />}
        keyExtractor={(item) => item.trackedAt}
      />
    </RBSheet>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
})

export default Info
