
<script>
import NeuronCard from '../components/NeuronCard.svelte';
import NeuronCardInfo from '../components/NeuronCardInfo.svelte';

import * as d3 from "d3"

const neurons = [ 
			[2478, 
			"shocked", 
			["omg! ftheshocked #cofphie", "when shocked eyes are placed perfectly after the scare ! via", "slightly # shocked & # shocked 📷: trenddrop - horror theme :"]],

			[1193, 
			"crying", 
			["sudden collapse crying drea #cfd 7 studio #", "broken tepes, crier pic ...", "pico crio disaster result video out"]],

			[1512, 
			"happy", 
			["smile 📸: ref unknown #laughselfie. happiness", "love a smile like this ! #rohmatyrevolt", "have a smile so bright like this ! #phantompossil"]],


			[91, 
			"sleepy", 
			["in a deep sleep : dab wink picture : eb temporary blindness", "sleeping wink . 📸 movement : #dab", "falling asleep stoned too bright , rolf bossert"]],


			[1739, 
			"evil", 
			["unleash your angry evil @ priscillashiwwe mayward god", "angry angry # metalheads 😈 sinister devils", "angry and evil - shane"]],
			]

</script>
<!-- 
<style>

</style> -->


<div style="width: 100%; margin: auto; display: block">

	{#each d3.range(1) as i}
	<div style='display: flex; flex-direction: row-wrap; gap: 30px; flex: 6 2; text-align: left; margin:auto; font-size: 13px; margin: 20px; margin-top:0px;'>

		{#each d3.range(5) as i}
		<div class="figcaption" style="display: inline-block; width: 140px">

			<div style="margin-bottom: 5px">
				<i>{neurons[i][1]}</i>
			</div>
			<NeuronCard neuron={{"model": "4x", "unit": neurons[i][0], "name": neurons[i][1]  }} facets={["face"]} ds={false} />
			
			<div class="figcaption" style="margin-top: 5px; line-height: 12px">
				has <i>maximal text</i>
			</div>

			<div style="margin-top: 10px; color: black; text-align: left; font-size: 12px; font-weight: 200; line-height: 14px; background: rgb(240,240,240); border-radius: 3px; padding: 4px;">
				<div style="margin-top: 0px">{neurons[i][2][0]}</div>
			</div>

			<div style="margin-top: 4px; color: black; text-align: left; font-size: 12px; font-weight: 200; line-height: 14px; background: rgb(240,240,240); border-radius: 3px; padding: 4px;">
				<div style="margin-top: 0px">{neurons[i][2][1]}</div>
			</div>

			<div style="margin-top: 4px; color: black;  text-align: left; font-size: 12px; font-weight: 200; line-height: 14px; background: rgb(240,240,240); border-radius: 3px; padding: 4px;">
				<div style="margin-top: 0px">{neurons[i][2][2]}</div>
			</div>

		</div>
		{/each}

	</div>

	{/each}
</div>
