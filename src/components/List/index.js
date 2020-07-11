import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRecoilState, useRecoilValue } from 'recoil'

import { packageState } from 'atoms/packages'
import { statusPackageState } from 'atoms/packages/selectors/statusPackageState'

const List = ({ list, setCurrent, reference }) => {
  const [packages, setPackages] = useRecoilState(packageState)
  const status = useRecoilValue(statusPackageState)

  function ucFirst(string) {
    if (typeof stripe === 'undefined') return string

    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  function findNameByCode(code) {
    const find = packages.find((el) => el.code === code)

    if (!find.name) {
      return ''
    }

    return find.name
  }

  function ListItem({ data }) {
    const lastTrack =
      typeof data.tracks !== 'undefined' && data.tracks.length > 0
        ? data.tracks[data.tracks.length - 1]
        : ''

    function open() {
      setCurrent(data)
      reference.current.open()
    }

    return (
      <TouchableOpacity onPress={open} style={styles.listItem}>
        <Feather name="map-pin" size={24} color="#333" />
        <View style={styles.content}>
          <Text style={styles.code}>{findNameByCode(data.code)}</Text>
          <Text style={styles.status}>{ucFirst(lastTrack.status)}</Text>
          <Text style={styles.locale}>{ucFirst(lastTrack.locale)}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      data={list}
      renderItem={({ item }) => <ListItem data={item} />}
      keyExtractor={(item) => item.code}
    />
  )
}

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 15,
  },
  code: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  status: {
    color: '#333',
    fontSize: 15,
    marginBottom: 5,
  },
  locale: {
    color: '#333',
  },
})

export default List
