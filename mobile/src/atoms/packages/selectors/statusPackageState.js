import { selector } from 'recoil'

import api from 'services/api'
import { packageState } from 'atoms/packages'

async function loadPackage() {}

export const statusPackageState = selector({
  key: 'statusPackageState',
  get: async ({ get }) => {
    let _packages = get(packageState)

    if (typeof _packages !== 'object') {
      return _packages
    }

    if (_packages.length === 0) {
      return _packages
    }

    const packageList = _packages.map(function (pack) {
      return pack.code
    })

    try {
      const response = await api.get(`/codes/?codes=${packageList.join('|')}`)

      if (response.status === 200) {
        return response.data
      }

      return { error: 'Não foi possível encontrar os pacotes' }
    } catch (error) {
      return { error }
    }

    console.log(response.data)
  },
})
