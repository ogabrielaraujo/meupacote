import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as SQLite from 'expo-sqlite'
import SvgUri from 'expo-svg-uri'
import { SafeAreaView } from 'react-native-safe-area-context'

import useData from 'hooks/useData'
import List from 'components/List'
import Add from 'components/Add'

const db = SQLite.openDatabase('database.db')

export default function Home() {
  const { status, packages, setPackages } = useData()

  useEffect(() => {
    // create table
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists items (id integer primary key not null, name text, code text);'
      )
      tx.executeSql('select * from items', [], (_, { rows: { _array } }) =>
        setPackages(_array)
      )
    })
  }, [])

  return (
    <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
      <SvgUri
        width="100"
        height="100"
        source={require('assets/package.svg')}
        style={styles.icon}
      />

      <Text style={styles.title}>meu pacote</Text>

      <Add />

      {packages && status && (
        <View style={styles.list}>
          <List list={status} />
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginTop: 30,
    marginBottom: 30,
  },
  title: {
    color: '#333',
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 30,
  },
  list: {
    flex: 1,
    alignSelf: 'stretch',
  },
})
