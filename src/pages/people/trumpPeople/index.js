import React from 'react'
import { Surface, Text } from '../../reactComponents/ui'
import { includes, reverse, sum } from 'lodash'
import {
  VictoryArea,
  VictoryLine,
  VictoryAxis,
  VictoryBar,
  VictoryErrorBar,
  VictoryLabel,
  VictoryChart,
  VictoryGroup,
  VictoryStack,
} from 'victory'

const { bars, labels, stdDevs } = {
  bars: [
    -8.561684734745114,
    -4.850159353317191,
    -2.7103040512293988,
    -2.4580641620235357,
    -2.3623901611049427,
    -1.6880130854915811,
    -1.3510538214417898,
    3.064604580674542,
    4.109221323440064,
    5.694726430117812,
    34.07373910842965,
  ],
  stdDevs: [
    2.42890535083609,
    1.2380608365723056,
    0.9369821525117777,
    1.488807528526534,
    1.3004884858506591,
    2.745316997253862,
    3.1040613836288222,
    2.8181082655171235,
    0.9090172393984982,
    5.341270780854624,
    4.448915402666975,
  ],
  labels: [
    'Nelson Mandela',
    'Martin Luther King Jr',
    'Jeff Bezos',
    'Steve Jobs',
    'Hitler',
    'Barack Obama',
    'Ted Cruz',
    'Hillary Clinton',
    'Steve Bannon',
    'Mike Pence',
    'Donald Trump',
  ],
}

export default () => {
  const neuronStd = 2.19
  const neuronMean = -2.33
  const zeroStd = (0 - neuronMean) / neuronStd
  const data = bars.map((y, index) => ({
    y: y + zeroStd,
    x: labels[index],
    index,
  }))
  console.log('data is', data, 'bars is', bars)
  const width = 1000

  return (
    <figure className="fullscreen-diagram">
      <Surface width={width} margin="auto">
        <Surface width={width} transform="translateY(-120px)">
          <VictoryChart domainPadding={[15, 4]}>
            <VictoryBar
              data={data}
              style={{
                data: {
                  fill: 'rgb(91 217 241)',
                },
              }}
              horizontal
              labels={({ datum }) => datum.x}
              labelComponent={
                <VictoryLabel
                  style={{
                    fontSize: 8,
                  }}
                  dx={({ datum }) => {
                    const diff = 5 + stdDevs[datum.index] * 7
                    return datum.y > 0 ? diff : -diff
                  }}
                />
              }
            />
            <VictoryErrorBar
              data={data}
              style={{
                data: {
                  stroke: 'rgba(0,0,0,0.2)',
                },
              }}
              horizontal
              errorY={(datum) => stdDevs[datum.index]}
            />
            <VictoryAxis
              crossAxis={false}
              style={{
                ticks: { stroke: 'transparent' },
                tickLabels: { fill: 'transparent' },
              }}
            />
            <VictoryAxis
              crossAxis={false}
              dependentAxis
              label="Standard Deviations from Zero Activation"
              style={{
                axisLabel: { fontSize: 7 },
                tickLabels: { fontSize: 8 },
              }}
            />
          </VictoryChart>
        </Surface>
        <figcaption
          style={{
            width: 703,
            marginTop: -120,
            alignSelf: 'center',
          }}
        >
          To see how the Trump neuron corresponds to different individuals we
          searched the query "X giving a speech at a microphone" for various
          individuals on Google Images. We cleaned the data by hand, excluding
          photos that are not clear photos of the individuals face. The bar
          length for each individual shows the median activation of the person's
          photos in standard deviations of the neuron over the dataset, and the
          range over the bar shows the standard deviation of the person's
          photos.
        </figcaption>
      </Surface>
    </figure>
  )
}
