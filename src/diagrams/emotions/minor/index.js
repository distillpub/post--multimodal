import React, { useState } from 'react'
import { capitalize } from 'lodash'
import { Surface, Text } from '../ui'
import eroticDse from './erotic-dse.png'
import acceptDse from './accept-dse.png'
import priceDse from './price-dse.png'

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
        {isNsfw && !showNsfw && (
          <button style={{ marginTop: 3 }} onClick={onShowNsfw}>
            Reveal adult content
          </button>
        )}
      </Surface>
      <img src={getEmotion(name)} />

      {isNsfw && !showNsfw && (
        <Surface
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
        <div>
          <img src={dse} />
        </div>
      )}
      {isNsfw && !showNsfw && (
        <Surface
          alignItems="center"
          justifyContent="center"
          background="rgba(0, 0, 0, 0.03)"
          border="1px solid rgba(0, 0, 0, 0.2)"
        >
          <Text fontSize={14}>Contains sexual slang.</Text>
        </Surface>
      )}
      {((isNsfw && showNsfw) || !isNsfw) && (
        <Surface>
          <Surface>
            {textFeatureVis.map((text) => (
              <Text>{text}</Text>
            ))}
          </Surface>
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
          name="Erotic"
          dse={eroticDse}
          isNsfw
          onShowNsfw={() => setShowNsfw(true)}
          showNsfw={showNsfw}
          textFeatureVis={textFeatureVis.erotic}
        />
        <Row
          name="Price tag"
          dse={priceDse}
          textFeatureVis={textFeatureVis.price}
        />
        <Row
          name="Accept / Appoint"
          dse={acceptDse}
          textFeatureVis={textFeatureVis.accept}
        />
      </Surface>
    </React.Fragment>
  )
}
