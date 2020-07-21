import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'
import NetInfo from '@react-native-community/netinfo'

const Network = ({ children }) => {
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected)
    })
  }, [])

  if (!connected) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.content}>
          Não foi possível se conectar, tente novamente mais tarde.
        </Text>
      </SafeAreaView>
    )
  }

  return <>{children}</>
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

export default Network
