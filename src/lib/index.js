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

export const fetchCharacters = async (context) =>  {
try {
    const endpoint = context.characters.length > 0 ? context.pageInfo.next : 'https://rickandmortyapi.com/api/character'
    const blob = await fetch(endpoint)
    const { results, info, error } = await blob.json()
    if (!blob.ok) {
      return Promise.reject(error)
    }
    const characters = results.map(result => transformCharacter(result))
    return Promise.resolve({ characters, info })
  } catch (error) {
    return Promise.reject(error.message)
  }
}
