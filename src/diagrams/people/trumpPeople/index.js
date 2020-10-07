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
      yAxisProps = {
        label: '',
      },
      probChart = false,
    } = data

    const colors = [
      // '#7acda3',
      '#00bcd4',
      '#b2ebf2',
      '#fff6d7',
      '#ffcfaa',
      '#ffa77d',
      '#ff7f50',
      '#ff5722',
      '#e03400',
    ]

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
          <Group name="">
            {[
              'Nelson Mandela',
              'Martin Luthar King Jr.',
              'Steve Jobs',
              'Barack Obama',
              'Hillary Clinton',
              'Ted Cruz',
              'Donald Trump',
            ].map((person, index) => (
              <Label index={index}>{person}</Label>
            ))}
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
          To see how the Trump neuron corresponds to different individuals we
          searched the query "X giving a speech at a microphone" for various
          individuals, then plotted highest magnitude activation from 74
          pictures{' '}
          <d-footnote>
            The chart here shows the results from our first try doing the search
            query, this number was based partially on a technical detail of the
            method we used for pulling the images.
          </d-footnote>
          , removing the bottom and top 3 outliers to account for the fact that
          not all photos contain the individual. By binning them into histograms
          we can see the conditional probability of choosing an image of each
          individual at each range of activation from this dataset. For two bins
          which contained no activations, which were all over activation
          magnitude 15, we filled them in with Donald Trump, because every
          activation over 15 is of Donald Trump.
        </figcaption>
      </Surface>
    )
  }
}
