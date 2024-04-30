const isValidUrl = (urlString: string) => {
  try {
    const url = new URL(urlString)

    // Additional check to exclude base64-encoded strings
    if (/^data:image\/[a-z]+;base64,/.test(urlString)) {
      return false
    }

    return true
  } catch (error) {
    return false
  }
}

export default isValidUrl
