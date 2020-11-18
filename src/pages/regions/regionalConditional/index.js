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

import ethnicity1 from './dse/ethnicity/1.png'
import ethnicity2 from './dse/ethnicity/2.png'

const ethnicityDse = [ethnicity1, ethnicity2]

import flags1 from './dse/flags/1.png'
import flags2 from './dse/flags/2.png'

const flagsDse = [flags1, flags2]

import foreignSymbol1 from './dse/foreignSymbol/1.png'
import foreignSymbol2 from './dse/foreignSymbol/2.png'

const foreignSymbolDse = [foreignSymbol1, foreignSymbol2]

import other1 from './dse/other/1.png'
import other2 from './dse/other/2.png'

const otherDse = [other1, other2]

import otherRegional1 from './dse/otherRegional/1.png'
import otherRegional2 from './dse/otherRegional/2.png'

const otherRegionalDse = [otherRegional1, otherRegional2]

import placeName1 from './dse/placeName/1.png'
import placeName2 from './dse/placeName/2.png'

const placeNameDse = [placeName1, placeName2]

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

    const neuronStd = 1.317

    if (typeof window === 'undefined') {
      return null
    }

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

    const iconSize = 80
    const Label = ({ index, dse, children, count }) => (
      <Surface
        cursor="pointer"
        marginRight={5}
        opacity={0.8}
        width={iconSize * 2}
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
              {dse && (
                <Surface flexFlow="row">
                  {dse.slice(0, 2).map((img, imgIndex) => (
                    <div
                      style={{
                        borderBottom: '1px solid ' + colors[index],
                        borderRight: '1px solid ' + colors[index],
                        borderLeft:
                          imgIndex === 0 && '1px solid ' + colors[index],
                        width: iconSize,
                        height: iconSize,
                      }}
                    >
                      <img src={img} height={iconSize} width={iconSize} />
                    </div>
                  ))}
                </Surface>
              )}
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
      <figure className="fullscreen-diagram" id="figure-7">
        <Surface width={width} margin="auto">
          <Surface flexFlow="row" marginLeft={60}>
            <Group name="Non-Africa">
              <Label index={4} dse={foreignSymbolDse}>
                Foreign Symbol
              </Label>
            </Group>
            <Group name="Neutral">
              <Label index={5} dse={otherDse}>
                Other
              </Label>
            </Group>
            <Group name="African">
              <Label index={3} dse={otherRegionalDse}>
                Other Regional
              </Label>
              <Label index={2} dse={ethnicityDse}>
                Ethnicity
              </Label>
              <Label index={1} dse={flagsDse}>
                Flags
              </Label>
              <Label index={0} dse={placeNameDse}>
                Place Name
              </Label>
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
                  const isZero = hasActiveGroup && !isGroupActive(index)
                  const victoryData = bins
                    .map((binValue, bin) => {
                      if (isZero) return { y: 0, x: binValue / neuronStd }
                      return { x: binValue / neuronStd, y: height[bin] }
                    })
                    .filter((i) => i !== null)

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
                label="Standard Deviations from Zero Activation"
                axisLabelComponent={<VictoryLabel dy={7} />}
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
            <a
              href="#figure-7"
              class="figure-anchor"
              style={{ fontWeight: 'bold' }}
            >
              Figure 7:
            </a>{' '}
            We labeled more than 400 images that causes a neuron that most
            strongly responds to the word “Ghana” to fire at different levels of
            activation, without access to how much each image caused the neuron
            to fire while labeling. See{' '}
            <a href="#conditional-probability">the appendix</a> for details.
            <br /> It fires most strongly for people of African descent as well
            as African words like country names. It’s pre-ReLU activation is
            negative for symbols associated with other countries, like the Tesla
            logo or British flag, as well as people of non-African descent. Many
            of its strongest negative activations are for weaponry such as
            military vehicles and handguns. Ghana, the country name it responds
            to most strongly, has a Global Peace Index rating higher than most
            African countries, and perhaps it learns this anti-association.
          </figcaption>
        </Surface>
      </figure>
    )
  }
}
