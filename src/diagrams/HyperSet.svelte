
<script>
import NeuronCard from '../components/NeuronCard.svelte';
import NeuronCardInfo from '../components/NeuronCardInfo.svelte';
import {microscope_url, map_url, facet_icon_url, dataset_examples_url} from '../urls.js';

import * as d3 from "d3"

const classnames = ['rock crab','red king crab','conch','hermit crab','fiddler crab','spiny lobster','great white shark','grey whale','sea lion','starfish','shipwreck','polar bear','dugong','hippopotamus','platypus','garfish','sturgeon','snoek fish','tench','jellyfish','nautilus','crayfish','snorkel','pelican','dunlin','albatross','oystercatcher','gallinule','limpkin','bittern bird','heron','flamingo','spoonbill','crane bird','black stork','white stork','hornbill','great egret','black swan','duck','red duck','white bird','dungeness crab','lobster','lifeboat','otter','tiger','scorpion','snowmobile','ski']

const nonzeros = [[0, 0, 0.3852551], [0, 1, 0.8546435], [0, 2, 0.7675982], [0, 3, 0.8555895], [0, 4, 0.35444525], [0, 5, 1.1657395], [0, 6, 1.1855764], [0, 7, 0.6922554], [0, 8, 0.3919706], [0, 9, 0.9624161], [0, 10, 1.013737], [0, 11, 0.7824248], [0, 12, 1.2707796], [0, 13, 0.56085056], [0, 14, 1.2135082], [0, 15, 1.0939248], [0, 16, 0.99124354], [0, 17, 0.705097], [0, 18, 0.7167156], [0, 19, 1.1499813], [0, 20, 0.98686546], [0, 21, 0.7415794], [0, 22, 1.3908203], [1, 23, 2.1567688], [1, 24, 2.6181183], [1, 25, 2.7158968], [1, 26, 2.5922806], [1, 27, 2.4572568], [1, 28, 1.8348125], [1, 29, 1.7185541], [1, 30, 1.9013493], [1, 31, 1.3953965], [1, 32, 1.817668], [1, 33, 1.8062328], [1, 34, 2.2089853], [1, 35, 2.491901], [1, 36, 2.079621], [1, 37, 1.8804466], [1, 38, 1.8257102], [1, 39, 1.3060675], [1, 40, 2.4651392], [1, 41, 2.452987], [1, 46, -0.1726258], [2, 0, 1.2206436], [2, 1, 0.7705382], [2, 2, 1.2943641], [2, 3, 1.0988332], [2, 4, 0.6256273], [2, 5, 0.90433145], [2, 6, 0.9566088], [2, 7, 1.4266349], [2, 8, 1.4470719], [2, 9, 1.1034136], [2, 10, 1.5213077], [2, 23, 1.4381951], [2, 24, 1.4761281], [2, 25, 1.5281676], [2, 26, 1.6658003], [2, 42, 0.80803025], [2, 43, 1.0977046], [2, 44, 1.1376472], [3, 11, 1.2648735], [3, 12, 1.6130416], [3, 13, 1.5399921], [3, 27, 0.76444787], [3, 28, 1.4767466], [3, 29, 1.2425814], [3, 30, 1.4218328], [3, 31, 0.58077115], [3, 32, 1.4978758], [3, 33, 1.3392121], [3, 34, 1.6013944], [3, 35, 1.4612269], [3, 36, 1.0765008], [3, 45, 0.8810277], [3, 46, 1.0758677], [4, 14, 1.3969765], [4, 23, 1.0859019], [4, 24, 1.0039837], [4, 27, 0.8535913], [4, 28, 0.70040655], [4, 29, 0.8333461], [4, 30, 0.95385486], [4, 31, 1.0900072], [4, 32, 0.74344647], [4, 33, 0.84297776], [4, 37, 0.83856684], [4, 38, 1.3941795], [4, 39, 1.0533296], [5, 0, 0.5177058], [5, 1, 0.66596276], [5, 2, 1.3116071], [5, 3, 1.4152064], [5, 15, 1.5096277], [5, 16, 2.0540698], [5, 17, 1.5753403], [5, 18, 0.97893655], [5, 19, 1.7664281], [5, 20, 1.8547747], [5, 42, 0.8169393], [5, 47, 1.0427067], [6, 0, 2.1333683], [6, 1, 1.9172046], [6, 4, 2.5759504], [6, 5, 2.4179049], [6, 21, 2.5075028], [6, 42, 1.7939543], [6, 43, 2.0642173], [6, 47, 2.32048], [7, 6, 1.1033851], [7, 7, 1.1823449], [7, 15, 0.5823907], [7, 22, 1.109139], [7, 25, 0.62101036], [7, 40, 1.236508], [7, 44, 0.8080586], [7, 45, 1.0128684], [8, 11, 0.8070405], [8, 41, 0.5201662], [8, 48, 0.95243126], [8, 49, 0.91912675], [9, 22, 1.1732293], [9, 48, 1.437538], [9, 49, 1.655205]]

const neurons = [1634,2352,1511,2247,2246,1761,1276,775,1829, 909]
const neuron_names = {1573 : "trees", 2525:"non-mammals", 2035:"animal", 2247:"wildlife", 2352:"bird", 1634:"underwater", 1761:"fish", 1511:"seashore", 2246:"water reflection", 775 :"sea", 1276:"seafood", 909 :"sport", 1829:"snow"}

const cell_size = 23

</script>

<style>
    .figure-anchor {
        font-weight: bold;
    }
</style>

<div style="display:flex; flex-direction: column; width: 100%; margin: auto" id="hypergraph">
 	<svg style="position: relative; left: 0px; width: 1550px; font-size:13px; font-weight:400; margin:auto; height: 340px">

 		<g transform="translate(180, 10)">
 			<text style="fill:rgb(160,160,160) !important">Labels</text>
 		</g>

 		<g transform="translate(180, 16)">
	 		<line x1={0} y1={0} x2={cell_size*53} y2={0} style="stroke:rgb(230,230,230);stroke-width:1" />
	 	</g>

 		<g transform="translate(75, 320)">
 			<text style="fill:rgb(160,160,160) !important" transform="rotate(-90.0)">Neurons</text>
 		</g>

 		<g transform="translate(80, 93)">
	 		<line x1={0} y1="0" x2={0} y2={cell_size*neurons.length} style="stroke:rgb(230,230,230);stroke-width:1" />
	 	</g>

 		<g transform="translate(180, 95)">
			{#each d3.range(classnames.length+1) as i}
				{#if i < classnames.length}
					<g transform="translate({i*cell_size+20}, -2)">
						<text style="color:rgb(128,128,128)" transform="rotate(-41.5)">{classnames[i]}</text>
					</g>
				{/if}
				<line x1={(i)*cell_size} y1="0" x2={(i)*cell_size} y2={cell_size*neurons.length} style="stroke:rgb(200,200,200);stroke-width:1" />
				<line x1={(i)*cell_size} y1="0" x2={(i)*cell_size + 75} y2="-65" style="stroke:rgb(200,200,200);stroke-width:1" />
			{/each}

			{#each nonzeros as nz}
				<circle style="stroke-width:1.5px" stroke="rgb(150,150,150)" fill="rgb(230,230,230)" cx={nz[1]*cell_size+cell_size/2} cy="{nz[0]*cell_size + cell_size/2}" r ="{cell_size/2.7}"></circle>
			{/each}

			{#each d3.range(neurons.length+1) as i}
					{#if i < neurons.length}
						<a href = {microscope_url({"model": "4x", "unit": neurons[i], "name": neuron_names[neurons[i]]})}>
						<text text-anchor="end" style="color:rgb(200,200,200)" y={cell_size*i + 18} x="-5">{neuron_names[neurons[i]]}</text>
						</a>
					{/if}
					<line stroke-dasharray="4 2" y1={(i)*cell_size} x1="0" y2={(i)*cell_size} x2="{cell_size*classnames.length}" style="stroke:rgb(200,200,200);stroke-width:1" />
			{/each}

		</g>

	</svg>

	<div style='grid-area: caption; max-width: 700px; margin: auto' class='figcaption'>
	    <a href='#hypergraph' class='figure-anchor'>Figure 8:</a> This diagram visualizes a submatrix of the full weight matrix that takes neurons in the penultimate layer of Resnet 4x to the ImageNet classes. Each grey circle represents a positive weight. We see the model fails in ways that are close but incorrect, such as its labeling of scorpion as a fish.
	</div>

</div>


<div style="width: 700px; margin: auto; margin-top: 20px; margin-bottom: 0px">

	<div style='display: flex; flex-direction: row-wrap;flex: 6 2; text-align: left; margin:auto; font-size: 13px; margin: 20px; margin-top:0px; margin-bottom:0px'>
		<div class="figcaption" style="display: inline-block; line-width: 30px">

			<div style="margin-bottom: 5px">
				such as underwater
			</div>
			<NeuronCard neuron={{"model": "4x", "unit": 1634, "name": "underwater"  }} facets={["nature"]} ds={true} ds_override={true}/>
		</div>

		<div class="figcaption" style="display: inline-block; line-width: 30px; margin-left: 30px;">
			<div style="margin-bottom: 5px">
				the sea surface
			</div>
			<NeuronCard neuron={{"model": "4x", "unit": 775, "name": "sea"  }} facets={["nature"]} ds={true} ds_override={true} />
		</div>

		<div class="figcaption" style="display: inline-block; line-width: 30px; margin-left: 30px;">
			<div style="margin-bottom: 5px">
				and the seashore
			</div>
			<NeuronCard neuron={{"model": "4x", "unit": 1511, "name": "seashore"  }} facets={["nature"]} ds={true} ds_override={true} />
		</div>


	</div>

</div>
