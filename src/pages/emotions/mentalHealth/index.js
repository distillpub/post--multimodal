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

import anxiety1 from './dse/anxiety/1.png'
import anxiety2 from './dse/anxiety/2.png'
import anxiety3 from './dse/anxiety/3.png'

const anxietyDse = [anxiety1, anxiety2, anxiety3]

import badEmotion1 from './dse/badEmotion/1.png'
import badEmotion2 from './dse/badEmotion/2.png'
import badEmotion3 from './dse/badEmotion/3.png'

const badEmotionDse = [badEmotion1, badEmotion2, badEmotion3]

import depression1 from './dse/depression/1.png'
import depression2 from './dse/depression/2.png'
import depression3 from './dse/depression/3.png'

const depressionDse = [depression2, depression3]

import drugs1 from './dse/drugs/1.png'
import drugs2 from './dse/drugs/2.png'
import drugs3 from './dse/drugs/3.png'

const drugsDse = [drugs1, drugs2, drugs3]

import games1 from './dse/games/1.png'
import games2 from './dse/games/2.png'
import games3 from './dse/games/3.png'

const gamesDse = [games1, games2, games3]

import pets1 from './dse/pets/1.png'
import pets2 from './dse/pets/2.png'
import pets3 from './dse/pets/3.png'

const petsDse = [pets1, pets2, pets3]

import sadJoke1 from './dse/sadJoke/1.png'
import sadJoke2 from './dse/sadJoke/2.png'
import sadJoke3 from './dse/sadJoke/3.png'

const sadJokeDse = [sadJoke1, sadJoke2, sadJoke3]

import unrelated1 from './dse/unrelated/1.png'
import unrelated2 from './dse/unrelated/2.png'
import unrelated3 from './dse/unrelated/3.png'

const unrelatedDse = [unrelated1, unrelated2, unrelated3]

import words1 from './dse/words/1.png'
import words2 from './dse/words/2.png'
import words3 from './dse/words/3.png'

const wordsDse = [words1, words2, words3]

// import photo1 from './dse/photo/1.png'
// import photo2 from './dse/photo/2.png'
// import photo3 from './dse/photo/3.png'
// import photo4 from './dse/photo/4.png'

// const photoDse = [photo1, photo2, photo3, photo4]

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

    const stdDev = 1.477

    const width = 1300
    const { activeGroups } = this.state
    const isGroupActive = (group) => includes(activeGroups, group)
    const hasActiveGroup = activeGroups.length > 0

    if (probChart) {
      yAxisProps.tickFormat = (t) => `${t.toExponential()}`
      yAxisProps.dy = -30
      stackProps.domain = { y: [0, 0.0000022] }
    }

    const iconSize = 62.3
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
                  {dse.slice(0, 2).map((img) => (
                    <div
                      style={{
                        border: '1px solid ' + colors[index],
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

    const Valence = ({ name, children }) => {
      return (
        <Surface marginRight={20}>
          <Text
            fontSize={12}
            opacity={0.8}
            fontWeight={500}
            textDecoration="uppercase"
          >
            {name} Valence
          </Text>
          <Surface flexFlow="row" transform="translateX(-6px)">
            {children}
          </Surface>
        </Surface>
      )
    }

    return (
      <figure className="fullscreen-diagram">
        <Surface width={width} margin="auto">
          <Surface flexFlow="row" marginLeft={60}>
            <Valence name="High">
              <Label index={8} dse={gamesDse}>
                Music &amp; Sports
              </Label>
              <Label index={7} dse={petsDse}>
                Travel, Food, Pet
              </Label>
            </Valence>
            <Valence name="Neutral">
              <Label index={6} dse={unrelatedDse}>
                Unrelated
              </Label>
              <Label index={4} dse={drugsDse}>
                Drugs &amp; Medicine
              </Label>
              <Label index={5} dse={wordsDse}>
                Like "psychology"
              </Label>
            </Valence>
            <Valence name="Low">
              <Label index={3} dse={sadJokeDse}>
                Depressing Joke
              </Label>
              <Label index={2} dse={badEmotionDse}>
                Bad Feeling
              </Label>
              <Label index={1} dse={anxietyDse}>
                Anxiety
              </Label>
              <Label index={0} dse={depressionDse}>
                Depression / Sad
              </Label>
            </Valence>
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
                      if (isZero) return { y: 0, x: binValue }
                      return { x: binValue / stdDev, y: height[bin] }
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
            To understand the "mental illness neuron" in more depth, we
            collected images that cause it to fire different amounts and labeled
            them by hand into categories we created. This lets us estimate the
            conditional probability of a label at a given activation level. See{' '}
            <a href="#conditional-probability">the appendix</a> for details.
            During the labeling process we couldn't see how much it made the
            neuron fire. We see that the strongest activations all belong to
            labels corresponding to low-valence mental states. On the other
            hand, many images with a negative pre-ReLU activation are of scenes
            we may typically consider high-valence, like photos with pets,
            travel photos, and or pictures of sporting events.
          </figcaption>
        </Surface>
      </figure>
    )
  }
}
