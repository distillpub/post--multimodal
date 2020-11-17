import { Surface, HoverZoom, ZoomedImg, Text } from '../../reactComponents/ui'
import { range, capitalize, sortBy, includes } from 'lodash'
import data from './data'
import { sum, reverse, max } from 'lodash'
import * as d3 from 'd3'
import React, { useState } from 'react'

const facet = 'face'
const sparsity = 1000
//`https://storage.googleapis.com/distill-multimodal/facets_multiscale_emotions_2/${capitalize( emotion)}_face_True_RN50_4x_2000_128_${strength}.png`
// `https://storage.googleapis.com/fls/nickc/multimodal/emotions_alpha3/${emotion}.png`

const base = `https://storage.googleapis.com/distill-multimodal/facets_multiscale_emotions_6`
const alphaLevel = '0.5'
export const getFace = (emotion, strength) =>
  `${base}/${capitalize(
    emotion
  )}_${facet}_True_RN50_4x_${sparsity}_${alphaLevel}_128_${strength}.png`

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
  const [strength, setStrength] = useState(5)
  /*
  console.log('grid is', grid)
  const data = emotionNames.map((name, index) => ({
    name,
    x: grid[index][0],
    y: grid[index][1],
  }))
  */
  const totalWidth = 800 // Math.max(1200, window.innerWidth - 100) - 50
  const width = totalWidth
  const iconSize = Math.floor(width / 13)
  const mult = (x) => Math.floor(x)
  const colorCount = grid[0].components.length
  const getComponentColor = (component, opacity) => {
    const hueAdd = 91
    const hue = (360 / colorCount) * component + hueAdd
    //const color = d3.hsv(hue, 100, 100, opacity).toString()
    const color = HSVtoRGB(hue / 360, 0.7, 1)

    return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`
  }

  return (
    <figure className="fullscreen-diagram" id="figure-13">
      <Surface
        width={totalWidth}
        marginX="auto"
        marginBottom={40}
        flexFlow="row"
      >
        <Surface height={width} width={width} position="relative">
          {showSlider && (
            <React.Fragment>
              <Text>{strength}</Text>
              <input
                type="range"
                max={8}
                min={0}
                value={strength}
                onChange={(e) => setStrength(+e.target.value)}
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
                  src={getFace(name, strength)}
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
        {false && (
          <Surface>
            <div>Components</div>
            {range(grid[0].components.length).map((component) => {
              const items = reverse(
                sortBy(grid, ({ components }) => components[component])
              ).slice(0, 5)
              const green = '#80b918'
              const imgSize = 80

              return (
                <Surface flexFlow="row" alignItems="center">
                  <Surface
                    width={30}
                    height={30}
                    borderRadius={5}
                    background={getComponentColor(component, 1)}
                  />

                  {items.map(({ name, components }) => (
                    <Surface flexFlow="row">
                      <Surface>
                        <img
                          width={imgSize}
                          height={imgSize}
                          src={getFace(name, strength)}
                        />
                        <figcaption>{name}</figcaption>
                      </Surface>
                      <Surface
                        gridRow="main"
                        gridColumn="bar"
                        height={imgSize}
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <Surface
                          width={'100%'}
                          borderRadius={5}
                          background={green}
                          boorder="1px solid rgba(0, 0, 0, 1)"
                          opacity={0.3}
                          height={
                            imgSize *
                            Math.min(
                              1,
                              Math.abs(
                                components[component] /
                                  items[0].components[component]
                              )
                            )
                          }
                        />
                      </Surface>
                    </Surface>
                  ))}
                </Surface>
              )
            })}
          </Surface>
        )}
      </Surface>
      <figcaption style={{ margin: 'auto', width: 704 }}>
        <a href='#figure-13' class='figure-anchor' style={{fontWeight: 'bold'}}>Figure 13:</a> We can create an atlas <d-cite bibtex-key="carter2019activation" /> of
        complex emotions by applying non-negative matrix factorization to the
        emotion attribution vectors and using the factors to color each cell.
        The atlas resembles common feeling wheels{' '}
        <d-cite bibtex-key="willcox1982feeling" /> hand-crafted by psychologists
        to explain the space of human emotions, indicating that the vectors have
        a high-level structure that resembles emotion research in psychology.
      </figcaption>
    </figure>
  )
}
