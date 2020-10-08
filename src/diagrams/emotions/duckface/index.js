import React, { useState } from 'react'
import { Surface, Text } from '../../reactComponents/ui'
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

const textFeatureVis = []

export default () => {
  return (
    <React.Fragment>
      <Surface
        display="grid"
        transform="translateX(-55px)"
        gridTemplateColumns={`[desc] auto [face] 120px [dse] 450px [textFv] 250px`}
        gridTemplateRows="labels repeat(3, [row] auto)"
        gridGap={10}
        width="fit-content"
        margin="auto"
      >
        <div
          style={{
            borderBottom: '1px solid #aaa',
            gridColumn: 'labels 1',
            gridRow: 'face',
          }}
        >
          Face Facet
        </div>
        <div
          style={{
            borderBottom: '1px solid #aaa',
            gridColumn: 'labels 2',
            gridRow: 'dse',
          }}
        >
          Dataset Examples
        </div>
        <div
          style={{
            borderBottom: '1px solid #aaa',
            gridColumn: 'labels 3',
            gridRow: 'textFv',
          }}
        >
          Text Feature Visualization
        </div>

        <Row
          name="Silly / Duckface"
          dse={dse}
          textFeatureVis={textFeatureVis}
        />
      </Surface>
    </React.Fragment>
  )
}
