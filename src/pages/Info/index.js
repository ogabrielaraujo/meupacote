import React, { useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
  ActionSheetIOS,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import moment from 'moment'
import { useImmer } from 'use-immer'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SQLite from 'expo-sqlite'

import useData from 'hooks/useData'
import ucFirst from 'functions/ucFirst'
import statusIcon from 'functions/statusIcon'
import findPackageNameByCode from 'functions/findPackageNameByCode'

const db = SQLite.openDatabase('db55252.db')

const Info = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const routeParams = route.params

  const { setPackages } = useData()

  const [current, setCurrent] = useImmer({
    status: '',
    code: '',
    tracks: [],
  })

  useEffect(() => {
    setCurrent((draft) => {
      let tracks = routeParams.data.tracks
      let tracksReverse = []

      for (var i = tracks.length - 1; i >= 0; i--) {
        tracksReverse.push(tracks[i])
      }

      draft.status = routeParams.data.isDelivered ? 'Entregue' : 'Em andamento'
      draft.code = routeParams.data.code
      draft.tracks = tracksReverse
    })
  }, [routeParams])

  const handleBack = () => {
    navigation.navigate('Home')
  }

  const handleOptions = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancelar', 'Deletar', 'Alterar nome do pacote'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      (index) => {
        if (index === 1) {
          handleDelete()
        } else if (index === 2) {
          handleChangeName()
        }
      }
    )
  }

  const handleChangeName = () => {
    Alert.prompt('Meu pacote', 'Digite o nome do pacote', async (text) => {
      if (text.length < 3) {
        Alert.alert(
          'Meu pacote',
          'Nome do pacote deve ter ao menos 3 caracteres'
        )
        return
      }

      const updated = await db.transaction((tx) => {
        tx.executeSql('update items SET name = ? where code = ?', [
          text,
          current.code,
        ])
        tx.executeSql('select * from items', [], (_, { rows: { _array } }) =>
          setPackages(_array)
        )
      }, null)
    })
  }

  const handleDelete = () => {
    Alert.alert(
      'Deletar',
      'Tem certeza que deseja deletar?',
      [
        {
          text: 'Deletar',
          onPress: async () => {
            const deleted = await db.transaction((tx) => {
              tx.executeSql('delete from items where code = ?', [current.code])
              tx.executeSql(
                'select * from items',
                [],
                (_, { rows: { _array } }) => setPackages(_array)
              )
            }, null)

            navigation.navigate('Home')
          },
        },
        {
          text: 'Cancelar',
          onPress: () => console.log('pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: true }
    )
  }

  const Item = ({ track }) => {
    const date = moment(track.trackedAt, moment.ISO_8601).format(
      'DD/MM/YYYY \\à\\s hh:mm:ss'
    )

    return (
      <View style={styles.track}>
        <View style={styles.trackHeader}>
          <Feather
            name={statusIcon(track.status)}
            size={32}
            color="#333"
            style={styles.icon}
          />
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.trackContent}>
          <Text style={styles.info}>{ucFirst(track.status)}</Text>
          <Text style={styles.locale}>{ucFirst(track.locale)}</Text>
          {track.observation && (
            <Text style={styles.obs}>{track.observation}</Text>
          )}
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Feather name="arrow-left" color="#000" size={24} />
        </TouchableOpacity>

        <Text style={styles.title}>{findPackageNameByCode(current.code)}</Text>

        <TouchableOpacity style={styles.button} onPress={handleOptions}>
          <Feather name="more-vertical" color="#000" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.status}>{current.status}</Text>
        <Text style={styles.code}>{current.code}</Text>
      </View>

      {current && (
        <FlatList
          style={styles.tracks}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={current.tracks}
          renderItem={({ item }) => <Item track={item} />}
          keyExtractor={(item) => item.code}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  nav: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    width: 50,
    height: 50,
    lineHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#333',
  },
  title: {
    flex: 1,
    color: '#333',
    fontSize: 19,
    marginLeft: 15,
  },
  header: {
    padding: 15,
  },
  code: {
    fontSize: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  tracks: {
    flex: 1,
    padding: 15,
    paddingTop: 5,
    alignSelf: 'stretch',
  },
  track: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  trackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'stretch',
  },
  icon: {
    color: '#333',
  },
  date: {
    color: '#777',
    textAlign: 'right',
  },
  trackContent: {
    flex: 1,
    marginTop: 15,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
  locale: {
    fontSize: 16,
    marginBottom: 5,
    color: '#444',
  },
  obs: {
    color: '#555',
    marginBottom: 10,
  },
})

export default Info
