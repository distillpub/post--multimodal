import React, { useState } from 'react'
import { capitalize } from 'lodash'
import { Surface, Text } from '../ui'
import dse from './dse.png'

const getEmotion = (name) =>
  `https://storage.googleapis.com/fls/nickc/multimodal/emotions_neurons_2point3_${name}.png`

const Row = ({
  name,
  dse,
  textFeatureVis,
  isNsfw = false,
  showNsfw = false,
  onShowNsfw,
}) => {
  return (
    <React.Fragment>
      <Surface>
        <Text opacity={0.8} fontSize={24} fontWeight={500} marginTop={10}>
          {name}
        </Text>
      </Surface>
      <img src={getEmotion(name)} />
      <div>
        <img src={dse} />
      </div>
      <Surface>
        <Surface>
          {textFeatureVis.map((text) => (
            <Text>{text}</Text>
          ))}
        </Surface>
      </Surface>
    </React.Fragment>
  )
}

const textFeatureVis = [
  'silly playful pout',
  'goofy faces sticker day',
  'ksis pout ! coffee bisfw kennethree',
  'silly pout craze xd',
]

export default () => {
  return (
    <React.Fragment>
      <Surface
        display="grid"
        transform="translateX(-55px)"
        gridTemplateColumns={`140px 120px 450px 250px`}
        gridTemplateRows="auto auto auto auto"
        width={1000}
        gridGap={10}
        margin="auto"
      >
        <Text>Emotion</Text>
        <Text>Face Facet</Text>
        <Text>Dataset Examples</Text>
        <Text>Text Feature Visualization</Text>

        <Row
          name="Silly / Duckface"
          dse={dse}
          textFeatureVis={textFeatureVis}
        />
      </Surface>
    </React.Fragment>
  )
}
