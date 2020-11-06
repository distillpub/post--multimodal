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

import photo1 from './dse/photo/1.png'
import photo2 from './dse/photo/2.png'
import photo3 from './dse/photo/3.png'
import photo4 from './dse/photo/4.png'

const photoDse = [photo1, photo2, photo3, photo4]

import aligned1 from './dse/aligned/1.png'
import aligned2 from './dse/aligned/2.png'
import aligned3 from './dse/aligned/3.png'
import aligned4 from './dse/aligned/4.png'

const alignedDse = [aligned1, aligned2, aligned3, aligned4]

import art1 from './dse/art/1.png'
import art2 from './dse/art/2.png'
import art3 from './dse/art/3.png'
import art4 from './dse/art/4.png'

const artDse = [art1, art2, art3, art4]

import political1 from './dse/political/1.png'
import political2 from './dse/political/2.png'
import political3 from './dse/political/3.png'
import political4 from './dse/political/4.png'

const politicalDse = [political1, political2, political3, political4]

import videoGamesMusic1 from './dse/videoGamesMusic/1.png'
import videoGamesMusic2 from './dse/videoGamesMusic/2.png'
import videoGamesMusic3 from './dse/videoGamesMusic/3.png'

const videoGamesMusicDse = [
  videoGamesMusic1,
  videoGamesMusic2,
  videoGamesMusic3,
]

import partial1 from './dse/partial/1.png'
import partial2 from './dse/partial/2.png'
import partial3 from './dse/partial/3.png'
import partial4 from './dse/partial/4.png'

const partialDse = [partial1, partial2, partial3, partial4]

import text1 from './dse/text/1.png'
import text2 from './dse/text/2.png'
import text3 from './dse/text/3.png'
import text4 from './dse/text/4.png'

const textDse = [text1, text2, text3, text4]

import lgbt1 from './dse/lgbt/1.png'
import lgbt2 from './dse/lgbt/2.png'
import lgbt3 from './dse/lgbt/3.png'

const lgbtDse = [lgbt1, lgbt2, lgbt3]

import nonPolitical1 from './dse/unrelated/1.png'
import nonPolitical2 from './dse/unrelated/2.png'
import nonPolitical3 from './dse/unrelated/3.png'

const nonPoliticalDse = [nonPolitical1, nonPolitical2, nonPolitical3]

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
    const neuronStd = 2.19
    const neuronMean = -2.33

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

    const iconSize = 65.1

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
        <Surface marginRight={10} marginLeft={-10}>
          <Text
            fontSize={14}
            opacity={1}
            fontWeight={600}
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
      <figure className="fullscreen-diagram">
        <Surface width={width} margin="auto">
          <Surface flexFlow="row" marginLeft={60}>
            <Group name="Neutral">
              <Label index={8} dse={videoGamesMusicDse}>
                Games / Music
              </Label>
              <Label index={7} dse={lgbtDse}>
                Black / LGBT Rights
              </Label>
              <Label index={6} dse={nonPoliticalDse}>
                Non-Political
              </Label>
              <Label index={5} dse={politicalDse}>
                Political Generic
              </Label>
            </Group>
            <Group name="Related to Donald Trump">
              <Label index={4} dse={alignedDse}>
                Politics
              </Label>
              <Label index={3} dse={partialDse}>
                Partial Photo
              </Label>
              <Label index={2} dse={textDse}>
                Text
              </Label>
              <Label index={1} dse={artDse}>
                Art
              </Label>
              <Label index={0} dse={photoDse}>
                Profile Photo
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
                      if (isZero) return { y: 0, x: standardDeviations }
                      return { x: binValue / neuronStd, y: height[bin] }
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
                axisLabelComponent={<VictoryLabel dy={7} />}
                label="Standard Deviations from Zero Activation"
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
            We collected about 650 images that caused the Trump neuron to fire
            different amounts. In each 15 unit increment from -40 to 115 we
            sampled an equal number of images then labeled them by hand into a
            number of categories. While we labeled we could not see the
            activation. Using this dataset we can estimate the conditional
            probability of each category at each level of activation. We see
            that the higher activations of the Trump neuron are highly
            selective, with more than 90% of the images with a standard
            deviation greater than 30 are related to Donald Trump.
          </figcaption>
        </Surface>
      </figure>
    )
  }
}
