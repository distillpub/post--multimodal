// Hot reloading
import * as _unused from 'raw-loader!./index.ejs'
// TODO: disable before publishing

import Figure from './diagrams/Neuron.svelte'
import InTheWild1 from './diagrams/InTheWild1.svelte'
import InTheWild2 from './diagrams/InTheWild2.svelte'
import UniversalityTable from './diagrams/UniversalityTable.svelte'
import UniversalCircuitTable from './diagrams/UniversalCircuitTable.svelte'
import 'regenerator-runtime/runtime'

// lazily initialize any diagram below the fold. E.G:
// const exampleTag = document.getElementById("fig1");
// exampleTag.addEventListener("ready", () => {

// 	const target = exampleTag.querySelector("#fig_inner");
// 	let example = new Figure({ target, props:
// 								{
// 									neuron: 1,
// 									layername: "4/4/Add_6",
// 									model: "RN_4x"
// 								}
// 							});

// });

// Nick

import EmotionsIntro from './diagrams/emotions/intro'
import EmotionsSurprise from './diagrams/emotions/surprise'
import EmotionsMinor from './diagrams/emotions/minor'
import EmotionsDuckface from './diagrams/emotions/duckface'
import EmotionsMentalHealth from './diagrams/emotions/mentalHealth'
import EmotionsAtlas from './diagrams/emotions/atlas'
import EmotionsSemantic from './diagrams/emotions/semantic'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(<EmotionsIntro />, document.getElementById('emotions-intro'))
ReactDOM.render(<EmotionsMinor />, document.getElementById('emotions-minor'))
ReactDOM.render(
  <EmotionsDuckface />,
  document.getElementById('emotions-duckface')
)
ReactDOM.render(
  <EmotionsSurprise />,
  document.getElementById('emotions-surprise')
)
ReactDOM.render(
  <EmotionsMentalHealth />,
  document.getElementById('emotions-mentalhealth')
)
ReactDOM.render(<EmotionsAtlas />, document.getElementById('emotions-atlas'))
ReactDOM.render(
  <EmotionsSemantic
    emotionNames={[
      'ashamed',
      'let down',
      'resentful',
      'aggressive',
      'skeptical',
      'disappointed',
      'grief',
    ]}
  />,
  document.getElementById('emotions-semantic-clever')
)

ReactDOM.render(
  <EmotionsSemantic
    emotionNames={[
      'pressured',
      'confident',
      'disrespected',
      'weak',
      'worthless',
    ]}
  />,
  document.getElementById('emotions-semantic-bias')
)

const diagrams = [
  ['universality-diagram', UniversalityTable, {}],
  ['univeresal-circuit-diagram', UniversalCircuitTable, {}],
  ['in-the-wild-1', InTheWild1, {}],
  ['in-the-wild-2', InTheWild2, {}],
]

for (let [elementId, DiagramClass, props] of diagrams) {
  let target = document.getElementById(elementId)
  let example = new DiagramClass({ target, props })
}
