
<script>
    import { onMount } from 'svelte'
    import NeuronCard from '../components/NeuronCard.svelte';
    import NeuronCardInfo from '../components/NeuronCardInfo.svelte';
    import Map from '../components/Map.svelte';
    import {microscope_url, map_url, facet_icon_url, dataset_examples_url} from '../urls.js';

    const spatial_acts_f = require("../../static/diagram-data/regional/spatial.npy");
    const country_acts_f = require("../../static/diagram-data/regional/country.npy");
    const city_acts_f = require("../../static/diagram-data/regional/city.npy");
    const unit_list = require("../../static/diagram-data/regional/units.json");
    const top_words = require("../../static/diagram-data/regional/top_words.json");
    var spatial_acts = null;
    var country_acts = null;
    var city_acts = null;
    $: spatial_acts_f.load(acts => {spatial_acts=acts;})
    $: country_acts_f.load(acts => {country_acts=acts;})
    $: city_acts_f.load(acts => {city_acts=acts;})


    let strength = 4;

    let neuron_families = [
        {
            "name": "Selected Units from 4x model",
            "neurons": [
                {"model": "4x", "unit": 862, "name": "USA?"  },
                {"model": "4x", "unit": 780, "name": "Spanish?", "warn": "Some neurons may have associations related to colonialism and shared language, such as linking South America to Spain and Portugal. Note that individual neurons don't necessarily reflect overall model behavior."  },
                {"model": "4x", "unit": 1257, "name": "West Africa?"  },
                {"model": "4x", "unit": 218, "name": "Europe?"  },
                {"model": "4x", "unit": 1067, "name": "India?"  },
                {"model": "4x", "unit": 1091, "name": "China?"  },
                {"model": "4x", "unit": 513, "name": "Australia?"  },
            ]
        },

        {
            "name": "Large Region Neurons",
            "neurons": [
                {"model": "4x", "unit": 245, "name": "Northern Hemisphere?"  },
                {"model": "4x", "unit": 734, "name": "Global?"  },
                {"model": "4x", "unit": 1511, "name": "Ocean?"  },
            ]
        },
        {
            "name": "Secondarily Regional",
            "neurons": [
                {"model": "rn101", "unit": 1268, "name": "Angels?"  },
                {"model": "rn101", "unit": 1651, "name": "Startups"  },
                {"model": "rn101", "unit": 395, "name": "immigration", "warn": "Some neurons may encode prejudices and Amerocentric views, such as linking immigration to Latin America. Note that individual neurons don't necessarily reflect overall model behavior."   },
                {"model": "rn101", "unit": 645, "name": "Great Cats?"  },
                {"model": "rn101", "unit": 1731, "name": "Cold?"  },
                {"model": "rn101", "unit": 1895, "name": "Terrorism", "warn": "Some neurons may encode prejudices and Amerocentric views, such as linking the Middle East and terrorism. Note that individual neurons don't necessarily reflect overall model behavior."  },
                {"model": "v1", "unit": 1402, "name": "Islam?"  },
                {"model": "4x", "unit": 1275, "name": "Black"  },
            ]
        },
        {
            "name": "Africa - All Modelsl",
            "neurons": [
                {"model": "4x", "unit": 1317, "name": "West Africa?"  },
                {"model": "4x", "unit": 1257, "name": "West Africa?"  },
                {"model": "4x", "unit": 1000, "name": "West Africa?"  },
                {"model": "rn50", "unit": 1405, "name": "Africa?"  },
                {"model": "rn50", "unit":  919, "name": "Africa?"  },
                {"model": "rn50", "unit": 1471, "name": "Africa?"  },
                {"model": "v1", "unit": 2006, "name": "South-West Africa"  },
                {"model": "rn101", "unit": 482, "name": "Africa?"  },
            ]
        },
        {
            "name": "Asia - All Models",
            "neurons": [
                {"model": "rn101", "unit": 858, "name": "South Asia?"  },
                {"model": "4x", "unit": 1067, "name": "India?"  },
                {"model": "rn101", "unit": 438, "name": "India?"  },
                {"model": "v1", "unit": 369, "name": "China?"  },
                {"model": "rn101", "unit": 801, "name": "East Asia?"  },
                {"model": "4x", "unit": 1091, "name": "China?"  },
                {"model": "rn50", "unit":  608, "name": "China?"  },
                {"model": "rn50", "unit": 1037, "name": "East Asia/Jpana?"  },
                {"model": "rn101", "unit": 93, "name": "East Asia?"  },
                {"model": "4x", "unit": 26, "name": "Japan"  },
                {"model": "v1", "unit": 1254, "name": "East Asia"  },

            ]
        },
        {
            "name": "Middle East - All Models",
            "neurons": [
                {"model": "v1", "unit": 1121, "name": "Arab World?"  },
                {"model": "rn101", "unit": 698, "name": "Greater Middle East?"  },
            ]
        },
        {
            "name": "Australia - All Models",
            "neurons": [
                {"model": "4x", "unit": 513, "name": "Australia?"  },
                {"model": "rn50", "unit": 1522, "name": "Australia?"  },
                {"model": "v1", "unit": 71, "name": "Australia?"  },
                {"model": "rn101", "unit": 1415, "name": "Australia?"  },
            ]
        },
        {
            "name": "Europe - All Models",
            "neurons": [
                {"model": "rn101", "unit": 836, "name": "Britain?"  },
                {"model": "4x", "unit": 2558, "name": "UK / Australia?"  },
                {"model": "rn50", "unit": 2042, "name": "UK?"  },
                {"model": "rn50", "unit":  288, "name": "Europe"  },
                {"model": "4x", "unit": 218, "name": "Europe?"  },
                {"model": "rn101", "unit": 369, "name": "Europe?"  },
                {"model": "rn50", "unit": 1068, "name": "Germany?"  },
            ]
        },
        {
            "name": "North America - All Models",
            "neurons": [
                {"model": "4x", "unit": 862, "name": "USA?"  },
                {"model": "v1", "unit": 924, "name": "USA?"  },
                {"model": "v1", "unit": 1538, "name": "West Coast? (California)"  },
                {"model": "v1", "unit": 474, "name": "West Coast? (Oregon-BC)"  },
                {"model": "v1", "unit": 1445, "name": "West Coast? (California)"  },
                {"model": "rn101", "unit": 1728, "name": "California?"  },
                {"model": "rn101", "unit": 943, "name": "Canada?"  },
                {"model": "rn101", "unit": 86, "name": "USA?"  },
                {"model": "rn101", "unit": 1026, "name": "USA?"  },
                {"model": "rn101", "unit": 1768, "name": "USA?"  },
                {"model": "rn101", "unit": 1791, "name": "USA?"  },
                {"model": "rn101", "unit": 417, "name": "USA?"  },
                {"model": "rn101", "unit": 1480, "name": "Canada?" }
            ]
        },
        {
            "name": "South/Central America - All Models",
            "neurons": [
                {"model": "v1", "unit": 2032, "name": "Latin America?"  },
                {"model": "v1", "unit": 376, "name": "Latin America?"  },
            ]
        },














        {
            "name": "4x - all",
            "neurons": [
                {"model": "4x", "unit": 862, "name": "USA?"  },
                {"model": "4x", "unit": 1317, "name": "West Africa?"  },
                {"model": "4x", "unit": 1257, "name": "West Africa?"  },
                {"model": "4x", "unit": 1000, "name": "West Africa?"  },
                {"model": "4x", "unit": 2558, "name": "UK / Australia?"  },
                {"model": "4x", "unit": 218, "name": "Europe?"  },
                {"model": "4x", "unit": 1067, "name": "India?"  },
                {"model": "4x", "unit": 26, "name": "Japan"  },
                {"model": "4x", "unit": 1091, "name": "China?"  },
                {"model": "4x", "unit": 1601, "name": "Japan?"  },
                {"model": "4x", "unit": 513, "name": "Australia?"  },
                {"model": "4x", "unit": 734, "name": "Global?"  },
                {"model": "4x", "unit": 1980, "name": "leaedership/democracy?"  },
                {"model": "4x", "unit": 2247, "name": "biodiversity?"  },
                {"model": "4x", "unit": 686, "name": "community?"  },
                {"model": "4x", "unit": 780, "name": "Spanish?"  },
                {"model": "4x", "unit": 1511, "name": "Ocean?"  },
            ]
        },
        {
            "name": "rn50",
            "neurons": [
                {"model": "rn50", "unit": 1405, "name": "Africa?"  },
                {"model": "rn50", "unit":  919, "name": "Africa?"  },
                {"model": "rn50", "unit": 1471, "name": "Africa?"  },
                {"model": "rn50", "unit":  288, "name": "Europe"  },
                {"model": "rn50", "unit": 1068, "name": "Germany?"  },
                {"model": "rn50", "unit": 2042, "name": "UK?"  },
                {"model": "rn50", "unit":  608, "name": "China?"  },
                {"model": "rn50", "unit": 1037, "name": "East Asia/Jpana?"  },
                {"model": "rn50", "unit": 1522, "name": "Australia?"  },
            ]
        },
        {
            "name": "v1",
            "neurons": [
                {"model": "v1", "unit": 1445, "name": "West Coast? (California)"  },
                {"model": "v1", "unit": 1538, "name": "West Coast? (California)"  },
                {"model": "v1", "unit": 924, "name": "USA?"  },
                {"model": "v1", "unit": 474, "name": "West Coast? (Oregon-BC)"  },
                {"model": "v1", "unit": 376, "name": "Latin America?"  },
                {"model": "v1", "unit": 2032, "name": "Latin America?"  },


                {"model": "v1", "unit": 2006, "name": "South-West Africa"  },
                {"model": "v1", "unit": 1121, "name": "Arab World?"  },
                {"model": "v1", "unit": 1402, "name": "Islam?"  },
                {"model": "v1", "unit": 369, "name": "China?"  },
                {"model": "v1", "unit": 1254, "name": "East Asia"  },
                {"model": "v1", "unit": 71, "name": "Australia?"  },
            ]
        },
        {
            "name": "rn101 - all primary",
            "neurons": [
                {"model": "rn101", "unit": 1728, "name": "California?"  },
                {"model": "rn101", "unit": 943, "name": "Canada?"  },
                {"model": "rn101", "unit": 86, "name": "USA?"  },
                {"model": "rn101", "unit": 1026, "name": "USA?"  },
                {"model": "rn101", "unit": 1768, "name": "USA?"  },
                {"model": "rn101", "unit": 1791, "name": "USA?"  },
                {"model": "rn101", "unit": 417, "name": "USA?"  },
                {"model": "rn101", "unit": 1480, "name": "Canada?"  },
                {"model": "rn101", "unit": 836, "name": "Britain?"  },
                {"model": "rn101", "unit": 369, "name": "Europe?"  },

                {"model": "rn101", "unit": 482, "name": "Africa?"  },
                {"model": "rn101", "unit": 698, "name": "Greater Middle East?"  },
                {"model": "rn101", "unit": 438, "name": "India?"  },
                {"model": "rn101", "unit": 858, "name": "South Asia?"  },
                {"model": "rn101", "unit": 801, "name": "East Asia?"  },
                {"model": "rn101", "unit": 93, "name": "East Asia?"  },

                {"model": "rn101", "unit": 1415, "name": "Australia?"  },
            ]
        },
        {
            "name": "rn101 - all secondary",
            "neurons": [
                {"model": "rn101", "unit": 1268, "name": "Angels?"  },
                {"model": "rn101", "unit": 1651, "name": "Startups"  },
                {"model": "rn101", "unit": 1543, "name": "Male WASP names"  },
                {"model": "rn101", "unit": 395, "name": "immigration"  },
                {"model": "rn101", "unit": 645, "name": "Great Cats?"  },
                {"model": "rn101", "unit": 1731, "name": "Cold?"  },
                {"model": "rn101", "unit": 1895, "name": "Terrorism"  },
            ]
        }
    ]
    let selected_family=0;
    $: neurons = neuron_families[selected_family].neurons;
    $: neuron_indices = neurons.map( neuron => {
            let model = "contrastive_" + ((neuron["model"] == "rn101")? "v2" : neuron["model"]);
            let matches = unit_list.filter(x => x[0] == model && x[1] == neuron["unit"])
            return matches? unit_list.indexOf(matches[0]) : -1;
        });

    let facets = [
        {"name": 'text', "fancy_name": "Text Facet"},
        {"name": 'face', "fancy_name": "Face Facet"},
        {"name": 'arch', "fancy_name": "Architecture Facet"},
        //{"name": 'indoor'},
        {"name": 'logo', "fancy_name": "Logo Facet"},
        //{"name": 'nature'},
        ];

    let active = null;
    let active_unsetter = null;
    let debounce_blocker = false;
    function enter(i){
        if (debounce_blocker) return;
        if (active_unsetter != null) {clearTimeout(active_unsetter)};
        active=i;
    }
    function leave(){
        active_unsetter = setTimeout(() => {active=null;}, 70)
    }
    const map_modes = [
        {"name": "geography", "description": "<b>Unlabeled map activations</b>: Spatial activations of neurons in response to unlabeled geographical world map. Activations averaged over random crops. Note that neurons for smaller countries or cities may not respond to maps this zoomed out."},
        {"name": "countries", "description": "<b>Country name activations</b>: Countries colored by activations of neurons in response to rastered images of country names. Activations averaged over font sizes, max over word positions."},
        {"name": "cities", "description": "<b>City name activations</b>: Cities colored by activations of neurons in response to rastered images of city names. Activations averaged over font sizes, max over word positions."}
    ]
    let map_mode = "geography";



    function setRegionalState(map_mode_, selected_family_=null, active_=null) {
        debounce_blocker=true;
        setTimeout(() => {debounce_blocker=false;}, 20);
        if (map_mode_ != null) { map_mode = map_mode_;}
        if (selected_family_ != null) { selected_family = selected_family_;}
        active = active_;
    }
    onMount((x) => {window.setRegionalState = setRegionalState})
</script>


<style>
    .figure-anchor {
        font-weight: bold;
    }
    .container {
        display: grid;
        grid-template-columns:
            [label label-major] minmax(80px, 200px)
            minmax(4px,16px) [label-major-line] 1px minmax(4px,8px)
            [label-minor] 80px [label-end]
            minmax(4px,16px)
            [map-start title-start caption-start]
                /* repeat( var(--num-neurons), [neuron] calc( calc( 6 *  100px) / var(--num-neurons) ) ) */
                repeat( var(--num-neurons), [neuron] 100px )
            [map-end title-end caption-end];
        grid-template-rows:
            [title] auto 4px [map] auto 16px
            [neuron-title] auto 4px [color] auto 4px [top-words] auto 4px
            [facets-start]
                repeat(4, [facet] auto) [overflow] auto
            [facets-end]
            16px [caption] auto;
        grid-gap: 4px;
        width: fit-content;
        width: max-content;
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
    .pseudo-link {
        cursor: pointer;
        text-decoration: underline;
    }
    select {
        border-radius: 2px; border: 1px solid #AAA;
    }
    .figlabel {
        line-height: 130%; margin-bottom: 8px;
    }
    /* .map-mode-option.active::before {
        width: 6px;
        height: 6px;
        border-radius: 4px;
        border: 2px solid hsla(40, 0%, 60%, 1.0);
        display: inline-block;
        content: "";
        background: hsla(40, 100%, 60%, 1.0);
        margin-right: 8px;
    } */
    .map-mode-option {
        border-radius: 2px;
        overflow: hidden;
        display: grid;
        grid-template-columns: 4px auto;
        margin-bottom: 12px;
        grid-gap: 4px;
        cursor: pointer;
        border-radius: 4px;
    }
    .map-mode-option .option-line {
        height: 100%;
        width: 100%;
    }
    .map-mode-option .figcaption {
        height: 100%;
        width: calc(100% - 16px);
        padding: 8px;
    }

    .map-mode-option:not(.selected)                    { background: hsl(0, 0%, 96%); opacity: 0.4;}
    .map-mode-option:not(.selected) .option-line       { background: hsl(0, 0%, 80%); }

    .map-mode-option.selected                          { background: #EEE; }
    .map-mode-option.selected .option-line             { background: hsl(0, 0%,  0%);}

    .map-mode-option:not(.selected):hover              { opacity: 1.0;}
    .map-mode-option:not(.selected):hover .option-line { background: hsl(0, 0%, 70%); }

    .map-mode-option.selected:hover                    { background: hsl(0, 0%, 90%);}
</style>

<div class='container' style='--num-neurons:{(neurons.length > 7)? neurons.length : 7};'>

    <!--<div style='grid-area: title'>Selected Regional Neurons on World Map</div>-->

    <div style='grid-area: title; border-bottom: 1px solid #DDD; max-width: 724px;'>
        Geographical Activation of Region Neurons
    </div>

    <div style='grid-column: label; grid-row: map; max-width: 340px;'>
    {#each map_modes as mode, i}
    <div class='map-mode-option {(map_mode==mode.name)? "selected" : ""}' on:click={() => {map_mode=mode.name;}}>
        <div class='option-line'></div>
        <div class='figcaption'>{@html mode.description}</div>
    </div>
    {/each}
    </div>


    <div style="grid-area: map; max-width: 724px;">
        <Map
            spatial_acts={(map_mode == "geography")? spatial_acts : null}
            country_acts={(map_mode == "countries")? country_acts : null}
            city_acts={(map_mode == "cities")? city_acts : null}
            active_units_inds={neuron_indices}
            focus={(active!=null)? active : null}
            warn_message={(active!=null && neurons[active]["warn"])? neurons[active]["warn"] : null}
            />
    </div>

    <div style='grid-column: title; grid-row: neuron-title; border-bottom: 1px solid #DDD;'>
        Selected Region Neurons
    </div>

    <!--<div style='grid-column: label; grid-row: color; line-height: 100%;'>
        Color Key
    </div>-->

    <div style='grid-column: label; grid-row: top-words; max-width: 340px;'>
        <div class='figlabel'>Most Activating Words</div>
        <div class='figcaption'>
            Words which most activate these neurons when rastered into images, out of 10,000 most common English words.
        </div>
    </div>

    {#each neurons as neuron, neuron_i}
    <a
        href="{microscope_url(neuron)}"
        class="img-link"
        style="grid-column: neuron {neuron_i+1}; grid-row: color; {(active != null && active != neuron_i)? 'opacity: 0.25;' : ''}"
        on:mouseover={() => enter(neuron_i)} on:mouseout={leave} >
    <div
        style="background: hsl({360*neuron_i/neurons.length}, 80%, 50%);" class='color-label'>
        <!--{neuron.name}-->
    </div>
    </a>
    <a
    href="{microscope_url(neuron)}"
    class="img-link"
    style="grid-column: neuron {neuron_i+1}; grid-row: top-words; {(active != null && active != neuron_i)? 'opacity: 0.25;' : ''}"
    on:mouseover={() => enter(neuron_i)} on:mouseout={leave} >
    <div class='figcaption' style='background:#EEE; padding: 6px; border-radius: 2px;'>{(neuron_indices[neuron_i] != -1)? top_words[neuron_indices[neuron_i]].slice(0,5).join(", ") : ""}</div>

</a>
    {/each}

    {#each facets as facet, facet_i}{#each neurons as neuron, neuron_i}
    <div style="grid-column: neuron {neuron_i+1}; grid-row: facet {facet_i+1}; {(active != null && active != neuron_i)? 'opacity: 0.25;' : ''}"
    on:mouseover={() => enter(neuron_i)} on:mousemove={() => enter(neuron_i)} on:mouseout={leave}>
        <NeuronCard neuron={neuron} facets={[facet]} fv={true} ds={false} />
    </div>

    {/each}{/each}

    <div style="grid-column: label-major; grid-row: facets;" >
        <div class='figlabel'>Faceted Feature Visualizations</div>
        <div class='figcaption'>Regional neurons respond to many different kinds of images related to their region. <a href="#faceted-feature-visualization">Faceted feature visualization</a> allows us to see some of this diversity.</div>
        <div class='figcaption' style='margin-top: 8px;'>Hover on a neuron to isolate activations. Click to open in Microscope.</div>
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

    <div style='grid-area: caption; max-width: 800px;' class='figcaption'>
        <a href='#region-neuron-diagram' class='figure-anchor'>Figure 6:</a> This diagram contextualizes region neurons with a map.
        Each neuron is mapped to a hue, and then regions where it activates are colored in that hue, with intensity proportional to activiation. If multiple neurons of opposing hues fire, the region will be colored in a desaturated gray.
        It can show their response
        to an <span class="pseudo-link" on:click={() => {map_mode = "geography";}}>unlabeled geographical map</span>,
        to <span class="pseudo-link" on:click={() => {map_mode = "countries";}}>country names</span>,
        and to <span class="pseudo-link" on:click={() => {map_mode = "cities";}}>city names</span>.

        <br/> <br/>

        In addition to the neurons shown by default, a variety of neurons are available from four different CLIP models:
        <select class='figcaption' bind:value={selected_family} >
        {#each neuron_families as family, i}
        <option value={i}>{family.name}</option>
        {/each}
        </select>. We particularly recommend looking at the
        "<span class="pseudo-link" on:click={() => {selected_family=1; active=null;}}>large region neurons</span>"
        (such as the "<span class="pseudo-link" on:click={() => {selected_family=1; active=0;}}>Northern Hemisphere</span>" neuron)
        and at
        "<span class="pseudo-link" on:click={() => {selected_family=2; active=null;}}>secondarily regional neurons</span>"
        (neurons which seem to be primarily about a concept we wouldn't typically conceptualize as geographic such as
        "<span class="pseudo-link" on:click={() => {selected_family=2; active=1;}}>entrepreneurship</span>"
        or
        "<span class="pseudo-link" on:click={() => {selected_family=2; active=6;}}>terrorism</span>").
    </div>
</div>
