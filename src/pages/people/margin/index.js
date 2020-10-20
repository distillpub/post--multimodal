import React from 'react'
import { Surface, Text } from '../../reactComponents/ui'
import jesusPose from './jesus-pose.png'
import jesusFv from './jesus-fv.png'
import hitlerFv from './hitler-fv.png'
import hitlerPose from './hitler-pose.png'
import spidermanFv from './spiderman-fv.png'
import spidermanPose from './spiderman-pose.png'

const imgWidth = 90
const Row = ({ title, first, img1, img2, cap1, cap2 }) => (
  <Surface flexFlow="row" marginBottom={first && 5}>
    <Surface>
      <img
        style={{ borderRadius: 5 }}
        width={imgWidth}
        height={imgWidth}
        src={img1}
      />
      <figcaption>{cap1}</figcaption>
    </Surface>
    <Surface marginLeft={5}>
      <img
        style={{ borderRadius: 5 }}
        width={imgWidth}
        height={imgWidth}
        src={img2}
      />
      <figcaption>{cap2}</figcaption>
    </Surface>
  </Surface>
)

export default () => (
  <div style={{ gridColumn: '12 / 14' }}>
    <Row
      title="Jesus"
      img1={jesusFv}
      img2={jesusPose}
      cap1="Jesus"
      cap2="Baby Jesus"
      first
    />
    <Row
      title="Hitler"
      img1={hitlerPose}
      img2={hitlerFv}
      cap1="Nazi Salute"
      cap2="Nazi Insignias"
    />
    {false && (
      <Row
        title="Spiderman"
        img1={spidermanFv}
        img2={spidermanPose}
        cap1="Spiderman Symbols"
        cap2="Hero in Suit"
      />
    )}
  </div>
)
