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
    -9.625611675384382,
    -5.91408629395646,
    -3.774230991868668,
    -3.5219911026628052,
    -3.4263171017442122,
    -2.7519400261308506,
    -2.414980762081059,
    2.0006776400352724,
    3.045294382800795,
    4.630799489478543,
    33.009812167790386,
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
  // const neuronStd = 2.19
  const data = bars.map((y, index) => ({
    y: y,
    x: labels[index],
    index,
  }))
  const width = 1540

  return (
    <figure className="fullscreen-diagram" id="figure-3">
      <Surface width={width} margin="auto">
        <Surface
          width={width}
          transform="translate(-60px, -180px)"
          pointerEvents="none"
        >
          <VictoryChart height={200} domainPadding={[15, 4]}>
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
                    fontSize: 5,
                  }}
                  dx={({ datum }) => {
                    const diff = 5 + stdDevs[datum.index] * 5
                    return datum.y > 0 ? diff : -diff
                  }}
                />
              }
            />
            <VictoryErrorBar
              data={data}
              borderWidth={0}
              style={{
                data: {
                  stroke: 'rgba(0,0,0,0.3)',
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
              domain={[-15, 45]}
              tickCount={17}
              domainPadding={[0, 0]}
              padding={[0, 0]}
              crossAxis={false}
              dependentAxis
              label="Standard Deviations from Zero Activation"
              tickLabelComponent={<VictoryLabel dy={-7} />}
              axisLabelComponent={<VictoryLabel dy={-13} />}
              k
              style={{
                axisLabel: { fontSize: 5 },
                tickLabels: { fontSize: 4 },
              }}
            />
          </VictoryChart>
        </Surface>
        <figcaption
          style={{
            width: 703,
            marginTop: -280,
            alignSelf: 'center',
            transform: 'translateX(-60px)',
          }}
        >
          <a
            href="#figure-3"
            class="figure-anchor"
            style={{ fontWeight: 'bold' }}
          >
            Figure 3:
          </a>{' '}
          To see how the Trump neuron responds to different individuals, we
          searched the query "X giving a speech at a microphone" for various
          individuals on Google Images. We cleaned the data by hand, excluding
          photos that are not clear photos of the individual's face. The bar
          length for each individual shows the median activation of the person's
          photos in standard deviations of the neuron over the dataset, and the
          range over the bar shows the standard deviation of the activations of
          the person's photos.
        </figcaption>
      </Surface>
    </figure>
  )
}
