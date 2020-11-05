import cofab from '../../cofab'
import { Surface, HoverZoom, ZoomedImg, Text } from '../../reactComponents/ui'
import { uniq } from 'lodash'
import React, { useState } from 'react'
import labels from './labels'
import images from './images'

export default () => {
  const w = 128

  const classes = uniq(Object.values(labels))

  return (
    <Surface flexFlow="row" flexWrap="wrap" width={1600}>
      {classes.map((klass) => (
        <Surface>
          <Text fontSize={18}>{klass}</Text>
          <Surface flexFlow="row" flexWrap="wrap" width={600}>
            {Object.keys(labels)
              .filter((index) => labels[+index] === klass)
              .map((index) => (
                <img
                  src={images[+index].path}
                  width={80}
                  height={80}
                  style={{ margin: 3 }}
                />
              ))}
          </Surface>
        </Surface>
      ))}
    </Surface>
  )
}
