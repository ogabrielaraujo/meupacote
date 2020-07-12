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
import { useNavigation } from '@react-navigation/native'

import { packageState } from 'atoms/packages'
import { statusPackageState } from 'atoms/packages/selectors/statusPackageState'
import ucFirst from 'functions/ucFirst'
import findPackageNameByCode from 'functions/findPackageNameByCode'
import statusIcon from 'functions/statusIcon'

const List = ({ list, setCurrent, reference }) => {
  const [packages, setPackages] = useRecoilState(packageState)
  const status = useRecoilValue(statusPackageState)
  const navigation = useNavigation()

  function ListItem({ data }) {
    const lastTrack =
      typeof data.tracks !== 'undefined' && data.tracks.length > 0
        ? data.tracks[data.tracks.length - 1]
        : ''

    function open() {
      setCurrent(data)
      navigation.navigate('Info', { data })
    }

    return (
      <TouchableOpacity onPress={open} style={styles.listItem}>
        <Feather name={statusIcon(lastTrack.status)} size={32} color="#333" />
        <View style={styles.content}>
          <Text style={styles.code}>{findPackageNameByCode(data.code)}</Text>
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
    marginLeft: 20,
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
