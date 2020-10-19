import React from 'react'
import data from './data'

import { Surface, Text } from '../../reactComponents/ui'
import { includes, reverse, sum } from 'lodash'
import {
  VictoryArea,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryChart,
  VictoryGroup,
  VictoryStack,
} from 'victory'

export default class HumanLabels extends React.Component {
  state = { activeGroups: [] }

  componentWillMount() {
    if (this.props.activeGroups) {
      this.setState({ activeGroups: this.props.activeGroups })
    }
  }

  onToggleGroup = (group) => {
    const { activeGroups } = this.state

    if (activeGroups.length > 0 && activeGroups[0] === group) {
      this.setState({ activeGroups: [] })
    } else {
      this.setState({ activeGroups: [group] })
    }
  }

  render() {
    let {
      bins = [],
      heights = [],
      interpolation = 'catmullRom',
      title = '',
      labelCounts,
      labelNames = [],
      stackProps = {},
      children,
      colors,
      yAxisProps = {
        label: '',
      },
      probChart = false,
    } = data

    if (typeof window === 'undefined') {
      return null
    }

    const width = 1300
    const { activeGroups } = this.state
    const isGroupActive = (group) => includes(activeGroups, group)
    const hasActiveGroup = activeGroups.length > 0

    if (probChart) {
      yAxisProps.tickFormat = (t) => `${t.toExponential()}`
      yAxisProps.dy = -30
      stackProps.domain = { y: [0, 0.0000022] }
    }

    const colorSize = 15
    const Label = ({ index, children, count }) => (
      <Surface
        cursor="pointer"
        marginRight={10}
        onClick={() => {
          this.onToggleGroup(index)
        }}
      >
        {(hovering) => {
          const showActive = hovering || isGroupActive(index)

          return (
            <Surface padding={6} background={showActive && 'rgba(0,0,0,0.06)'}>
              <Surface
                flexFlow="row"
                alignItems="center"
                transition="100ms ease-out all"
                paddingBottom={2}
                borderBottom={`6px solid ${colors[index]}`}
              >
                <Surface>
                  <Text
                    fontFamily="Arial"
                    fontWeight={600}
                    fontSize={12}
                    lineHeight={1.2}
                  >
                    {children}
                  </Text>
                  <Text
                    fontFamily="Arial"
                    fontSize={12}
                    fontWeight={400}
                    lineHeight={1.2}
                  >
                    {labelCounts[index]} images
                  </Text>
                </Surface>
              </Surface>
            </Surface>
          )
        }}
      </Surface>
    )

    const Group = ({ name, children }) => {
      return (
        <Surface marginRight={20}>
          <Text
            fontSize={12}
            opacity={0.8}
            fontWeight={500}
            textDecoration="uppercase"
          >
            {name}
          </Text>
          <Surface flexFlow="row" transform="translateX(-6px)">
            {children}
          </Surface>
        </Surface>
      )
    }
    /*
    'Video Games + Music',
    'Black + Gay Rights',
    'non-political',
    'Political generic',
    'Political trump aligned',
    'Trump Minor',
    'Trump Text',
    'Trump Art',
    'Trump Profile',
    */

    return (
      <Surface width={width} margin="auto">
        <Surface flexFlow="row" marginLeft={60}>
          <Group name="Neutral">
            <Label index={8}>Video Games and Music</Label>
            <Label index={7}>Black and LGBT Rights</Label>
            <Label index={6}>Non-Political</Label>
            <Label index={5}>Political Generic</Label>
          </Group>
          <Group name="Related to Donald Trump">
            <Label index={4}>Trump Aligned Politics</Label>
            <Label index={3}>Partially Photo of Trump</Label>
            <Label index={2}>"Trump" Text</Label>
            <Label index={1}>Trump Related Art</Label>
            <Label index={0}>Photo of Trump</Label>
          </Group>
        </Surface>
        <Surface width={width} alignSelf="center" transform="translateY(-20px)">
          <VictoryChart width={width} height={400} {...stackProps}>
            <VictoryStack
              colorScale={colors}
              // interpolation={interpolation}
              // interpolation="none"
              animate={{
                duration: 800,
              }}
            >
              {heights.map((height, index) => {
                const isZero = hasActiveGroup && !isGroupActive(index)
                const victoryData = bins
                  .map((binValue, bin) => {
                    if (isZero) return { y: 0, x: binValue }
                    return { x: binValue, y: height[bin] }
                  })
                  .filter((i) => i !== null)

                const addInterpolation = interpolation ? { interpolation } : {}

                return (
                  <VictoryGroup data={victoryData} key={index}>
                    <VictoryArea
                      // {...addInterpolation}
                      events={[
                        {
                          target: 'data',
                          eventHandlers: {
                            onClick: () => {
                              this.onToggleGroup(index)
                            },
                          },
                        },
                      ]}
                    />
                  </VictoryGroup>
                )
              })}
            </VictoryStack>
            <VictoryAxis crossAxis={false} tickCount={17} label="Activations" />

            <VictoryAxis
              axisLabelComponent={<VictoryLabel dy={-13} />}
              tickCount={5}
              offsetX={50}
              dependentAxis
              {...yAxisProps}
            />
            <VictoryLine
              style={{
                data: { strokeWidth: 1, stroke: 'rgba(0, 0, 0, 0.6)' },
              }}
              data={[
                { x: 0, y: 1 },
                { x: 0, y: 0 },
              ]}
            />
          </VictoryChart>
        </Surface>
        <figcaption
          style={{
            width: 703,
            marginTop: -20,
            alignSelf: 'center',
          }}
        >
          We collected about 650 images that caused the Trump neuron to fire
          different amounts. In each 15 unit increment from -40 to 115 we
          sampled an equal number of images then labeled them by hand into a
          number of categories. While we labeled we could not see the
          activation. Using this dataset we can estimate the conditional
          probability of each category at each level of activation. We see that
          the higher activations of the Trump neuron are highly selective, with
          more than 90% of the images causing an activation of more than 55
          related to Donald Trump.
        </figcaption>
      </Surface>
    )
  }
}
