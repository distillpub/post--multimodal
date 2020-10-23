// Hot reloading
// import * as _unused from 'raw-loader!./index.ejs'
// TODO: disable before publishing

import React from 'react'
import ReactDOM from 'react-dom'
import PaperText from './paper.md'
import HelloSvelte from './diagrams/helloWorld.svelte'

const Paper = <React.Fragment>
    <d-contents id="introduction">
      <nav class="toc figcaption">
        <h4>Contents</h4>
        <div><a href="#introduction">Introduction</a></div>
        <div><a href="#guided-tour-of-neuron-families">A Guided Tour of Neuron Families</a></div>
        <ul>
          <li><a href="#person-neurons">Person Neurons</a></li>
          <li><a href="#emotion-neurons">Emotion Neurons</a></li>
          <li><a href="#region-neurons">Region Neurons</a></li>
          <li><a href="#miscellaneous-neurons">Miscellaneous Neurons</a></li>
          <li><a href="#feature-properties">Feature Properties</a></li>
        </ul>
        <div><a href="#using-abstractions">Using Abstractions</a></div>
        <ul>
          <li><a href="#imagenet-challenge">The Imagenet Challenge</a></li>
          <li><a href="#understanding-language">Understanding Language</a></li>
          <li><a href="#emotional-intelligence">Emotional Intelligence</a></li>
        </ul>
        <div><a href="#typographic-attacks">Typographic Attacks</a></div>
        <ul>
          <li><a href="#physical-typographic-attacks">Physical Typographic Attacks</a></li>
          <li><a href="#automated-typographic-attacks">Automated Typographic Attacks</a></li>
          <li><a href="#emotional-intelligence">Emotional Intelligence</a></li>
        </ul>
        <div><a href="#appendix">Appendix 1: Methodological Details</a></div>
        <ul>
          <li><a href="#faceted-feature-visualization">Faceted Feature Visualization</a></li>
        </ul>
      </nav>
      <div class="toc-line"></div>
    </d-contents>
    <PaperText></PaperText>
</React.Fragment>

ReactDOM.render(Paper, document.querySelector('d-article'))

/*
import Figure from './diagrams/Neuron.svelte'
import HyperSet from './diagrams/HyperSet.svelte'
import UniversalityTable from './diagrams/UniversalityTable.svelte'
import NeuronTable from './diagrams/NeuronTable.svelte'
import RegionalNeurons from './diagrams/RegionalNeurons.svelte'
import SmallNeuronRow from './diagrams/SmallNeuronRow.svelte'
import SmallNeuronGrid from './diagrams/SmallNeuronGrid.svelte'

import 'regenerator-runtime/runtime'

import AttackDemo from './diagrams/AttackDemo.svelte'
import FeatureOverview from './diagrams/FeatureOverview.svelte'
import FeaturesTableWithDS from './diagrams/FeaturesTableWithDS.svelte'
import EnrichmentCircuit from './diagrams/EnrichmentCircuit.svelte'
import FeaturesTable from './diagrams/FeaturesTable.svelte'
import LiterateNeurons from './diagrams/LiterateNeurons.svelte'
import MicroscopeButton from './components/MicroscopeButton.svelte'
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

import PeopleHandLabeled from './pages/people/handLabeledTrump'
import PeopleMargin from './pages/people/margin'
import PeopleTrumpPeople from './pages/people/trumpPeople'
import EmotionsIntro from './pages/emotions/intro'
import EmotionsSurprise from './pages/emotions/surprise'
import EmotionsMinor from './pages/emotions/minor'
import EmotionsDuckface from './pages/emotions/minor/duckface'
import EmotionsMentalHealth from './pages/emotions/mentalHealth'
import EmotionsAtlas from './pages/emotions/atlas'
import EmotionsSemantic from './pages/emotions/semantic'

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

for (let target of document.getElementsByClassName('small-neuron-row')) {
  var attrs = target.attributes
  var neurons = attrs['data-neurons'].value.split(',').map((s) => parseInt(s))
  var facet = attrs['data-facet'].value || 'any'
  var props = { neurons, facet }
  let example = new SmallNeuronRow({ target, props })
}
for (let target of document.getElementsByClassName('small-neuron-grid')) {
  var attrs = target.attributes
  var neurons = attrs['data-neurons'].value.split(',').map((s) => parseInt(s))
  var titles = attrs['data-titles'].value.split(',')
  var models = attrs['data-models'].value.split(',')
  var facets = attrs['data-facets'].value.split(',')
  var layers = attrs['data-layers'].value.split(',')
  var props = { neurons, facets, titles, models, layers }
  let example = new SmallNeuronGrid({ target, props })
}
for (let target of document.getElementsByClassName('microscope-button')) {
  var attrs = target.attributes
  var unit = attrs['data-unit'].value
  var layer = attrs['data-layer'].value
  var model = attrs['data-model'].value
  var props = { unit, layer, model }
  let example = new MicroscopeButton({ target, props })
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
*/
