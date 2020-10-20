import React from 'react'
import { HoverZoom, Surface, Text } from '../../reactComponents/ui'
import textNeurons from './textNeurons'
import neuronNames from './neuronNames'
import { range, capitalize, max, sortBy, includes } from 'lodash'
import { getEmotion } from '../../reactComponents/helpers'
import allSparse from './allSparse'

const data = allSparse[40]

const base = `https://storage.googleapis.com/clarity-public/ggoh/facets_multiscale_emotions_6`
const alphaLevel = '0.5'
const facet = 'face'
const sparsity = 100
export const getFace = (emotion, strength) =>
  `${base}/${capitalize(
    emotion
  )}_${facet}_True_RN50_4x_${sparsity}_${alphaLevel}_288_${strength}.png`

const emotions = data

const facetOptions = {
  // arabic text
  479: {
    facet: 'text',
    strength: 6,
  },
}

export default ({ emotionNames }) => {
  // emotionNames = Object.keys(emotions)
  const scaleEmotion = (neurons) => {
    const maxActivation = max(neurons.map(([val, index]) => val))
    return sortBy(
      neurons.map(([val, index]) => [val / maxActivation, index]),
      (_) => (_[0] > 0 ? -1000 + -_[0] : _[0])
    )
  }

  const rowCount = emotionNames.length
  const maxCols = 4
  const red = '#e63946'
  const green = '#80b918'
  const imgSize = 140

  return (
    <figure className="fullscreen-diagram">
      <div
        style={{
          margin: 'auto',
          width: 'fit-content',
          display: 'grid',
          gridTemplateColumns: `[label] auto [source] ${imgSize}px [equals] 40px repeat(${maxCols}, [sparse] ${
            imgSize + 40
          }px [add] 40px)`,
          gridTemplateRows: `[label] auto repeat(${rowCount}, [equation] auto)`,
          gridGap: 16,
        }}
      >
        <div
          style={{
            gridRow: 'label',
            gridColumn: 'source',
            paddingBottom: 4,
            borderBottom: '1px solid #ccc',
          }}
        >
          Source
        </div>

        <div
          style={{
            gridRow: 'label',
            gridColumn: `sparse 1 / add ${maxCols}`,
            paddingBottom: 4,
            borderBottom: '1px solid #ccc',
          }}
        >
          Sparse Code
        </div>

        {emotionNames.map((name, row) => {
          const gridRow = `equation ${row + 1}`
          const emotionRow = scaleEmotion(
            emotions[name].filter(
              ([_, neuron]) => !includes(textNeurons, neuron)
            )
          ).slice(0, maxCols)

          return (
            <React.Fragment>
              <div
                style={{
                  gridRow,
                  gridColumn: `source`,
                }}
              >
                <HoverZoom width={imgSize} height={imgSize}>
                  <img
                    style={{ display: 'block', borderRadius: 5 }}
                    src={getFace(name, 5)}
                  />
                </HoverZoom>
                <div className="figcaption">{name}</div>
              </div>

              <Surface
                gridRow={gridRow}
                gridColumn="equals"
                marginTop={imgSize / 2 - 10}
                fontSize={14}
                textAlign="center"
              >
                =
              </Surface>

              {emotionRow.map(([activation, neuron], col) => {
                // don't show the smallest values
                if (Math.abs(activation) < 0.05) return

                const { facet, strength } = facetOptions[neuron] || {
                  facet: 'face',
                  strength: 5,
                }

                return (
                  <React.Fragment>
                    <Surface
                      gridRow={gridRow}
                      gridColumn={`sparse ${col + 1}`}
                      display="grid"
                      gridTemplateColumns={`[img] ${imgSize}px 10px [bar] 35px`}
                      gridTemplateRows={`[main] ${imgSize}px [caption] auto`}
                    >
                      <HoverZoom>
                        <img
                          gridRow="main"
                          gridColumn="img"
                          width={imgSize}
                          height={imgSize}
                          style={{
                            width: imgSize,
                            height: imgSize,
                            borderRadius: 5,
                          }}
                          src={getEmotion(neuron, facet, strength)}
                        />
                      </HoverZoom>
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
                          background={activation > 0 ? green : red}
                          boorder="1px solid rgba(0, 0, 0, 1)"
                          opacity={0.3}
                          height={imgSize * Math.min(1, Math.abs(activation))}
                        />
                      </Surface>
                      <div
                        style={{ gridRow: 'caption', gridColumn: 'img' }}
                        className="figcaption"
                      >
                        {neuronNames[neuron]}
                      </div>
                      <div
                        style={{
                          gridRow: 'caption',
                          gridColumn: 'bar',
                        }}
                        className="figcaption"
                      >
                        {Math.abs(activation).toFixed(2)}
                      </div>
                    </Surface>

                    {col < emotionRow.length - 1 && (
                      <div
                        style={{
                          gridRow,
                          gridColumn: `add ${col + 1}`,
                          marginTop: imgSize / 2 - 10,
                          fontSize: 14,
                          textAlign: 'center',
                        }}
                      >
                        {emotionRow[col + 1][0] > 0 ? '+' : '-'}
                      </div>
                    )}
                  </React.Fragment>
                )
              })}
            </React.Fragment>
          )
        })}
      </div>
    </figure>
  )
}
