// Hot reloading
import * as _unused from 'raw-loader!./index.ejs'
// TODO: disable before publishing

import Figure from './diagrams/Neuron.svelte'
import HyperSet from './diagrams/HyperSet.svelte'
import UniversalityTable from './diagrams/UniversalityTable.svelte'
import NeuronTable from './diagrams/NeuronTable.svelte'
import RegionalNeurons from './diagrams/RegionalNeurons.svelte'

import 'regenerator-runtime/runtime'

import AttackDemo from './diagrams/AttackDemo.svelte'
import FeatureOverview from './diagrams/FeatureOverview.svelte'
import FeaturesTableWithDS from './diagrams/FeaturesTableWithDS.svelte'
import EnrichmentCircuit from './diagrams/EnrichmentCircuit.svelte'
import FeaturesTable from './diagrams/FeaturesTable.svelte'
import LiterateNeurons from './diagrams/LiterateNeurons.svelte'
import AttackSetup from './diagrams/AttackSetup.svelte'
import AutomatedAttacks from './diagrams/AutomatedAttacks.svelte'
import AttackableNeurons from './diagrams/AttackableNeurons.svelte'
import UniversalCircuitTable from './diagrams/UniversalCircuitTable.svelte'
import InTheWild1 from './diagrams/InTheWild1.svelte'
import InTheWild2 from './diagrams/InTheWild2.svelte'
import 'regenerator-runtime/runtime'

let example = new UniversalityTable({
  target: document.getElementById('universality-diagram'),
  props: {},
})
let hypergraph = new HyperSet({
  target: document.getElementById('hypergraph-device'),
  props: {},
})
let interesting = new NeuronTable({
  target: document.getElementById('interesting-neurons'),
  props: {},
})

// });

// Nick

import PeopleHandLabeled from './diagrams/people/handLabeledTrump'
import PeopleMargin from './diagrams/people/margin'
import PeopleTrumpPeople from './diagrams/people/trumpPeople'
import EmotionsIntro from './diagrams/emotions/intro'
import EmotionsSurprise from './diagrams/emotions/surprise'
import EmotionsMinor from './diagrams/emotions/minor'
import EmotionsDuckface from './diagrams/emotions/minor/duckface'
import EmotionsMentalHealth from './diagrams/emotions/mentalHealth'
import EmotionsAtlas from './diagrams/emotions/atlas'
import EmotionsSemantic from './diagrams/emotions/semantic'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(<EmotionsAtlas />, document.getElementById('emotions-atlas'))

let early_vision_data = {
  big_icon: false,
  models: [
    'InceptionV1',
    'InceptionV1_caffe_Places365',
    'MultimodalLM',
    'contrastive_v1',
    'contrastive_rn50',
    'contrastive_v2',
    'contrastive_4x',
  ],
  features: ['high-low', 'bw-color'],
}

let task_specific_data = {
  big_icon: true,
  models: [
    'InceptionV1',
    'InceptionV1_caffe_Places365',
    'MultimodalLM',
    'contrastive_v1',
    'contrastive_rn50',
    'contrastive_v2',
    'contrastive_4x',
  ],
  features: ['bird', 'insect', 'pool', 'sunset', 'palm', 'f'],
  categoryLabels: [
    {
      start: 0,
      end: 2,
      header: 'ImageNet + Multimodal',
      sub:
        'Features which are shared across ImageNet and Multimodal models, but not Places365.',
    },
    {
      start: 2,
      end: 4,
      header: 'Places365 + Multimodal',
      sub:
        'Features which are shared across Places365 and Multimodal models, but not ImageNet.',
    },
    {
      start: 4,
      end: 6,
      header: 'Multimodal Only',
      sub:
        'Features which Multimodal models do not share with ImageNet and Places365.',
    },
  ],
}

const diagrams = [
  //['people-table', FeaturesTableWithDS, {}],
  ['intro-attack-demo', AttackDemo, {}],
  ['feature-overview', FeatureOverview, {}],
  ['regional-neurons', RegionalNeurons, {}],
  ['enrichment-diagram', EnrichmentCircuit, {}],
  ['early-vision', FeaturesTable, early_vision_data],
  ['task-specific', FeaturesTable, task_specific_data],
  ['universal-circuit-diagram', UniversalCircuitTable, {}],
  ['enrichment-diagram-2', EnrichmentCircuit, {}],
  ['in-the-wild-1', InTheWild1, {}],
  ['in-the-wild-2', InTheWild2, {}],
  ['literate-neurons', LiterateNeurons, {}],
  ['attackable-neurons', AttackableNeurons, {}],
  ['automated-attacks', AutomatedAttacks, {}],
  ['attack-setup', AttackSetup, {}],
]

for (let [elementId, DiagramClass, props] of diagrams) {
  let target = document.getElementById(elementId)
  let example = new DiagramClass({ target, props })
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
ReactDOM.render(
  <PeopleHandLabeled />,
  document.getElementById('people-handlabeled')
)
ReactDOM.render(
  <PeopleTrumpPeople />,
  document.getElementById('people-trumppeople')
)

ReactDOM.render(<EmotionsAtlas />, document.getElementById('emotions-atlas'))

ReactDOM.render(
  <EmotionsSemantic
    emotionNames={['energetic', 'jealous', 'bored', 'intimate', 'surprised']}
  />,
  document.getElementById('emotions-semantic-interesting')
)

ReactDOM.render(
  <EmotionsSemantic
    emotionNames={['powerful', 'creative', 'embarrassed', 'disrespected']}
  />,
  document.getElementById('emotions-semantic-worldly')
)
ReactDOM.render(<PeopleMargin />, document.getElementById('people-margin'))

ReactDOM.render(
  <EmotionsSemantic
    emotionNames={['powerful', 'creative', 'embarrassed', 'content']}
  />,
  document.getElementById('emotions-semantic-worldly')
)

ReactDOM.render(
  <EmotionsSemantic emotionNames={['stressed', 'anxious', 'mad']} />,
  document.getElementById('emotions-semantic-mental')
)

ReactDOM.render(
  <EmotionsSemantic
    emotionNames={['accepted', 'confident', 'pressured', 'humiliated']}
  />,
  document.getElementById('emotions-semantic-bias')
)
