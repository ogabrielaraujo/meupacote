import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native'
import * as SQLite from 'expo-sqlite'
import { useRecoilState, useRecoilValue } from 'recoil'
import SvgUri from 'expo-svg-uri'

import List from 'components/List'
import Info from 'components/Info'
import Add from 'components/Add'

import { packageState } from 'atoms/packages'
import { statusPackageState } from 'atoms/packages/selectors/statusPackageState'

const db = SQLite.openDatabase('db55252.db')

export default function Home() {
  const refList = useRef()

  const [packages, setPackages] = useRecoilState(packageState)
  const status = useRecoilValue(statusPackageState)

  const [current, setCurrent] = useState({})

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
    <SafeAreaView style={styles.container}>
      <SvgUri
        width="100"
        height="100"
        source={require('assets/package.svg')}
        style={styles.icon}
      />

      <Text style={styles.title}>meu pacote</Text>

      <Add />

      {packages && (
        <ScrollView style={styles.list}>
          <List list={status} setCurrent={setCurrent} reference={refList} />
        </ScrollView>
      )}

      {current && <Info reference={refList} content={current} />}
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
