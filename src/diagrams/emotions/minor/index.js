import React, { useState } from 'react'
import { capitalize } from 'lodash'
import { Surface, Text } from '../ui'
import eroticDse from './erotic-dse.png'
import { getEmotion } from '../helpers'
import acceptDse from './accept-dse.png'
import priceDse from './price-dse.png'

const strength = 8
const neurons = { erotic: 1543, accept: 599, price: 1825 }

const Row = ({
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

const textFeatureVis = {
  erotic: ['erotic pleasure virgin types ⤵ on', '# 3 sexlife 1 stroke # htc'],
  price: [
    ' looking up to fontana treasure discovering heaven 6 6 8',
    '@ aeronautics staff looking up into the heavens',
  ],
  accept: ['appointed advice - hall', 'allowed ! sans chiffons'],
}

export default () => {
  const [showNsfw, setShowNsfw] = useState(false)

  return (
    <React.Fragment>
      <Surface
        display="grid"
        transform="translateX(-55px)"
        gridTemplateColumns={`[desc] auto [face] 120px [dse] 450px [textFv] 250px`}
        gridTemplateRows="[labels] auto repeat(3, [row] auto)"
        gridGap={10}
        width="fit-content"
        margin="auto"
      >
        <div
          style={{
            borderBottom: '1px solid #aaa',
            gridColumn: 'face',
            gridRow: 'labels',
          }}
        >
          Face Facet
        </div>
        <div
          style={{
            borderBottom: '1px solid #aaa',
            gridColumn: 'dse',
            gridRow: 'labels',
          }}
        >
          Dataset Examples
        </div>
        <div
          style={{
            borderBottom: '1px solid #aaa',
            gridColumn: 'textFv',
            gridRow: 'labels',
          }}
        >
          Text Feature Visualization
        </div>
        <Row
          name="Erotic"
          neuron={neurons.erotic}
          dse={eroticDse}
          isNsfw
          onShowNsfw={() => setShowNsfw(true)}
          row={0}
          showNsfw={showNsfw}
          textFeatureVis={textFeatureVis.erotic}
        />
        <Row
          name="Price tag"
          neuron={neurons.price}
          dse={priceDse}
          row={1}
          textFeatureVis={textFeatureVis.price}
        />
        <Row
          name="Accept / Appoint"
          neuron={neurons.accept}
          dse={acceptDse}
          row={2}
          textFeatureVis={textFeatureVis.accept}
        />
      </Surface>
    </React.Fragment>
  )
}
