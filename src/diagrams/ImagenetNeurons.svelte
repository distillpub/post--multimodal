
<script>
import NeuronCard from '../components/NeuronCard.svelte';
import NeuronCardInfo from '../components/NeuronCardInfo.svelte';

import * as d3 from "d3"

</script>
<!-- 
<style>

</style> -->


<div style="width: 100%; margin: auto">

	<div style='display: flex; flex-direction: row-wrap;  flex: 6 2; text-align: left; margin:auto; font-size: 13px; margin: 20px; margin-top:0px'>
		<div class="figcaption" style="display: inline-block; line-width: 30px;">

			<div style="margin-bottom: 5px">
				birds
			</div>
			<NeuronCard neuron={{"model": "4x", "unit": 2352, "name": "birds"  }} facets={["face"]} ds={true} />
			<div style="margin-top: 5px">
				that give evidence for the classes <i>bald eagle</i>, <i>kite</i>, <i>magpie</i>,  <i>albatross</i>,  <i>dunlin</i>,  <i>oystercatcher</i>, <i>American robin</i>, <i>jay</i>, <i>stork</i>, ...
			</div>
		</div>

		<div class="figcaption" style="display: inline-block; line-width: 30px; margin-left: 30px;">
			<div style="margin-bottom: 5px">
				string instruments
			</div>
			<NeuronCard neuron={{"model": "4x", "unit": 1093, "name": "string"  }} facets={["face"]} ds={true} />
			<div style="margin-top: 5px">
				that give evidence for the classes <i>acoustic guitar</i>, <i>electric guitar</i>, <i>violin</i>, <i>cello</i>, <i>banjo</i>, <i>plectrum</i> ...
			</div>
		</div>	

		<div class="figcaption" style="display: inline-block; line-width: 30px; margin-left: 30px;">
			<div style="margin-bottom: 5px">
				and dogs
			</div>
			<NeuronCard neuron={{"model": "4x", "unit": 2035, "name": "dog"  }} facets={["face"]} ds={true} />
			<div style="margin-top: 5px">
				that give evidence for the classes <i>Siberian Husky</i>, <i>Miniature Pinscher</i>, <i>Papillon</i>, <i>Cocker Spaniels</i>, <i>Border Collie</i> ...
			</div>
		</div>

	</div>

</div>
