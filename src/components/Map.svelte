
<script>
    import * as d3 from 'd3-geo';
    const geo_data = require("../../static/diagram-data/regional/geo.json");
    export var spatial_acts = null;
    export var country_acts = null;
    export var city_acts = null;
    export var active_units_inds = [0];
    export var focus = null;

    $: console.log("city_acts", city_acts);

    var clientWidth = 0;
    $: width = clientWidth;
    $: height = clientWidth * 502 / 962;

    $: projection = d3.geoEquirectangular().scale(width / 962 * 152.63).translate([width / 2, height / 2]);
    //console.log("projection_scalle", projection.scale())
    $: path = d3.geoPath().projection(projection);
    




    function mean(L, f=null){
        if (f != null) {L = L.map(f);}
        return L.reduce((a,b) => a+b) / L.length;
    }
    function max(L, f=null){
        if (f != null) {L = L.map(f);}
        return L.reduce((a,b) => Math.max(a,b));
    }

    function acts2color(acts, selected=null){
      if (mean(acts) == 0) {return "hsl(0,0%,95%)";}
      acts = acts.map( (a,i) => {return {"value": a, "theta": i*6.28/acts.length};} );
      if (acts.length == 0) {
        acts = {"value": 0, "theta": 0};
      }
      if (selected != null) {
        acts = acts.map( (a,i) => (i==selected)? a : ({"value": 0, "theta": a.theta}) );
      }
      const meanHueX = mean(acts, a => a.value * a.value * Math.cos(a.theta));
      const meanHueY = mean(acts, a => a.value * a.value * Math.sin(a.theta));
      const meanHue = Math.atan2(meanHueY, meanHueX) / Math.PI * 180;
      
      const meanValue2 = mean(acts, a => a.value * a.value) + 0.001;
      const saturation = Math.sqrt(meanHueX * meanHueX + meanHueY * meanHueY) / meanValue2;
      const max_act = max(acts, a => a.value);
      const mean_act = mean(acts, a => a.value);
      const lightness = 1-0.6*Math.max(0.1, Math.min(1.0, 0.4*(2*max_act + mean_act)));
      const color = `hsla(${meanHue}, ${120 * saturation * saturation * saturation}%, ${100*lightness}%, 1.0)`;
      return color;
    }

    function get_acts(acts, ind, active_units_inds, multiplier=1, focus=null) {
        if (acts == null) {return [0];}
        if (ind.length == 1) {
            acts = active_units_inds.map(i =>  multiplier*acts.get(i, ind[0]) / 255.);
        } else {
            acts = active_units_inds.map(i =>  multiplier*acts.get(i, ind[0], ind[1]) / 255.);
        }
        if (focus != null) {
            acts = acts.map( (a,i) => (i==focus)? a : 0 );
        }
        return acts;
    }

    function color(acts, ind, active_units_inds, multiplier=1, focus=null) {
        acts = get_acts(acts, ind, active_units_inds, multiplier, focus);
        return acts2color(acts);
    }

    function radius(acts, ind, active_units_inds, multiplier=1, focus=null) {
        acts = get_acts(acts, ind, active_units_inds, multiplier, focus);
        return 8*0.5*(max(acts)+mean(acts));
    }

    function opacity(acts, ind, active_units_inds, multiplier=1, focus=null) {
        acts = get_acts(acts, ind, active_units_inds, multiplier, focus);
        return 0.9*0.5*(max(acts)+mean(acts));
    }

</script>

<style>
    .map-container {
        border: 1px solid #AAA;
        width: 100%;
        border-radius: 6px;
        background: #000;
        position: relative;
        overflow: hidden;
    }
    .map-container>svg, .map-container>.map-overlay {
        position: absolute;
        left: 0px;
        top: 0px;
    }
    .map-container svg .countries path {
        fill: #F3F3F3;
        stroke: #AAA;
        opacity: 0.9;
    }
    .map-container svg .cities circle {
        fill: #F3F3F3;
        stroke: #AAA;
    }
    .map-container>.map-overlay {
        display: grid;
    }
</style>

<div>
<div class='map-container' bind:clientWidth={clientWidth} style='height: {height}px;'>
    <svg width={width} height={height}>
        <g class='countries'>
            {#each geo_data["countries"] as country, country_i}
            <path d={path(country)} style="fill: {color(country_acts, [country_i], active_units_inds, 1.0, focus)};" />
            {/each}
        </g>
        <g class='cities'>
            {#each geo_data["cities"] as city, city_i}
            <circle cx={projection(city["pos"])[0]} cy={projection(city["pos"])[1]} 
            r={radius(city_acts, [city_i], active_units_inds, 1.0, focus)}
            style="fill: {color(city_acts, [city_i], active_units_inds, 1.0, focus)}; opacity: {opacity(city_acts, [city_i], active_units_inds, ( (focus==null)? 1.5 : 1.0), focus)};"
            />
            {/each}
        </g>
    </svg>
    <div class='map-overlay' style='width: {width}px; height: {height}px;'>
        {#each [...Array(spatial_acts? spatial_acts.shape[1] : 0).keys()] as x}
        {#each [...Array(spatial_acts? spatial_acts.shape[2] : 0).keys()] as y}
            <div style='grid-row: {x+1}; grid-column:{y+1}; border-left: solid 1px rgba(1,1,1,0); border-top: solid 1px rgba(1,1,1,0); background: {color(spatial_acts, [x, y], active_units_inds, 1.0, focus)}; opacity: {opacity(spatial_acts, [x, y], active_units_inds, 1.6, focus)};'></div>
        {/each}
        {/each}
    </div>
</div>
<!-- <input type=range bind:value={active_unit} min=0 max=1000 />
<div class="figcaption">
    {active_units_inds.map(i => unit_list[i][0] + ": " + unit_list[i][1]) }

    {active_units_inds.map(i => top_words[i]) }
</div> -->
</div>