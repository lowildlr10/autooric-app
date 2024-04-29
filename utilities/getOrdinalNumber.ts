const getOrdinalNumber = (intValue: number) => {
  if (intValue === 0) return 'Not set'

  const suffixes = ['th', 'st', 'nd', 'rd']
  const v = intValue % 100
  return intValue + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0])
}

export default getOrdinalNumber
