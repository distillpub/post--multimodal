import React from 'react'
import { Surface, Text } from '../../reactComponents/ui'
import { includes, reverse, sum } from 'lodash'
import {
  VictoryArea,
  VictoryLine,
  VictoryAxis,
  VictoryBar,
  VictoryLabel,
  VictoryChart,
  VictoryGroup,
  VictoryStack,
} from 'victory'

const { bars, labels } = {
  bars: [
    -8.251739525508194,
    -5.90581307387962,
    -2.8712722814102123,
    -2.6697419668230493,
    -2.591057426049932,
    2.087732869811729,
    32.80438643554363,
  ],
  labels: [
    'Nelson Mandela',
    'Martin Luther King Jr.',
    'Steve Jobs',
    'Barack Obama',
    'Ted Cruz',
    'Hillary Clinton',
    'Donald Trump',
  ],
}

export default () => {
  const data = bars.map((y, index) => ({ y, x: labels[index] }))
  const width = 1200
  return (
    <Surface width={width} margin="auto">
      <Surface width={width} height={500} transform="translateY(-70px)">
        <VictoryChart domainPadding={[35, 0]}>
          <VictoryAxis
            style={{
              ticks: { stroke: 'transparent' },
              tickLabels: { fill: 'transparent' },
            }}
          />
          <VictoryAxis
            dependentAxis
            label="Standard Deviations"
            style={{
              axisLabel: { fontSize: 10 },
              tickLabels: { fontSize: 8 },
            }}
          />
          <VictoryBar
            data={data}
            labels={({ datum }) => datum.x}
            labelComponent={
              <VictoryLabel
                style={{
                  fontSize: 8,
                }}
                dy={({ datum }) => (datum.y > 0 ? -5 : 5)}
              />
            }
          />
        </VictoryChart>
      </Surface>
      <figcaption
        style={{
          width: 703,
          marginTop: -130,
          alignSelf: 'center',
        }}
      >
        To see how the Trump neuron corresponds to different individuals we
        searched the query "X giving a speech at a microphone" for various
        individuals, taking the highest magnitude activation across 74 pictures,
        and averaging them.
        <d-footnote>
          The chart here shows the results from our first try doing the search
          query, this number was based partially on a technical detail of the
          method we used for pulling the images.
        </d-footnote>
        , removing the bottom and top 3 outliers to account for errors in the
        search where images do not contain the individual.
      </figcaption>
    </Surface>
  )
}
