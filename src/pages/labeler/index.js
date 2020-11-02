import React, { useState, useEffect } from 'react'
import cofab from '../cofab'
import { Surface, HoverZoom, ZoomedImg, Text } from '../reactComponents/ui'
import randomIndexes from './randomIndexes_1317'
import { range, shuffle, flatten } from 'lodash'

const labels = [
  'place name',
  'people names',
  'flags',
  'ethnicity',
  'other regional',
  'foreign symbol',
  'other',
]

const initialState =
  typeof window === 'undefined'
    ? {}
    : JSON.parse(localStorage.getItem('labels') || '{}')

export default cofab(({ buckets }) => {
  const allImages = flatten(Object.values(buckets))
  console.log('all images are', allImages)

  const [allLabels, setAllLabels] = useState(initialState)
  const [activeLabel, setActiveLabel] = useState(labels[0])

  const setLabel = (index, whichLabel) => {
    const newLabels = {
      ...allLabels,
      [index]: allLabels[index] === whichLabel ? '' : whichLabel,
    }

    setAllLabels(newLabels)
    localStorage.setItem('labels', JSON.stringify(newLabels))
  }

  const onBack = () => {
    setIndex(index - 1)
  }

  const w = 228
  const upgrade = (url) => url.split('.png')[0] + '_v7.png'

  return (
    <div>
      <h2>
        {Object.keys(allLabels).map((s) => s.trim().length > 0).length} /{' '}
        {allImages.length}
      </h2>
      <Surface position="fixed" right={20} top={20}>
        {labels.map((text) => (
          <Text
            marginX={5}
            fontWeight={activeLabel === text ? 600 : 400}
            onClick={() => setActiveLabel(text)}
          >
            {text}
          </Text>
        ))}
      </Surface>

      <Surface flexFlow="row" flexWrap="wrap" width={1200}>
        {randomIndexes
          .map((index) => ({ ...allImages[index], index }))
          .map(({ value, center, path, index }) => {
            return (allLabels[index] || '').trim().length > 0 ? (
              false
            ) : (
              <Surface
                position="relative"
                width={w}
                height={w}
                margin={5}
                onClick={() => setLabel(index, activeLabel)}
              >
                <Surface
                  position="absolute"
                  left={center[1] * 100 + '%'}
                  top={center[0] * 100 + '%'}
                  background="red"
                  width={3}
                  height={3}
                />
                <img width={w} height={w} src={upgrade(path)} />
                <Text
                  position="absolute"
                  bottom={5}
                  left={5}
                  fontSize={14}
                  fontWeight={600}
                  color="white"
                  fontFamily="arial"
                  textShadow="1px 1px black"
                >
                  {allLabels[index] || ''}
                </Text>
              </Surface>
            )
          })}
      </Surface>
    </div>
  )
})
