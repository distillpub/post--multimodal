import cofab from '../cofab'
import { Surface, HoverZoom, ZoomedImg, Text } from '../reactComponents/ui'
import { range, min, max, capitalize, sortBy, includes } from 'lodash'
import React, { useState } from 'react'

export default cofab(({ buckets }) => {
  console.log('buckets', buckets)
  const keys = Object.keys(buckets).map((i) => +i)
  const cols = range(min(keys), max(keys))
  const w = 128

  return (
    <Surface flexFlow="row" flexWrap="wrap" width={1600}>
      {cols.map((i) => {
        const images = buckets[i.toString() + '.0'] || []

        return (
          <Surface
            border="1px solid rgba(0, 0, 0, 0.2)"
            padding={10}
            width={600}
          >
            <Text>
              min {min(images.map(({ value }) => value)).toFixed(2)} max{' '}
              {max(images.map(({ value }) => value)).toFixed(2)}
            </Text>
            <Surface flexFlow="row" flexWrap="wrap">
              {images.slice(0, 50).map(({ value, center, path }) => (
                <Surface position="relative" width={w} height={w}>
                  <Surface
                    position="absolute"
                    left={center[1] * 100 + '%'}
                    top={center[0] * 100 + '%'}
                    background="red"
                    width={3}
                    height={3}
                  />
                  <img width={w} height={w} src={path} />
                  <Text fontSize={10} opacity={0.7}>
                    activation {value.toFixed(1)}
                  </Text>
                </Surface>
              ))}
            </Surface>
          </Surface>
        )
      })}
    </Surface>
  )
})
