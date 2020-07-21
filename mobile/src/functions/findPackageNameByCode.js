import React from 'react'
import { useRecoilState } from 'recoil'
import { packageState } from 'atoms/packages'

function findPackageNameByCode(code) {
  const [packages, setPackages] = useRecoilState(packageState)

  if (typeof code === 'undefined') {
    return ''
  }

  const find = packages.find((el) => el.code === code)

  if (typeof find === 'undefined') {
    return ''
  }

  return find?.name
}

export default findPackageNameByCode
