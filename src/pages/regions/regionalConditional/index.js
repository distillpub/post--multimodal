import React from 'react'
import cofab from '../../cofab'

import { Surface, Text } from '../../reactComponents/ui'
import { includes, range, reverse, sum } from 'lodash'
import {
  VictoryArea,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryChart,
  VictoryGroup,
  VictoryStack,
} from 'victory'
import data1257 from './africa_1257.json'
import data1317 from './africa_1317.json'

const data = {
  1257: data1257,
  1317: data1317,
}

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
    const { neuron } = this.props

    let {
      bins = [],
      heights = [],
      interpolation = 'catmullRom',
      title = '',
      labelCounts,
      labelNames = [],
      stackProps = {},
      children,
      yAxisProps = {
        label: '',
      },
      probChart = false,
    } = data[neuron || 1317]
    console.log('heights are', heights)

    if (typeof window === 'undefined') {
      return null
    }

    ;`[(0, 'Non-African Person'),
      (1, 'Non-African Symbol'),
      (2, 'Non-African Celebrity'),
      (3, 'Meme'),
      (4, 'Other'),
      (5, 'Tobacco'),
      (6, 'Weapon'),
      (7, 'Africa Word'),
      (8, 'Dark Non-Person'),
      (9, 'Person of African Descent')]`

    /*
    const labelColors = {
      'foreign symbol': '#7acda3',
      other: '#b2ebf2',
      flags: 'rgb(236,99,55)', //	#ff7171',
      'other regional': '#ffa77d',
      'place name': '#e03400',
      // 'people names': '#ff5722',
      ethnicity: '#ff7f50',
    }
    */

    const labelColors = {
      'foreign symbol': '#7acda3',
      other: '#b2ebf2',
      flags: '#ff5722',
      'other regional': '#ffa77d',
      'place name': '#e03400',
      // 'people names': '#ff5722',
      ethnicity: '#ff7f50',
    }

    const colors = labelNames.map((label) => labelColors[label])

    const width = 1300
    const { activeGroups } = this.state
    const isGroupActive = (group) => includes(activeGroups, group)
    const hasActiveGroup = activeGroups.length > 0

    if (probChart) {
      yAxisProps.tickFormat = (t) => `${t.toExponential()}`
      yAxisProps.dy = -30
      stackProps.domain = { y: [0, 0.0000022] }
    }

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

    // ["place name", "flags", "ethnicity", "other regional", "foreign symbol", "other"]

    const stackIndexes = [0, 1, 2, 3, 5, 4]

    return (
      <figure className="fullscreen-diagram">
        <Surface width={width} margin="auto">
          <Surface flexFlow="row" marginLeft={60}>
            <Group name="Non-Africa">
              <Label index={4}>Foreign Symbol</Label>
            </Group>
            <Group name="Neutral">
              <Label index={5}>Other</Label>
            </Group>
            <Group name="African">
              <Label index={0}>Place Name</Label>
              <Label index={1}>Flags</Label>
              <Label index={2}>Ethnicity</Label>
              <Label index={3}>Other Regional</Label>
            </Group>
          </Surface>
          <Surface
            width={width}
            alignSelf="center"
            transform="translateY(-20px)"
          >
            <VictoryChart width={width} height={400} {...stackProps}>
              <VictoryStack
                colorScale={stackIndexes.map(
                  (index) => labelColors[labelNames[index]]
                )}
                // interpolation={interpolation}
                // interpolation="none"
                animate={{
                  duration: 800,
                }}
              >
                {stackIndexes.map((index) => {
                  const height = heights[index]
                  console.log(
                    'index is',
                    index,
                    'height is',
                    height,
                    'heights len',
                    heights
                  )
                  const isZero = hasActiveGroup && !isGroupActive(index)
                  const victoryData = bins
                    .map((binValue, bin) => {
                      if (isZero) return { y: 0, x: binValue }
                      return { x: binValue, y: height[bin] }
                    })
                    .filter((i) => i !== null)

                  const addInterpolation = interpolation
                    ? { interpolation }
                    : {}

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
              <VictoryAxis
                crossAxis={false}
                tickCount={17}
                label="Activations"
              />

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
            We labeled more than 400 images that causes a neuron that most
            strongly responds to the word “Ghana” to fire at different levels of
            activation, without access to how much each image caused the neuron
            to fire while labeling. It fires most strongly for people of African
            descent as well as African words like country names. It’s pre-ReLU
            activation is negative for symbols associated with other countries,
            like the Tesla logo or British flag, as well as people of
            non-African descent. Many of its strongest negative activations are
            for weaponry such as military vehicles and handguns. Ghana, the
            country name it responds to most strongly, has a Global Peace Index
            rating higher than most African countries, and perhaps it learns
            this anti-association.
          </figcaption>
        </Surface>
      </figure>
    )
  }
}
