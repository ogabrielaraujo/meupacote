import React from 'react'
import { Text } from 'react-native'
import { RecoilRoot } from 'recoil'

import Home from './src/pages/Home'

console.disableYellowBox = true

export default function App() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<Text>Loading...</Text>}>
        <Home />
      </React.Suspense>
    </RecoilRoot>
  )
}
