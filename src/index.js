// Hot reloading
import * as _unused from "raw-loader!./index.ejs";
// TODO: disable before publishing

import Figure from "./diagrams/Neuron.svelte";
import InTheWild1 from "./diagrams/InTheWild1.svelte";
import InTheWild2 from "./diagrams/InTheWild2.svelte";
import UniversalityTable from "./diagrams/UniversalityTable.svelte";
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


const diagrams = [
	["universality-diagram", UniversalityTable, {}],
	["univeresal-circuit-diagram", UniversalCircuitTable, {}],
	["in-the-wild-1", InTheWild1, {}],
	["in-the-wild-2", InTheWild2, {}]
];

for(let [elementId, DiagramClass, props] of diagrams) {
	let target = document.getElementById(elementId);
	let example = new DiagramClass({ target, props});
}
