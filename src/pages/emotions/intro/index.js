import React, { useState } from 'react'
import { capitalize, range, isNumber } from 'lodash'
import { microscope_url } from '../../../urls'
import { getEmotion, getEmotionNeuron } from '../../reactComponents/helpers'
import eroticFaceFacet from './eroticFaceFacet.png'
import { SegmentedControl } from 'evergreen-ui'
import { Surface, Text } from '../../reactComponents/ui'

const friendlyName = {
  Blocked: 'Rejected',
  'Price tag': 'Perplexed',
  Punishment: 'Punished',
}

const imgSize = 166

const strengths = {
  Shocked: { face: 8, pose: 8, text: 7 },
  Crying: { face: 5, pose: 5, text: 7 },
  Happy: { pose: 5 },
  Sleepy: { pose: 8 },
  Evil: { face: 4, pose: 7 },
  Punished: { face: 8, pose: 8 },
  Serious: { face: 4, pose: 4 },
  'Soft Smile': { face: 8, pose: 5 },
  'Question Mark': { face: 5, pose: 8 },
  Rejecting: { face: 8, pose: 7 },
  Incarcerated: { face: 7, pose: 3 },
  Erotic: { face: 8, pose: 5 },
}
const neurons = [
  ['Shocked', 'Crying', 'Happy', 'Sleepy'],
  ['Evil', 'Punishment', 'Serious', 'Soft smile'],
  ['Incarcerated', 'Erotic', 'Blocked', 'Question Mark'],
]

export default () => {
  const [strength, setStrength] = useState(5)
  const [showNsfw, setShowNsfw] = useState(false)
  const [facet, setFacet] = useState('face')

  const getStrength = (name) => {
    if (!strengths[name]) {
      return strength
    }

    const facetDefault = {
      text: 7,
      face: 5,
      pose: 5,
    }

    return strengths[name][facet] || facetDefault[facet]
  }

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
              // 'logo',
              // 'arch',
            ].map((label) => ({ label, value: label }))}
            value={facet}
            onChange={(value) => setFacet(value)}
          />
          {false && (
            <Surface flexFlow="row" alignItems="center">
              <div style={{ marginRight: 3 }}>
                {facet.charAt(0).toUpperCase() + facet.slice(1)} Weight
                <d-footnote>
                  Emotion neurons respond to a wide range of stimuli: facial
                  expressions, body language, words, and more. We can use{' '}
                  <a href="#faceted-feature-visualization">
                    faceted feature visualization
                  </a>{' '}
                  to see some of these different facets. In particular, the face
                  facet shows facial expressions corresponding to different
                  emotions, such as smiling, crying, or wide-eyed shock. Click
                  on any neuron to open it in Microscope to see more
                  information, including dataset examples.
                </d-footnote>
              </div>
              <input
                type="range"
                max={8}
                min={0}
                value={strength}
                onChange={(e) => setStrength(+e.target.value)}
              />
              <Text>{strength}</Text>
            </Surface>
          )}
        </Surface>
        <Surface
          gridRow="row 1 / row 3"
          borderRight="1px solid rgb(204, 204, 204)"
          gridColumn="desc"
          paddingX={10}
        >
          Emotion Neurons
          <div className="figcaption">
            Neurons which seem to primarily respond to emotions.
          </div>
        </Surface>
        <Surface
          gridRow="row 3 / -1"
          borderRight="1px solid rgb(204, 204, 204)"
          gridColumn="desc"
          paddingX={10}
        >
          Neurons with Secondary Emotion Roles
          <div className="figcaption">
            Neurons that primarily respond to something other than emotions but
            more weakly contribute to representing emotions.
          </div>
        </Surface>

        {neurons.map((row, rowIndex) =>
          row.map((neuron, colIndex) => {
            const showNsfwButton = neuron === 'Erotic' && !showNsfw

            const img = (
              <img
                src={
                  neuron === 'Erotic' && facet === 'face'
                    ? eroticFaceFacet
                    : getEmotion(neuron, facet, getStrength(neuron))
                }
                style={{
                  filter: showNsfwButton && 'blur(4px)',
                  transition: '200ms ease-in all',
                  borderRadius: 5,
                }}
              />
            )

            return (
              <Surface
                gridColumn={`col ${colIndex + 1}`}
                gridRow={`row ${rowIndex + 1}`}
                position="relative"
              >
                <Surface>
                  <a
                    style={{ borderBottom: 'none' }}
                    href={microscope_url(getEmotionNeuron(neuron))}
                    target="_blank"
                  >
                    {friendlyName[neuron] || neuron}
                  </a>
                </Surface>
                {!showNsfwButton && (
                  <a
                    style={{ borderBottom: 'none' }}
                    href={microscope_url(getEmotionNeuron(neuron))}
                    target="_blank"
                    onClick={() => {
                      if (neuron === 'Erotic' && !showNsfw) {
                        setShowNsfw(true)
                        return false
                      }
                    }}
                  >
                    {img}
                  </a>
                )}
                {showNsfwButton && (
                  <React.Fragment>
                    <Text
                      pointerEvents="none"
                      fontWeight={600}
                      color="white"
                      position="absolute"
                      zIndex={1000}
                      textShadow="1px 1px rgba(0, 0, 0, 0.8)"
                      left={10}
                      bottom={10}
                    >
                      Show NSFW
                    </Text>
                    <Surface onClick={() => setShowNsfw(true)}>{img}</Surface>
                  </React.Fragment>
                )}
              </Surface>
            )
          })
        )}
      </Surface>
      <figcaption style={{ margin: 'auto', width: 704 }}>
        There are many emotions that correspond to emotion. We can render clear
        facial expressions of each emotion using a facial facet. Some neurons
        primarily respond to an emotions, and other neurons that mostly detect
        other things contain emotions or emotional expressions as a secondary
        function.
      </figcaption>
    </figure>
  )
}
