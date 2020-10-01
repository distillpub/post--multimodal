import React from 'react'
import textNeurons from './textNeurons'
import neuronNames from './neuronNames'
import { range, max, sortBy, includes } from 'lodash'
import data from './data'

export const getFace = (emotion) =>
  `https://storage.googleapis.com/fls/nickc/multimodal/emotions_alpha3/${emotion.toLowerCase()}.png`

export const getNeuronFace = (neuron) =>
  `https://storage.googleapis.com/fls/nickc/multimodal/emotions_neurons_2point3_${neuron}.png`

const { emotions } = data
export default ({ emotionNames }) => {
  const scaleEmotion = (neurons) => {
    const maxActivation = max(neurons.map(([val, index]) => val))
    return sortBy(
      neurons.map(([val, index]) => [val / maxActivation, index]),
      (_) => -_[0]
    )
  }

  const rowCount = emotionNames.length
  const colCount = 5

  return (
    <div
      style={{
        margin: 'auto',
        width: 'fit-content',
        display: 'grid',
        gridTemplateColumns: `[label] auto [source] 80px [equals] auto repeat(${colCount}, [sparse] 80px [add] auto)`,
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
          gridColumn: `sparse 1 / add ${colCount}`,
          paddingBottom: 4,
          borderBottom: '1px solid #ccc',
        }}
      >
        Sparse Code
      </div>

      {emotionNames.map((name, row) => {
        const gridRow = `equation ${row + 1}`
        return (
          <React.Fragment>
            <div
              style={{
                gridRow,
                gridColumn: `source`,
              }}
            >
              <img
                style={{ display: 'block', borderRadius: 5 }}
                src={getFace(name)}
              />
              <div className="figcaption">{name}</div>
            </div>

            <div
              style={{
                gridRow,
                gridColumn: `equals`,
                margin: `30px 10px 0px 10px`,
              }}
            >
              =
            </div>

            {scaleEmotion(
              emotions[name].filter(
                ([_, neuron]) => !includes(textNeurons, neuron)
              )
            ).map(([activation, neuron], col) => {
              return (
                <React.Fragment>
                  <div
                    style={{
                      gridRow,
                      gridColumn: `sparse ${col + 1}`,
                    }}
                  >
                    <img
                      style={{ display: 'block', borderRadius: 5 }}
                      src={getNeuronFace(neuronNames[neuron])}
                    />
                    <div className="figcaption">{neuronNames[neuron]}</div>
                  </div>

                  {col < colCount - 1 && (
                    <div
                      style={{
                        gridRow,
                        gridColumn: `add ${col + 1}`,
                        marginTop: 30,
                      }}
                    >
                      +
                    </div>
                  )}
                </React.Fragment>
              )
            })}
          </React.Fragment>
        )
      })}
    </div>
  )
}
