import { isNumber } from 'lodash'
const width = 128
// const width = 288
const nameToNeuron = {
  Shocked: 2478,
  Crying: 1193,
  Happy: 1512,
  Sleepy: 91,
  Evil: 1739,
  Punishment: 1719,
  Serious: 2049,
  'Soft smile': 52,
  Destroyed: 979,
  Erotic: 1543,
  // Incarcerated: 1551,
  Incarcerated: 2297,
  Blocked: 2041,
  Coffee: 730,
  'Accept / Appoint': 599,
  Trump: 89,
  Jesus: 1777,
  Hitler: 309,
  Spiderman: 550,
  'Question Mark': 2202,
}

export const getEmotionNeuron = (name, facet, strength) => {
  return nameToNeuron[name]
}

export const getEmotion = (name, facet, strength) => {
  const path = `${
    isNumber(name) ? name : nameToNeuron[name]
  }_${facet}_RN50_4x_${strength}_${width}.png`
  return `https://storage.googleapis.com/clarity-public/ggoh/facets_multiscale/${path}`
}
