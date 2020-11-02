import cofab from '../cofab'
import { Surface, HoverZoom, ZoomedImg, Text } from '../reactComponents/ui'
import defaultValue from './defaultValue'
import { without, min, max, capitalize, sortBy, includes } from 'lodash'
import React, { useState } from 'react'

export default cofab(({ data }) => {
  const [useIndexes, setUseIndexes] = useState(defaultValue)
  console.log('use indexes', useIndexes)

  const onActivate = (personIndex, photoIndex) => {
    const obj = Object.assign({}, useIndexes)
    console.log('activating', personIndex, photoIndex)
    if (!obj[personIndex]) {
      obj[personIndex] = []
    }

    obj[personIndex] = includes(obj[personIndex], photoIndex)
      ? without(obj[personIndex], photoIndex)
      : [...obj[personIndex], photoIndex]

    console.log('use indexes is ', obj)
    setUseIndexes(obj)
  }

  const hasPhotoIndex = (personIndex, photoIndex) =>
    useIndexes[personIndex] && includes(useIndexes[personIndex], photoIndex)

  const getImage = (person, photo) =>
    `https://storage.googleapis.com/fls/nickc/random/person${person}-photo${photo}.jpg`

  return (
    <Surface>
      {data.map(({ name, activations }, personIndex) => {
        return (
          <React.Fragment>
            <h3>{name}</h3>
            <Surface flexFlow="row">
              {sortBy(
                activations.map((value, photoIndex) => ({ value, photoIndex })),
                'value'
              ).map(({ value, photoIndex }) => {
                return (
                  <Surface>
                    <img
                      width={80}
                      height={80}
                      style={{
                        margin: 5,
                        opacity: hasPhotoIndex(personIndex, photoIndex)
                          ? 0.5
                          : 1,
                      }}
                      src={getImage(personIndex, photoIndex)}
                      onClick={() => onActivate(personIndex, photoIndex)}
                    />
                    <Text>{value.toFixed(1)}</Text>
                  </Surface>
                )
              })}
            </Surface>
          </React.Fragment>
        )
      })}
    </Surface>
  )
})
