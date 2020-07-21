import React from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native'

const Loading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.content}>Meu Pacote</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 25,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    fontSize: 20,
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
})

export default Loading
