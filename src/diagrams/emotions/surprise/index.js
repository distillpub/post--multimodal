import React from 'react'
import { Surface, Text } from '../../reactComponents/ui'
import dseImage from './dse.png'
import featureVis from './featureVis.png'
import poseFacet from './pose.png'
import { getEmotion } from '../../reactComponents/helpers'

const neuronIndex = 2478

const textFeatureVis = [
  'when shocked eyes are placed perfectly after the scare ! via',
  'shocked surprised // 📷: trend perfectbeats framing horror :',
  'omg ! uluftheshocked # cofhalloween',
]

const fvSize = 180
const imgFitCell = {
  objectFit: 'cover',
  width: '100%',
  maxHeight: '100%',
}

export default () => (
  <React.Fragment>
    <Surface
      display="grid"
      gridGap={8}
      width="fit-content"
      gridTemplateColumns={`repeat(3, [col] ${fvSize}px) [dse] 400px`}
      gridTemplateRows={`[labels] 30px [row] ${fvSize}px [labels] 50px [row] auto`}
      margin="auto"
    >
      <div
        style={{
          gridColumn: 'col 1',
          gridRow: 'labels 1',
          borderBottom: '1px solid #aaa',
        }}
      >
        Feature Vis
      </div>
      <div
        style={{
          gridColumn: 'col 2',
          gridRow: 'labels 1',
          borderBottom: '1px solid #aaa',
        }}
      >
        Face Facet
      </div>
      <div
        style={{
          gridColumn: 'col 3',
          gridRow: 'labels 1',
          borderBottom: '1px solid #aaa',
        }}
      >
        Pose Facet
      </div>
      <div
        style={{
          gridColumn: 'dse',
          gridRow: 'labels 1',
          borderBottom: '1px solid #aaa',
        }}
      >
        Dataset Examples
      </div>
      <img
        src={getEmotion(neuronIndex, 'pose', 0)}
        style={{
          ...imgFitCell,
          borderRadius: 5,
          gridColumn: 'col 1',
          gridRow: 'row 1',
        }}
      />
      <img
        src={getEmotion(neuronIndex, 'face', 8)}
        style={{
          ...imgFitCell,
          borderRadius: 5,
          gridColumn: 'col 2',
          gridRow: 'row 1',
        }}
      />
      <img
        src={getEmotion(neuronIndex, 'pose', 8)}
        style={{
          ...imgFitCell,
          borderRadius: 5,
          gridColumn: 'col 3',
          gridRow: 'row 1',
        }}
      />
      <img
        style={{
          display: 'block',
          gridColumn: 'dse',
          gridRow: 'row 1 / -1',
          ...imgFitCell,
        }}
        src={dseImage}
      />

      <div
        style={{
          gridColumn: 'col 1 / dse',
          gridRow: 'labels 2',
          borderBottom: '1px solid #aaa',
          marginTop: 20,
        }}
      >
        Text Feature Visualization
      </div>
      <div style={{ gridRow: 'row 2', gridColumn: 'col 1 / dse' }}>
        {textFeatureVis.map((text) => (
          <div>{text}</div>
        ))}
      </div>
    </Surface>
    <figcaption style={{ width: 704, margin: 'auto', marginTop: 10 }}>
      The shocked neuron learns to detect emotions of surprise in a wide variety
      of settings, including children, animals, and memes. Notice that it
      detects a woman's expression of surprise even when most of her face is
      obscured. The pose facet shows someone expressing surprise from different
      and the face facet shows a close-up of shock.
    </figcaption>
  </React.Fragment>
)
