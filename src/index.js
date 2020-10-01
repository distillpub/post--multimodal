// Hot reloading
import * as _unused from "raw-loader!./index.ejs";
// TODO: disable before publishing

import Figure from "./diagrams/Neuron.svelte";
import EnrichmentCircuit from "./diagrams/EnrichmentCircuit.svelte";
import FeaturesTable from "./diagrams/FeaturesTable.svelte";
import InTheWild1 from "./diagrams/InTheWild1.svelte";
import UniversalCircuitTable from "./diagrams/UniversalCircuitTable.svelte";
import "regenerator-runtime/runtime";

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
	["in-the-wild-1", InTheWild1, {}]
];

for(let [elementId, DiagramClass, props] of diagrams) {
	let target = document.getElementById(elementId);
	let example = new DiagramClass({ target, props});
}
