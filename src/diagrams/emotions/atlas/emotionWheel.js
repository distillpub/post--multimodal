import { Surface, ZoomedImg, Text } from '../../reactComponents/ui'
import React from 'react'
import { range, max, capitalize, sortBy, reverse, includes } from 'lodash'
import * as d3 from 'd3'
import { useRef, useEffect } from 'react'

function treeify(source) {
  const parents = []
  const nodes = source.trim().split(/\n/g)
  parents.push({ children: [] })
  for (let i = 0, n = nodes.length; i < n; ++i) {
    const depth = nodes[i].match(/^\t*/)[0].length
    const parent = parents[depth]
    if (!parent.children) parent.children = []
    parent.children.push((parents[depth + 1] = { name: nodes[i].slice(depth) }))
  }
  return parents[0]
}

const defaultTree = treeify(`
Fearful
	Scared
		Helpless
		Frightened
	Anxious
		Overwhelmed
		Worried
	Insecure
		Inadequate
		Inferior
	Weak
		Worthless
		Insignificant
	Rejected
		Excluded
		Persecuted
	Threatened
		Nervous
		Exposed
Angry
	Let down
		Betrayed
		Resentful
	Humiliated
		Disrespected
		Ridiculed
	Bitter
		Indignant
		Violated
	Mad
		Furious
		Jealous
	Aggressive
		Provoked
		Hostile
	Frustrated
		Infuriated
		Annoyed
	Distant
		Withdrawn
		Numb
	Critical
		Skeptical
		Dismissive
Disgusted
	Disapproving
		Judgmental
		Embarrassed
	Disappointed
		Appalled
		Revolted
	Awful
		Nauseated
		Detestable
	Repelled
		Horrified
		Hesitant
Sad
	Hurt
		Embarrassed
		Disappointed
	Depressed
		Inferior
		Empty
	Guilty
		Remorseful
		Ashamed
	Despair
		Powerless
		Grief
	Vulnerable
		Fragile
		Victimized
	Lonely
		Abandoned
		Isolated
Happy
	Optimistic
		Inspired
		Hopeful
	Trusting
		Intimate
		Sensitive
	Peaceful
		Thankful
		Loving
	Powerful
		Creative
		Courageous
	Accepted
		Valued
		Respected
	Proud
		Confident
		Successful
	Interested
		Inquisitive
		Curious
	Content
		Joyful
		Free
	Playful
		Cheeky
		Aroused
Surprised
	Excited
		Energetic
		Eager
	Amazed
		Awe
		Astonished
	Confused
		Perplexed
		Disillusioned
	Startled
		Dismayed
		Shocked
Bad
	Tired
		Unfocused
		Sleepy
	Stressed
		Out of control
		Overwhelmed
	Busy
		Rushed
		Pressured
	Bored
		Apathetic
		Indifferent
`)

const Wheel = ({ tree, width = 440, color, useParent = true }) => {
  const data = tree

  const partition = (data) =>
    d3.partition().size([2 * Math.PI, radius])(d3.hierarchy(data).count())
  const radius = width / 2
  const arc = d3
    .arc()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius / 2)
    .innerRadius((d) => d.y0)
    .outerRadius((d) => d.y1 - 1)

  const draw = (ref) => {}

  const ref = useRef()
  useEffect(() => {
    const root = partition(data)

    const dom = document.createElement('svg')
    dom.setAttribute('width', width)
    dom.setAttribute('height', width)
    const svg = d3
      .select(ref.current)
      .style('width', '100%')
      .style('height', 'auto')
      .style('font', '8px sans-serif')

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${width / 2})`)

    g.append('g')
      .attr('fill-opacity', 0.6)
      .selectAll('path')
      .data(root.descendants().slice(1))
      .enter()
      .append('path')
      .attr('fill', (d) => {
        if (useParent) {
          while (d.depth > 1) d = d.parent
        }
        return color(d.data.name)
      })
      .attr('d', arc)

    g.append('g')
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .selectAll('text')
      .data(root.descendants().slice(1))
      .enter()
      .append('text')
      .attr('transform', function (d) {
        const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI
        const y = (d.y0 + d.y1) / 2
        return `rotate(${
          x - 90
        }) translate(${y},0) rotate(${x < 180 ? 0 : 180})`
      })
      .attr('dy', '0.35em')
      .text((d) => d.data.name)
  }, [])

  return <svg width={width} height={width} ref={ref} />
}

export default () => {
  const color = d3
    .scaleOrdinal()
    .range(d3.quantize(d3.interpolateRainbow, defaultTree.children.length + 1))

  return (
    <Surface>
      <Surface flexFlow="row" height={600}>
        <Surface marginTop={20}>
          <Wheel tree={defaultTree} color={color} />
        </Surface>
      </Surface>
    </Surface>
  )
}
