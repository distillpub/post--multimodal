import React from 'react'
import { capitalize } from 'lodash'
import { Surface, Text } from '../ui'

const getEmotion = (name) =>
  `https://storage.googleapis.com/fls/nickc/multimodal/emotions_neurons_2point3_${name}.png`

const friendlyName = {
  'Accept / Appoint': 'Accepting an Offer',
  Blocked: 'Rejecting',
  'Price tag': 'Perplexed',
  Punishment: 'Punished',
}

const common = ['Shocked', 'Crying', 'Happy', 'Sleepy'].map((name) => ({
  name,
}))
const common2 = ['Evil', 'Punishment', 'Serious', 'Soft smile'].map((name) => ({
  name,
}))

const nuanced = [
  'Destroyed',
  'Erotic',
  'Blocked',
  'Accept / Appoint',
].map((name) => ({ name }))

const imgSize = 180
const Emotion = ({ name, detail }) => (
  <Surface margin={3}>
    <Text marginLeft={5} fontSize={14} fontWeight={500}>
      {friendlyName[name] || name}
    </Text>
    <Text>{detail || ''}</Text>
    <img
      style={{ borderRadius: 5 }}
      width={imgSize}
      height={imgSize}
      src={getEmotion(name)}
    />
  </Surface>
)

const Row = ({ name, emotions }) => {
  return (
    <React.Fragment>
      <Text opacity={0.8} fontSize={12} fontWeight={500} marginTop={10}>
        {name}
      </Text>
      {emotions.map((emotion) => (
        <Emotion {...emotion} />
      ))}
    </React.Fragment>
  )
}

export default () => (
  <React.Fragment>
    <Surface
      display="grid"
      transform="translateX(-55px)"
      gridTemplateColumns={`140px repeat(4, ${imgSize}px)`}
      gridTemplateRows="auto auto auto"
      gridGap={2}
      margin="auto"
      width={900}
    >
      <Row name="Common Emotions" emotions={common} />
      <Row name="" emotions={common2} />
      <Row name="Nuanced Emotions" emotions={nuanced} />
    </Surface>
    <figcaption style={{ margin: 'auto', width: 704 }}>
      Using facial facets we can render clear images of facial expressions using
      emotion neurons.
    </figcaption>
  </React.Fragment>
)
