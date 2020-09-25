// Hot reloading
import * as _unused from "raw-loader!./index.ejs";
// TODO: disable before publishing

import Figure from "./diagrams/Neuron.svelte";
import HyperSet from "./diagrams/HyperSet.svelte";
import UniversalityTable from "./diagrams/UniversalityTable.svelte";
import NeuronTable from "./diagrams/NeuronTable.svelte";

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

let example     = new UniversalityTable({ target: document.getElementById("universality-diagram"), props: {}});
let hypergraph  = new HyperSet({ target: document.getElementById("hypergraph-device"), props: {}});
let interesting = new NeuronTable({ target: document.getElementById("interesting-neurons"), props: {}});
