import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import * as SQLite from 'expo-sqlite'
import { useRecoilState } from 'recoil'

import api from 'services/api'
const db = SQLite.openDatabase('db55252.db')
import { packageState } from 'atoms/packages'

const Add = () => {
  const [code, setCode] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [packages, setPackages] = useRecoilState(packageState)

  useEffect(() => {
    if (code.length >= 1) {
      setEnabled(true)
    } else {
      setEnabled(false)
    }
  }, [code])

  async function handleSend() {
    if (code === '') {
      Alert.alert('Meu pacote', 'Informe um código para continuar')
      return
    }

    const response = await api.get(`?codes=${code}`)

    if (response.status !== 200) {
      Alert.alert('Meu pacote', 'Não foi possível se conectar ao servidor')
      return
    }

    if (response.data.length > 0 && response.data[0].error === 'invalid_code') {
      Alert.alert(
        'Meu pacote',
        'Código de rastreamento não encontrado nos correios'
      )
      return
    }

    Alert.prompt('Meu pacote', 'Nome do pacote', async (text) => {
      if (text.length < 3) {
        Alert.alert(
          'Meu pacote',
          'Nome do pacote deve ter ao menos 3 caracteres'
        )
        return
      }

      const inserted = await db.transaction((tx) => {
        tx.executeSql('insert into items (name, code) values (?, ?)', [
          text,
          code,
        ])
        tx.executeSql('select * from items', [], (_, { rows: { _array } }) =>
          setPackages(_array)
        )
      }, null)

      await setCode('')
    })
  }

  return (
    <View style={styles.form}>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Código de rastreamento"
        placeholderTextColor="#999"
        value={code}
        onChangeText={setCode}
        style={styles.input}
        returnKeyType="search"
        autoFocus={false}
        onSubmitEditing={handleSend}
      />

      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Feather name="search" size={22} color={enabled ? '#333' : '#F5F5F5'} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    marginBottom: 30,
    padding: 3,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  button: {
    width: 50,
    padding: 12,
  },
  icon: {
    color: 'red',
  },
})

export default Add
