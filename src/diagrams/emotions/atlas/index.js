import { Surface, HoverZoom, ZoomedImg, Text } from '../ui'
import { range, sortBy, includes } from 'lodash'
import data from './data'
import { sum, max } from 'lodash'
import * as d3 from 'd3'
import React, { useState } from 'react'
export const getFace = (emotion) =>
  `https://storage.googleapis.com/fls/nickc/multimodal/emotions_alpha3/${emotion}.png`

import EmotionWheel from './emotionWheel'

// const toMax = (xs) => xs.map((x) => (x + x / sum(xs)) / 2)
const toMax = (xs) => xs.map((x) => x / sum(xs))

function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t
  if (arguments.length === 1) {
    ;(s = h.s), (v = h.v), (h = h.h)
  }
  i = Math.floor(h * 6)
  f = h * 6 - i
  p = v * (1 - s)
  q = v * (1 - f * s)
  t = v * (1 - (1 - f) * s)
  switch (i % 6) {
    case 0:
      ;(r = v), (g = t), (b = p)
      break
    case 1:
      ;(r = q), (g = v), (b = p)
      break
    case 2:
      ;(r = p), (g = v), (b = t)
      break
    case 3:
      ;(r = p), (g = q), (b = v)
      break
    case 4:
      ;(r = t), (g = p), (b = v)
      break
    case 5:
      ;(r = v), (g = p), (b = q)
      break
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

// export default cofab(({ emotionNames, X, Y, grid }) => {
const showSlider = false
const { grid } = data

export default () => {
  const [hueAdd, setHueAdd] = useState(91)
  /*
  console.log('grid is', grid)
  const data = emotionNames.map((name, index) => ({
    name,
    x: grid[index][0],
    y: grid[index][1],
  }))
  */
  const iconSize = 60
  const mult = (x) => Math.floor(x)
  const colorCount = grid[0].components.length
  const getComponentColor = (component, opacity) => {
    const hue = (360 / colorCount) * component + hueAdd
    //const color = d3.hsv(hue, 100, 100, opacity).toString()
    const color = HSVtoRGB(hue / 360, 0.7, 1)

    return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`
  }

  return (
    <Surface
      width={1200}
      transform="translateX(-200px)"
      margin="20px auto"
      height={800}
      flexFlow="row"
    >
      <EmotionWheel />
      <Surface position="relative">
        {showSlider && (
          <React.Fragment>
            <Text>{hueAdd}</Text>
            <input
              type="range"
              max={360}
              min={0}
              value={hueAdd}
              onChange={(e) => setHueAdd(+e.target.value)}
            />
          </React.Fragment>
        )}
        {grid.map(({ x, y, importance, name, components }, index) => (
          <HoverZoom
            scale={3}
            position="absolute"
            left={mult(y) * (iconSize + 2)}
            top={mult(x) * (iconSize + 2)}
            width={iconSize + 2}
            height={iconSize + 2}
          >
            <Surface
              position="relative"
              width={iconSize + 2}
              height={iconSize + 2}
            >
              {toMax(components).map((value, component) => (
                <Surface
                  position="absolute"
                  left={0}
                  top={0}
                  bottom={0}
                  right={0}
                  background={getComponentColor(component, value)}
                />
              ))}
              <img
                style={{
                  position: 'absolute',
                  left: 1,
                  top: 1,
                  zIndex: 1000,
                }}
                src={getFace(name)}
                width={iconSize}
                height={iconSize}
              />
              {toMax(components).map((value, component) => (
                <Surface
                  pointerEvents="none"
                  position="absolute"
                  left={1}
                  top={1}
                  width={iconSize}
                  height={iconSize}
                  background={getComponentColor(component, value)}
                />
              ))}
              <Text
                color="white"
                position="absolute"
                textShadow="1px 1px 5px rgba(0, 0, 0, 0.9)"
                fontFamily="arial"
                fontWeight={600}
                fontSize={name.length > 8 ? 10 : 12}
                bottom={5}
                zIndex={2000}
                left={4}
              >
                {name}
              </Text>
            </Surface>
          </HoverZoom>
        ))}
      </Surface>
    </Surface>
  )
}
