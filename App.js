import React from 'react'
import { StatusBar } from 'react-native'
import { RecoilRoot } from 'recoil'

import Routes from './src/routes'
import Loading from 'components/Loading'
import Network from 'components/Network'

console.disableYellowBox = true

export default function App() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<Loading />}>
        <Network>
          <Routes />
        </Network>

        <StatusBar
          barStyle="dark-content"
          backgroundColor="#fff"
          networkActivityIndicatorVisible={true}
          translucent={true}
        />
      </React.Suspense>
    </RecoilRoot>
  )
}
