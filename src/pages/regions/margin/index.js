import React from 'react'
import { Surface, Text } from '../../reactComponents/ui'
import butterknife from './butterknife.png'
import smallAfrican from './small.png'

const imgWidth = 120

export default () => (
  <div style={{ gridColumn: '12 / 14' }}>
    <Surface flexFlow="row" marginBottom={5}>
      <img
        style={{ borderRadius: `5px 0px 0px 5px` }}
        width={imgWidth}
        height={imgWidth}
        src={butterknife}
      />
      <img
        style={{ borderRadius: `0px 5px 5px 0px` }}
        width={imgWidth}
        height={imgWidth}
        src={smallAfrican}
      />
    </Surface>
    <figcaption style={{ width: imgWidth * 2 }}>
      The neuron recognizes small drawings of people in the background or in a
      butter knife.
    </figcaption>
  </div>
)
