function ucFirst(string) {
  if (typeof string === 'undefined') return string

  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default ucFirst
