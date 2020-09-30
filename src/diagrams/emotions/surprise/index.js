import React from 'react'
import { Surface, Text } from '../ui'
import dseImage from './dse.png'
import featureVis from './featureVis.png'
import poseFacet from './pose.png'

const getEmotion = (name) =>
  `https://storage.googleapis.com/fls/nickc/multimodal/emotions_neurons_2point3_${name}.png`

const textFeatureVis = [
  'when shocked eyes are placed perfectly after the scare ! via',
  'shocked surprised // 📷: trend perfectbeats framing horror :',
  ,
  'omg ! uluftheshocked # cofhalloween',
]

const LeftCol = ({ src, name }) => {
  const w = 180
  return (
    <Surface marginX={1} position="relative" width={w} height={w}>
      <img width={w} height={w} src={src} />
      <Text
        color="white"
        position="absolute"
        textShadow="1px 1px 5px rgba(0, 0, 0, 0.9)"
        fontFamily="arial"
        fontWeight={600}
        fontSize={12}
        bottom={0}
        left={4}
      >
        {name}
      </Text>
    </Surface>
  )
}

export default () => (
  <Surface margin="auto" width={1000} flexFlow="row">
    <Surface marginRight={10}>
      <Surface flexFlow="row">
        <LeftCol src={featureVis} name="Feature Vis" />
        <LeftCol src={getEmotion('Shocked')} name="Face Facet" />
        <LeftCol src={poseFacet} name="Pose Facet" />
      </Surface>
      <figcaption style={{ marginLeft: 6, marginTop: 3 }}>
        Feature visualization using different facets.
      </figcaption>
      <Surface marginTop={50} marginLeft={10}>
        <Text fontWeight={500}>Text Feature Vis</Text>
        {textFeatureVis.map((text) => (
          <Text>{text}</Text>
        ))}
      </Surface>
    </Surface>
    <div style={{ width: 400 }}>
      <img src={dseImage} />
      <figcaption>Dataset Examples</figcaption>
    </div>
  </Surface>
)
