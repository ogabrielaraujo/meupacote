import React, { createContext, useContext } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { packageState } from 'atoms/packages'
import { statusPackageState } from 'atoms/packages/selectors/statusPackageState'

const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
  const [packages, setPackages] = useRecoilState(packageState)
  const status = useRecoilValue(statusPackageState)

  return (
    <DataContext.Provider value={{ packages, setPackages, status }}>
      {children}
    </DataContext.Provider>
  )
}

export default function useData() {
  return useContext(DataContext)
}
