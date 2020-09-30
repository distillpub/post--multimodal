import React from 'react'
import data from './data'

import { Surface, Text } from '../ui'
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

    const width = 1400
    const { activeGroups } = this.state
    const isGroupActive = (group) => includes(activeGroups, group)
    const hasActiveGroup = activeGroups.length > 0

    if (probChart) {
      yAxisProps.tickFormat = (t) => `${t.toExponential()}`
      yAxisProps.dy = -30
      stackProps.domain = { y: [0, 0.0000022] }
    }

    const colorSize = 20
    const Label = ({ index, children, count }) => (
      <Surface
        cursor="pointer"
        onClick={() => {
          this.onToggleGroup(index)
        }}
      >
        {(hovering) => {
          const showActive = hovering || isGroupActive(index)

          return (
            <Surface
              flexFlow="row"
              alignItems="center"
              borderRadius={8}
              transition="100ms ease-out all"
              background={showActive && 'rgba(0,0,0,0.02)'}
              border={`1px solid rgba(0, 0, 0, ${showActive ? 0.2 : 0})`}
              width={150}
              padding={5}
            >
              <Surface
                marginRight={12}
                width={colorSize}
                height={colorSize}
                borderRadius={2}
                background={colors[index]}
                opacity={hasActiveGroup ? (isGroupActive(index) ? 1 : 0.4) : 1}
                transition="300ms ease-out all"
                border="1px solid rgba(0, 0, 0, 0.6)"
              />
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
          )
        }}
      </Surface>
    )

    return (
      <React.Fragment>
        <Surface width={width} alignSelf="center">
          <Surface
            flexFlow="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text size={600} marginLeft={60}>
              {title}
            </Text>
            <Surface
              flexFlow="row-reverse"
              marginRight={50}
              justifyContent="space-between"
              alignSelf="flex-end"
              zIndex={100}
            >
              {labelNames.map((name, index) => (
                <Label index={index} count={0}>
                  {name}
                </Label>
              ))}
            </Surface>
          </Surface>
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
          {children}
        </figcaption>
      </React.Fragment>
    )
  }
}
