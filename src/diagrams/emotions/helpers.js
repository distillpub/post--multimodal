import { isNumber } from 'lodash'
const width = 128
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
  Incarcerated: 1551,
  Blocked: 2041,
  Coffee: 730,
  'Accept / Appoint': 599,
}
export const getEmotion = (name, facet, strength) => {
  const path = `${
    isNumber(name) ? name : nameToNeuron[name]
  }_${facet}_RN50_4x_${strength}_${width}.png`
  return `https://storage.googleapis.com/clarity-public/ggoh/facets_multiscale/${path}`
}
