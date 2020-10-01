// Hot reloading
import * as _unused from 'raw-loader!./index.ejs'
// TODO: disable before publishing

import Figure from "./diagrams/Neuron.svelte";
import EnrichmentCircuit from "./diagrams/EnrichmentCircuit.svelte";
import FeaturesTable from "./diagrams/FeaturesTable.svelte";
import UniversalCircuitTable from "./diagrams/UniversalCircuitTable.svelte";
import InTheWild1 from './diagrams/InTheWild1.svelte'
import InTheWild2 from './diagrams/InTheWild2.svelte'
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

let early_vision_data = {
	big_icon: false,
	models: ["InceptionV1", "InceptionV1_caffe_Places365", "MultimodalLM", "contrastive_v1", "contrastive_rn50", "contrastive_v2", "contrastive_4x"],
    features: ['high-low', 'bw-color']
}

let task_specific_data = {
	big_icon: true,
	models: ["InceptionV1", "InceptionV1_caffe_Places365", "MultimodalLM", "contrastive_v1", "contrastive_rn50", "contrastive_v2", "contrastive_4x"],
	features: ['bird', 'insect', 'pool', 'sunset', 'palm', 'f'],
	categoryLabels: [
		{
			"start": 0,
			"end": 2,
			"header": "ImageNet + Multimodal",
			"sub": "Features which are shared across ImageNet and Multimodal models, but not Places365.",
		},
		{
			"start": 2,
			"end": 4,
			"header": "Places365 + Multimodal",
			"sub": "Features which are shared across Places365 and Multimodal models, but not ImageNet.",
		},
		{
			"start": 4,
			"end": 6,
			"header": "Multimodal Only",
			"sub": "Features which Multimodal models do not share with ImageNet and Places365.",
		}
	]
}

const diagrams = [
	["enrichment-diagram", EnrichmentCircuit, {}],
	["early-vision", FeaturesTable, early_vision_data],
	["task-specific", FeaturesTable, task_specific_data],
	["universal-circuit-diagram", UniversalCircuitTable, {}],
	["enrichment-diagram-2", EnrichmentCircuit, {}],
	["in-the-wild-1", InTheWild1, {}],
	['in-the-wild-2', InTheWild2, {}]
];

for(let [elementId, DiagramClass, props] of diagrams) {
	let target = document.getElementById(elementId);
	let example = new DiagramClass({ target, props});

}


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

