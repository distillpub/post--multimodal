import React, { useState } from "react"
import { Surface, Text } from "../../reactComponents/ui"
// import duckfaceDse from './duckface-dse.png'
import Row from "./row"

const neurons = { erotic: 1543, accept: 599, price: 1825 }

export default () => {
  return (
    <figure className='fullscreen-diagram'>
      <Surface
        display='grid'
        transform='translateX(-55px)'
        gridTemplateColumns={`[desc] auto [face] 120px [dse] 450px [textFv] 250px`}
        gridTemplateRows='[labels] auto repeat(3, [row] auto)'
        gridGap={10}
        width='fit-content'
        margin='auto'
      >
        <div
          style={{
            borderBottom: "1px solid #aaa",
            gridColumn: "face",
            gridRow: "labels",
          }}
        >
          Face Facet
        </div>
        <div
          style={{
            borderBottom: "1px solid #aaa",
            gridColumn: "dse",
            gridRow: "labels",
          }}
        >
          Dataset Examples
        </div>
        <div
          style={{
            borderBottom: "1px solid #aaa",
            gridColumn: "textFv",
            gridRow: "labels",
          }}
        >
          Text Feature Visualization
        </div>
        <Row
          name='Duckface'
          neuron={1692}
          dse={duckfaceDse}
          row={0}
          textFeatureVis={[
            "silly playful pout",
            "goofy faces sticker day",
            "ksis pout ! coffee bisfw kennethree",
            "silly pout craze xd",
          ]}
        />
      </Surface>
    </figure>
  )
}
