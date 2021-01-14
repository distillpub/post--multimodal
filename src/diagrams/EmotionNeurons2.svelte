
<script>
import NeuronCard from '../components/NeuronCard.svelte';
import NeuronCardInfo from '../components/NeuronCardInfo.svelte';

import * as d3 from "d3"

const neurons = [ 
			[2297, 
			"incarcerated", 
			["penon street corrections inmate - purple and red", "guilty - atufalconing , cells racked", "mason correctional corrections"]],

			[1543, 
			"erotic", 
			["erotic pleasure virgin types", "#3 sexlife 1 stroke #htc", "the # eroticexpo"]],

			[2041, 
			"rejecting", 
			["blocked ! please stop hating on this # mississauga parks list", "3 - false ban by lady", "blocked by zero # adultcolor"]],

			[2202, 
			"question mark", 
			["is always a question ❓❓❓❓❓❓❓❓", "thatbloodyquestion # fashioneatedc _ sona", "always ask ❓ weekly"]],

			[1692, 
			"pout", 
			["silly pout craze xd # pafliesfaq", "duckface #sticker day", "goofy faces sticker day"]]
			]

var hide_erotic=true;

</script>
<!-- 
<style>

</style> -->


<div style="width: 100%; margin: auto; display: block">

	{#each d3.range(1) as i}
	<div style='display: flex; flex-direction: row-wrap; flex: 6 2; text-align: left; margin:auto; font-size: 13px; margin: 20px; margin-top:0px; position: relative;'>

		{#each d3.range(5) as i}
		<div>
		<div class="figcaption" style="display: inline-block;  width: 102px; margin-right: 30px; {((neurons[i][1] == "erotic") && hide_erotic)? 'filter: blur(4px); pointer-events: none;' : ''}">

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
		{#if ((neurons[i][1] == "erotic") && hide_erotic)}
			<div style='position: absolute; top: 25px; padding: 10px; color: #FFF; font-size: 130%; max-width: 80px; line-height: 120%; cursor: pointer; padding-bottom: 40px;' on:click={() => {hide_erotic=false;}}>Show NSFW</div>
		{/if}
		</div>
		{/each}

	</div>

	{/each}
</div>
