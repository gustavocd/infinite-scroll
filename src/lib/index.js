export const transformCharacter = character => {
  const {
    id,
    name,
    status,
    species,
    created,
    image,
    gender,
    origin,
    location,
  } = character
  return {
    id,
    name,
    image,
    status,
    species,
    gender,
    created,
    origin: origin.name,
    location: location.name,
  }
}

export const relativeTime = created => {
  const createdYear = new Date(created).getFullYear()
  const currentYear = new Date().getFullYear()
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  return rtf.format(createdYear - currentYear, 'year')
}
