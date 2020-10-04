import React from 'react'
import { getEmotion } from '../helpers'
import { Surface, Text } from '../ui'

const strength = 8

export default ({
  neuron,
  name,
  dse,
  textFeatureVis,
  row,
  isNsfw = false,
  showNsfw = false,
  onShowNsfw,
}) => {
  return (
    <React.Fragment>
      <Surface gridColumn="desc" gridRow={`row ${row + 1}`}>
        <div>{name}</div>
        {isNsfw && !showNsfw && (
          <button style={{ marginTop: 3 }} onClick={onShowNsfw}>
            Reveal adult content
          </button>
        )}
      </Surface>
      <img
        style={{ gridColumn: 'face', gridRow: `row ${row + 1}` }}
        // erotic
        src={getEmotion(neuron, 'face', strength)}
      />

      {isNsfw && !showNsfw && (
        <Surface
          gridColumn="dse"
          gridRow={`row ${row + 1}`}
          alignItems="center"
          justifyContent="center"
          background="rgba(0, 0, 0, 0.03)"
          border="1px solid rgba(0, 0, 0, 0.2)"
        >
          <Text fontSize={14}>
            Contains pornography and adult website logos.
          </Text>
        </Surface>
      )}
      {((isNsfw && showNsfw) || !isNsfw) && (
        <img
          style={{ gridColumn: 'dse', gridRow: `row ${row + 1}` }}
          src={dse}
        />
      )}
      {isNsfw && !showNsfw && (
        <Surface
          gridColumn="textFv"
          gridRow={`row ${row + 1}`}
          alignItems="center"
          justifyContent="center"
          background="rgba(0, 0, 0, 0.03)"
          border="1px solid rgba(0, 0, 0, 0.2)"
        >
          <Text fontSize={14}>Contains sexual slang.</Text>
        </Surface>
      )}
      {((isNsfw && showNsfw) || !isNsfw) && (
        <Surface gridColumn="textFv" gridRow={`row ${row + 1}`}>
          {textFeatureVis.map((text) => (
            <div>{text}</div>
          ))}
        </Surface>
      )}
    </React.Fragment>
  )
}
