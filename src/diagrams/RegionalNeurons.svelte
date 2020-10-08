
<script>
    import NeuronCard from '../components/NeuronCard.svelte';
    import NeuronCardInfo from '../components/NeuronCardInfo.svelte';
    import {microscope_url, map_url, facet_icon_url, dataset_examples_url} from '../urls.js';
    let strength = 4;

    let neuron_families = [
        {
            name: "4x model - medium sized regions",
            neurons: [ 
                {"model": "4x", "unit": 862, name: "USA?", top_words: "americans, american, america, usa, americas"}, // USA
                //{"model": "4x", "unit": 1317, name: "West Africa?", top_words: "zimbabwe, tanzania, uganda, rwanda, kenya"},
                {"model": "4x", "unit": 1257, name: "West Africa?", top_words: "ghana, uganda, africa, tanzania, african"},
                //{"model": "4x", "unit": 2558, name: "UK / Australia?", top_words: "britain, london, scottish, yorkshire, canberra"}, 
                //{"model": "4x", "unit": 2063, name: "France?", top_words: "pierre, notre, rouge, voyeur, mardi"},  // no map
                //{"model": "4x", "unit": 309, name: "Germany?", top_words: "deutschland, deutsche, volkswagen, deutsch"}, // no map
                {"model": "4x", "unit": 218, name: "Europe?", top_words: "netherlands, luxembourg, stockholm, amsterdam, switzerland"}, 
                {"model": "4x", "unit": 1067, name: "India?", top_words: "mumbai, singh, pakistan, afghanistan, bangladesh"},
                //{"model": "4x", "unit": 26, name: "Japan", top_words: "hentai, korea, tokyo, korean, yen"},
                {"model": "4x", "unit": 1091, name: "China?", top_words: "shanghai, vietnamese, asian, cambodia, chinese"},
                //{"model": "4x", "unit": 1601, name: "Japan?", top_words: "xnxx, pn, dx, egypt, uzbekistan"},
                {"model": "4x", "unit": 513, name: "Australia?", top_words: "australian, australia, adelaide, nsw, queensland"},
            ]
        },
        {
            name: "Latitude Neurons",
            neurons: [
                {"model": "4x", "unit": 245, name: "Northern Hemisphere?", top_words: "saskatchewan, norwegian, newfoundland, wisconsin, vancouver"},
                {"model": "rn50", "unit": 542, name: "Equator?", top_words: ""},
                //{"model": "v1", "unit": 1220, name: "Tropical?", top_words: ""},
            ]
        },
        {
            name: "Secondarily Regional",
            neurons: [
                {"model": "rn101", "unit": 645, name: "Great Cats?", top_words: ""},
                {"model": "4x", "unit": 1275, name: "Black", top_words: ""},
                //{"model": "4x", "unit": 1428, name: "Lion / Wildlife"}, // no map
            ]
        }
    ]
    let selected_family=0;
    $: console.log(selected_family)
    $: neurons = neuron_families[selected_family].neurons;

    let facets = [
        {"name": 'text', "fancy_name": "Text Facet"},
        {"name": 'face', "fancy_name": "Face Facet"},
        {"name": 'arch', "fancy_name": "Architecture Facet"},
        //{"name": 'indoor'},
        {"name": 'logo', "fancy_name": "Logo Facet"},
        //{"name": 'nature'},
        ];

    let active = undefined;
    let active_unsetter = undefined;
    function enter(i){
        if (active_unsetter != undefined) {clearTimeout(active_unsetter)};
        active=i;
    }
    function leave(){
        active_unsetter = setTimeout(() => {active=undefined;}, 50)
    }
</script>


<style>
    .container {
        display: grid;
        grid-template-columns: 
            [label label-major] minmax(80px, 200px) 
            minmax(4px,16px) [label-major-line] 1px minmax(4px,16px) 
            [label-minor] 80px [label-end] 
            minmax(4px,16px)  
            [map-start title-start caption-start] 
                repeat( var(--num-neurons), [neuron] calc( calc( 6 *  100px) / var(--num-neurons) ) )
            [map-end title-end caption-end];
        grid-template-rows: 
            [title] auto [map] auto 4px 
            [color] auto 4px [top-words] auto 4px
            [facets-start] 
                repeat(4, [facet] auto) [overflow] auto 
            [facets-end] 
            8px [caption] auto;
        grid-gap: 4px;
        width: fit-content;
        max-width: 100%;
        margin: auto;
    }
    .map {
        grid-area: map;
    }
    .neuron-facet, .map, .map-img {
        border-radius: 2px;
        background: #AAA;
    }
    .neuron-facet {
        max-width: 128px;
    }
    .map-img{
        mix-blend-mode: multiply;
        display: block;
        filter: grayscale(100%) brightness(110%) contrast(110%);
    }
    .color-label { 
        border-radius: 2px; 
        font-size: 60%; 
        padding: 6px; 
        line-height: 100%; 
        color: #EEE;
    }
    .img-link {
        border: none;
        display: inherit;
    }
    select {
        border-radius: 2px; border: 1px solid #AAA;
    }
    .figlabel {
        line-height: 130%; margin-bottom: 8px;
    }
</style>



<div class='container' style='--num-neurons:{(neurons.length > 4)? neurons.length : 4};'>

    <!--<div style='grid-area: title'>Selected Regional Neurons on World Map</div>-->

    <div style='grid-column: label; grid-row: map; max-width: 300px;'>
        <div class='figlabel'>World Map Activations</div>
        <div class='figcaption'>
            Activations of neurons in response to unlabeled world map. Activations averaged over random crops.
        </div>
    </div>

    
    {#if active == undefined}
        <div style="background: #000; grid-area: map;">
            <img style='opacity: 0.15; display: block;'
            src="http://storage.googleapis.com/openai-clarity/colah/multimodal-vis/maps_data/geographical/map.png"
            alt="map">
        </div>
        {#each neurons as neuron, neuron_i}
            <div style="background: hsl({360*neuron_i/neurons.length}, 80%, 50%); mix-blend-mode: lighten; grid-area: map;">
                <img class="map-img"
                src="{map_url(neuron)}"
                alt="map">
            </div>
        {/each}
    {:else}
        <img style='grid-area: map;'
        src="{map_url(neurons[active])}"
        alt="map">
    {/if}
    

    <div style='grid-column: label; grid-row: top-words; max-width: 300px;'>
        <div class='figlabel'>Most Activating Words</div>
        <div class='figcaption'>
            Words which most activate these neurons when rastered into images, out of 10,000 most common English words.
        </div>
    </div>

    {#each neurons as neuron, neuron_i}
    <a 
        href="{microscope_url(neuron)}" 
        class="img-link"
        style="grid-column: neuron {neuron_i+1}; grid-row: color; {(active != undefined && active != neuron_i)? 'opacity: 0.25;' : ''}"
        on:mouseover={() => enter(neuron_i)} on:mouseout={leave} >
    <div 
        style="background: hsl({360*neuron_i/neurons.length}, 80%, 50%);" class='color-label'>
        <!--{neuron.name}-->
    </div>
    </a>
    <a 
    href="{microscope_url(neuron)}" 
    class="img-link"
    style="grid-column: neuron {neuron_i+1}; grid-row: top-words; {(active != undefined && active != neuron_i)? 'opacity: 0.25;' : ''}"
    on:mouseover={() => enter(neuron_i)} on:mouseout={leave} >
    <div class='figcaption' style='background:#EEE; padding: 6px; border-radius: 2px;'>{neuron.top_words}</div>
    
</a>
    {/each}
    
    {#each facets as facet, facet_i}{#each neurons as neuron, neuron_i}
    <div style="grid-column: neuron {neuron_i+1}; grid-row: facet {facet_i+1}; {(active != undefined && active != neuron_i)? 'opacity: 0.25;' : ''}"
    on:mouseover={() => enter(neuron_i)} on:mouseout={leave}>
        <NeuronCard neuron={neuron} facets={[facet]} fv={true} ds={false} />
    </div>

    {/each}{/each}

    <div style="grid-column: label-major; grid-row: facets;" >
        <div class='figlabel'>Faceted Feature Visualizations</div>
        <div class='figcaption'>Regional neurons respond to many different kinds of images related to their region. Faceted feature visualiziation allow us to see some of this diversity.</div>
        <!-- by creating stimuli that activate a given neuron <em>through a specified set of lower-level neurons</em> associated with a facet.-->
        <br>
        <!--<NeuronCardInfo fv={true} ds={false} /> -->
    </div>

    <div style="grid-column: label-major-line; grid-row: facets; border-right: 1px solid #DDD;"></div>

    {#each facets as facet, facet_i}
    <div style="grid-column: label-minor; grid-row: facet {facet_i+1};" class='figcaption'>
        <div>{facet.fancy_name}</div>
    </div>
    {/each}

    <div style='grid-area: caption;' class='figcaption'>
        <a href='#' class='figure-anchor'>Figure N:</a>

        <br><br>
        Displayed neurons: <select 
        class='figcaption' 
        bind:value={selected_family}
    >
        {#each neuron_families as family, i}
        <option value={i}>{family.name}</option>
        {/each}
    </select>
    </div>

</div>

