import React, { useState } from 'react'
import { capitalize, range, isNumber } from 'lodash'
import { getEmotion } from '../../reactComponents/helpers'
import { SegmentedControl } from 'evergreen-ui'
import { Surface, Text } from '../../reactComponents/ui'

const friendlyName = {
  Blocked: 'Rejecting',
  'Price tag': 'Perplexed',
  Punishment: 'Punished',
}

const imgSize = 166

const neurons = [
  ['Shocked', 'Crying', 'Happy', 'Sleepy'],
  ['Evil', 'Punishment', 'Serious', 'Soft smile'],
  ['Incarcerated', 'Erotic', 'Blocked', 'Question Mark'],
]

export default () => {
  const [strength, setStrength] = useState(5)
  const [facet, setFacet] = useState('face')

  return (
    <figure className="fullscreen-diagram">
      <Surface
        display="grid"
        gridTemplateRows={`[settings] auto repeat(3, [row] auto)`}
        gridGap={16}
        width="fit-content"
        gridTemplateColumns={`[desc] 240px repeat(4, [col] ${imgSize}px)`}
        transform="translateX(-125px)"
        margin="auto"
        marginBottom={10}
      >
        <Surface
          gridRow="settings"
          gridColumn={'col 1 / -1'}
          flexFlow="row"
          justifyContent="space-between"
        >
          <SegmentedControl
            width={400}
            options={[
              'face',
              'pose',
              // 'nature',
              'text',
              'indoor',
              // 'logo',
              // 'arch',
            ].map((label) => ({ label, value: label }))}
            value={facet}
            onChange={(value) => setFacet(value)}
          />
          <Surface flexFlow="row" alignItems="center">
            <div style={{ marginRight: 3 }}>Pose Weight</div>
            <input
              type="range"
              max={8}
              min={0}
              value={strength}
              onChange={(e) => setStrength(+e.target.value)}
            />
          </Surface>
        </Surface>
        <Surface
          gridRow="row 1 / row 3"
          borderRight="1px solid rgb(204, 204, 204)"
          gridColumn="desc"
          paddingX={10}
        >
          Common Emotions
          <div className="figcaption">
            Emotions and expressions frequently mentioned in emotion research
            and feeling wheels.
          </div>
        </Surface>
        <Surface
          gridRow="row 3 / -1"
          borderRight="1px solid rgb(204, 204, 204)"
          gridColumn="desc"
          paddingX={10}
        >
          Nuanced Emotions
          <div className="figcaption">
            Emotions and expressions we were surprised to find represented in
            individual neurons.
          </div>
        </Surface>

        {neurons.map((row, rowIndex) =>
          row.map((neuron, colIndex) => (
            <Surface
              gridColumn={`col ${colIndex + 1}`}
              gridRow={`row ${rowIndex + 1}`}
            >
              <Surface>{friendlyName[neuron] || neuron}</Surface>
              <img
                src={getEmotion(neuron, facet, strength)}
                style={{ borderRadius: 5 }}
              />
            </Surface>
          ))
        )}
      </Surface>
      <figcaption style={{ margin: 'auto', width: 704 }}>
        There are many emotions that correspond to emotion. We can render clear
        facial expressions of each emotion using a facial facet. While many
        neurons correspond to common emotions such as happiness, crying, or
        sleepy, there are also more surprising neurons that render the
        expression of accepting an offer, or of rejecting someone. As we'll see
        later, we can verify that a neuron is looking for a given expression
        with several tools such as dataset examples, feature visualization of
        different facets, and text feature visualization.
      </figcaption>
    </figure>
  )
}
