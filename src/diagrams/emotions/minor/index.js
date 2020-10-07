import React, { useState } from 'react'
import { capitalize } from 'lodash'
import { Surface, Text } from '../../reactComponents/ui'
import eroticDse from './erotic-dse.png'
import acceptDse from './accept-dse.png'
import priceDse from './price-dse.png'
import Row from './row'

const neurons = { erotic: 1543, accept: 599, price: 1825 }

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
