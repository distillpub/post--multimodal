<script>
  var d3 = require("d3")
  export let width;
  export let numdots;
  export let bind = 0
</script>

<div>
  <svg style="height: 20px; width: 100%; padding-top:3px; user-select: none;">
  	
    {#each d3.range(numdots) as i}
      <circle cx={14 + 9*i} cy=11 r=2 style="fill:{i == bind ? 'rgb(125,125,125)': 'rgb(200,200,200)' }"></circle>
    {/each}
	
	<g fill=none transform="translate({width-40},2)">
		<rect on:click={ ()=>{ bind = (bind + 1)%numdots} } x="20" width="18" height="18" rx="9" fill="#F1F1F1"/>
		<rect on:click={ ()=>{ bind = (bind == 0) ? (numdots-1): bind-1 }} width="18" height="18" rx="9" fill="#F1F1F1"/>
		<path on:click={ ()=>{ bind = (bind + 1)%numdots} } d="M27.5593 4.43335L31.6853 8.55929L27.5593 12.6852" stroke="#7B7B7B"/>
		<path on:click={ ()=>{ bind = (bind == 0) ? (numdots-1): bind-1 }} d="M10.4592 12.6852L6.33328 8.55924L10.4592 4.43329" stroke="#7B7B7B"/>
	</g>

	</svg>
</div>
