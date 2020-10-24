
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
            "name": "Selected Units form 4x model",
            "neurons": [ 
                {"model": "4x", "unit": 862, "name": "USA?", "top_words": "americans, american, america, usa, americas"},
                {"model": "4x", "unit": 780, "name": "Spanish?", "top_words": ""},
                {"model": "4x", "unit": 1257, "name": "West Africa?", "top_words": "ghana, uganda, africa, tanzania, african"},
                {"model": "4x", "unit": 218, "name": "Europe?", "top_words": "netherlands, luxembourg, stockholm, amsterdam, switzerland"}, 
                {"model": "4x", "unit": 1067, "name": "India?", "top_words": "mumbai, singh, pakistan, afghanistan, bangladesh"},
                {"model": "4x", "unit": 1091, "name": "China?", "top_words": "shanghai, vietnamese, asian, cambodia, chinese"},
                {"model": "4x", "unit": 513, "name": "Australia?", "top_words": "australian, australia, adelaide, nsw, queensland"},
            ]
        },

        {
            "name": "Latitude Neurons",
            "neurons": [
                {"model": "4x", "unit": 245, "name": "Northern Hemisphere?", "top_words": "saskatchewan, norwegian, newfoundland, wisconsin, vancouver"},
                {"model": "4x", "unit": 734, "name": "Global?", "top_words": ""},
                {"model": "4x", "unit": 1511, "name": "Ocean?", "top_words": ""},
            ]
        },
        {
            "name": "Secondarily Regional",
            "neurons": [
                {"model": "rn101", "unit": 1268, "name": "Angels?", "top_words": "angel, angels, wings, heaven, angeles"},
                {"model": "rn101", "unit": 1651, "name": "Startups", "top_words": "entrepreneurs, entrepreneur, founder, startup, starter"},
                {"model": "rn101", "unit": 395, "name": "immigration", "top_words": "immigrants, immigration, borders, border, refugees"},
                {"model": "rn101", "unit": 645, "name": "Great Cats?", "top_words": "lions, jaguar, tigers, eagles, tiger"},
                {"model": "rn101", "unit": 1731, "name": "Cold?", "top_words": "blanket, jackets, jacket, wrap, arctic"},
                {"model": "rn101", "unit": 1895, "name": "Terrorism", "top_words": "saudi, terrorists, terrorism, terrorist, allah"},
                {"model": "v1", "unit": 1402, "name": "Islam?", "top_words": "muslims, muslim, allah, islamic, islam"},
                {"model": "4x", "unit": 1275, "name": "Black", "top_words": "muslims, somalia, ethiopia, aboriginal, muslim, ethnic, caribbean, racial"},
            ]
        },
        {
            "name": "Africa - All Modelsl",
            "neurons": [ 
                {"model": "4x", "unit": 1317, "name": "West Africa?", "top_words": "zimbabwe, tanzania, uganda, rwanda, kenya"},
                {"model": "4x", "unit": 1257, "name": "West Africa?", "top_words": "ghana, uganda, africa, tanzania, african"},
                {"model": "4x", "unit": 1000, "name": "West Africa?", "top_words": "zimbabwe, botswana, namibia, mozambique, malawi,"},
                {"model": "rn50", "unit": 1405, "name": "Africa?", "top_words": "ghana, african, uganda, kenya, africa"},
                {"model": "rn50", "unit":  919, "name": "Africa?", "top_words": "zimbabwe, nigeria, african, uganda, malawi"},
                {"model": "rn50", "unit": 1471, "name": "Africa?", "top_words": "zimbabwe, uganda, nigeria, rwanda, revenue"},
                {"model": "v1", "unit": 2006, "name": "South-West Africa", "top_words": "zimbabwe, cape, malawi, african, mozambique"},
                {"model": "rn101", "unit": 482, "name": "Africa?", "top_words": "zimbabwe, nigeria, botswana, kenya, uganda"},
            ]
        },
        {
            "name": "Asia - All Models",
            "neurons": [
                {"model": "rn101", "unit": 858, "name": "South Asia?", "top_words": "singh, mumbai, pakistan, hindu, shanghai"},
                {"model": "4x", "unit": 1067, "name": "India?", "top_words": "mumbai, singh, pakistan, afghanistan, bangladesh"},
                {"model": "rn101", "unit": 438, "name": "India?", "top_words": "hindu, reliance, india, delhi, singh"},
                {"model": "v1", "unit": 369, "name": "China?", "top_words": "chinese, china, shanghai, hong, wang"},
                {"model": "rn101", "unit": 801, "name": "East Asia?", "top_words": "shanghai, chinese, beijing, china, vietnam"},
                {"model": "4x", "unit": 1091, "name": "China?", "top_words": "shanghai, vietnamese, asian, cambodia, chinese"},
                {"model": "rn50", "unit":  608, "name": "China?", "top_words": "chinese, china, japanese, beijing, shanghai"},
                {"model": "rn50", "unit": 1037, "name": "East Asia/Jpana?", "top_words": "hawaii, mitsubishi, tokyo, fujitsu, suzuki"},
                {"model": "rn101", "unit": 93, "name": "East Asia?", "top_words": "indonesia, indonesian, bangkok, malaysia, thailand"},
                {"model": "4x", "unit": 26, "name": "Japan", "top_words": "hentai, korea, tokyo, korean, yen"},
                {"model": "v1", "unit": 1254, "name": "East Asia", "top_words": "korea, vietnam, korean, vietnamese, asian"},
                
            ]
        },
        {
            "name": "Middle East - All Models",
            "neurons": [
                {"model": "v1", "unit": 1121, "name": "Arab World?", "top_words": "allah, ali, saudi, somalia, al"},
                {"model": "rn101", "unit": 698, "name": "Greater Middle East?", "top_words": "pakistan, yemen, baghdad, uzbekistan, bangladesh"},
            ]
        },
        {
            "name": "Australia - All Models",
            "neurons": [ 
                {"model": "4x", "unit": 513, "name": "Australia?", "top_words": "australian, australia, adelaide, nsw, queensland"}, 
                {"model": "rn50", "unit": 1522, "name": "Australia?", "top_words": "melbourne, australia, australian, sydney, adelaide"},
                {"model": "v1", "unit": 71, "name": "Australia?", "top_words": "australia, australian, nsw, adelaide, nz"},
                {"model": "rn101", "unit": 1415, "name": "Australia?", "top_words": "brisbane, melbourne, australian, canberra, australia"},
            ]
        },
        {
            "name": "Europe - All Models",
            "neurons": [ 
                {"model": "rn101", "unit": 836, "name": "Britain?", "top_words": "britain, westminster, british, london, uk"},
                {"model": "4x", "unit": 2558, "name": "UK / Australia?", "top_words": "britain, london, scottish, yorkshire, canberra"}, 
                {"model": "rn50", "unit": 2042, "name": "UK?", "top_words": "glasgow, amsterdam, barcelona, deutsche, liechtenstein"},
                {"model": "rn50", "unit":  288, "name": "Europe", "top_words": "european, europe, people, euro, eu"},
                {"model": "4x", "unit": 218, "name": "Europe?", "top_words": "netherlands, luxembourg, stockholm, amsterdam, switzerland"},
                {"model": "rn101", "unit": 369, "name": "Europe?", "top_words": "european, europe, brussels, euro, euros"},
                {"model": "rn50", "unit": 1068, "name": "Germany?", "top_words": "deutsche, deutschland, liechtenstein, deutsch, volkswagen"},
            ]
        },
        {
            "name": "North America - All Models",
            "neurons": [ 
                {"model": "4x", "unit": 862, "name": "USA?", "top_words": "americans, american, america, usa, americas"}, 
                {"model": "v1", "unit": 924, "name": "USA?", "top_words": "usa, america, americas, americans, american"},
                {"model": "v1", "unit": 1538, "name": "West Coast? (California)", "top_words": "california, angeles, san, usc, hollywood"},
                {"model": "v1", "unit": 474, "name": "West Coast? (Oregon-BC)", "top_words": "oregon, seattle, portland, utah, colorado"},
                {"model": "v1", "unit": 1445, "name": "West Coast? (California)", "top_words": "angeles, francisco, mls, atlanta, philadelphia"},
                {"model": "rn101", "unit": 1728, "name": "California?", "top_words": "hollywood, california, postposted, angeles, lost"},
                {"model": "rn101", "unit": 943, "name": "Canada?", "top_words": "canada, canadian, alberta, manitoba, ontario"},
                {"model": "rn101", "unit": 86, "name": "USA?", "top_words": "minnesota, wisconsin, nebraska, oklahoma, kentucky"},
                {"model": "rn101", "unit": 1026, "name": "USA?", "top_words": "wisconsin, minnesota, nebraska, iowa, missouri"},
                {"model": "rn101", "unit": 1768, "name": "USA?", "top_words": "usa, americans, america, american, americas"},
                {"model": "rn101", "unit": 1791, "name": "USA?", "top_words": "michigan, oregon, alabama, nebraska, iowa"},
                {"model": "rn101", "unit": 417, "name": "USA?", "top_words": "minnesota, washington, metabolism, sacramento, wisconsin"},
                {"model": "rn101", "unit": 1480, "name": "Canada?", "top_words": "vancouver, ontario, toronto, manitoba, ottawa"},          
            ]
        },
        {
            "name": "South/Central America - All Models",
            "neurons": [ 
                {"model": "v1", "unit": 2032, "name": "Latin America?", "top_words": "argentina, ecuador, trinidad, una, para"},
                {"model": "v1", "unit": 376, "name": "Latin America?", "top_words": "mexican, mexico, spanish, chile, cuba"},
            ]
        },


                

                
            
                


    

                


        {
            "name": "4x - all",
            "neurons": [ 
                {"model": "4x", "unit": 862, "name": "USA?", "top_words": "americans, american, america, usa, americas"},
                {"model": "4x", "unit": 1317, "name": "West Africa?", "top_words": "zimbabwe, tanzania, uganda, rwanda, kenya"},
                {"model": "4x", "unit": 1257, "name": "West Africa?", "top_words": "ghana, uganda, africa, tanzania, african"},
                {"model": "4x", "unit": 1000, "name": "West Africa?", "top_words": "zimbabwe, botswana, namibia, mozambique, malawi,"},
                {"model": "4x", "unit": 2558, "name": "UK / Australia?", "top_words": "britain, london, scottish, yorkshire, canberra"}, 
                {"model": "4x", "unit": 218, "name": "Europe?", "top_words": "netherlands, luxembourg, stockholm, amsterdam, switzerland"}, 
                {"model": "4x", "unit": 1067, "name": "India?", "top_words": "mumbai, singh, pakistan, afghanistan, bangladesh"},
                {"model": "4x", "unit": 26, "name": "Japan", "top_words": "hentai, korea, tokyo, korean, yen"},
                {"model": "4x", "unit": 1091, "name": "China?", "top_words": "shanghai, vietnamese, asian, cambodia, chinese"},
                {"model": "4x", "unit": 1601, "name": "Japan?", "top_words": "xnxx, pn, dx, egypt, uzbekistan"},
                {"model": "4x", "unit": 513, "name": "Australia?", "top_words": "australian, australia, adelaide, nsw, queensland"}, 
                {"model": "4x", "unit": 734, "name": "Global?", "top_words": ""},
                {"model": "4x", "unit": 1980, "name": "leaedership/democracy?", "top_words": ""},
                {"model": "4x", "unit": 2247, "name": "biodiversity?", "top_words": ""},
                {"model": "4x", "unit": 686, "name": "community?", "top_words": ""},
                {"model": "4x", "unit": 780, "name": "Spanish?", "top_words": ""},
                {"model": "4x", "unit": 1511, "name": "Ocean?", "top_words": ""},
            ]
        },
        {
            "name": "rn50",
            "neurons": [
                {"model": "rn50", "unit": 1405, "name": "Africa?", "top_words": "ghana, african, uganda, kenya, africa"},
                {"model": "rn50", "unit":  919, "name": "Africa?", "top_words": "zimbabwe, nigeria, african, uganda, malawi"},
                {"model": "rn50", "unit": 1471, "name": "Africa?", "top_words": "zimbabwe, uganda, nigeria, rwanda, revenue"},
                {"model": "rn50", "unit":  288, "name": "Europe", "top_words": "european, europe, people, euro, eu"},
                {"model": "rn50", "unit": 1068, "name": "Germany?", "top_words": "deutsche, deutschland, liechtenstein, deutsch, volkswagen"},
                {"model": "rn50", "unit": 2042, "name": "UK?", "top_words": "glasgow, amsterdam, barcelona, deutsche, liechtenstein"},
                {"model": "rn50", "unit":  608, "name": "China?", "top_words": "chinese, china, japanese, beijing, shanghai"},
                {"model": "rn50", "unit": 1037, "name": "East Asia/Jpana?", "top_words": "hawaii, mitsubishi, tokyo, fujitsu, suzuki"},
                {"model": "rn50", "unit": 1522, "name": "Australia?", "top_words": "melbourne, australia, australian, sydney, adelaide"},
            ]
        },
        {
            "name": "v1",
            "neurons": [
                {"model": "v1", "unit": 1445, "name": "West Coast? (California)", "top_words": "angeles, francisco, mls, atlanta, philadelphia"},
                {"model": "v1", "unit": 1538, "name": "West Coast? (California)", "top_words": "california, angeles, san, usc, hollywood"},
                {"model": "v1", "unit": 924, "name": "USA?", "top_words": "usa, america, americas, americans, american"},
                {"model": "v1", "unit": 474, "name": "West Coast? (Oregon-BC)", "top_words": "oregon, seattle, portland, utah, colorado"},
                {"model": "v1", "unit": 376, "name": "Latin America?", "top_words": "mexican, mexico, spanish, chile, cuba"},
                {"model": "v1", "unit": 2032, "name": "Latin America?", "top_words": "argentina, ecuador, trinidad, una, para"},


                {"model": "v1", "unit": 2006, "name": "South-West Africa", "top_words": "zimbabwe, cape, malawi, african, mozambique"},
                {"model": "v1", "unit": 1121, "name": "Arab World?", "top_words": "allah, ali, saudi, somalia, al"},
                {"model": "v1", "unit": 1402, "name": "Islam?", "top_words": "muslims, muslim, allah, islamic, islam"},
                {"model": "v1", "unit": 369, "name": "China?", "top_words": "chinese, china, shanghai, hong, wang"},
                {"model": "v1", "unit": 1254, "name": "East Asia", "top_words": "korea, vietnam, korean, vietnamese, asian"},
                {"model": "v1", "unit": 71, "name": "Australia?", "top_words": "australia, australian, nsw, adelaide, nz"},
            ]
        },
        {
            "name": "rn101 - all primary",
            "neurons": [
                {"model": "rn101", "unit": 1728, "name": "California?", "top_words": "hollywood, california, postposted, angeles, lost"},
                {"model": "rn101", "unit": 943, "name": "Canada?", "top_words": "canada, canadian, alberta, manitoba, ontario"},
                {"model": "rn101", "unit": 86, "name": "USA?", "top_words": "minnesota, wisconsin, nebraska, oklahoma, kentucky"},
                {"model": "rn101", "unit": 1026, "name": "USA?", "top_words": "wisconsin, minnesota, nebraska, iowa, missouri"},
                {"model": "rn101", "unit": 1768, "name": "USA?", "top_words": "usa, americans, america, american, americas"},
                {"model": "rn101", "unit": 1791, "name": "USA?", "top_words": "michigan, oregon, alabama, nebraska, iowa"},
                {"model": "rn101", "unit": 417, "name": "USA?", "top_words": "minnesota, washington, metabolism, sacramento, wisconsin"},
                {"model": "rn101", "unit": 1480, "name": "Canada?", "top_words": "vancouver, ontario, toronto, manitoba, ottawa"},
                {"model": "rn101", "unit": 836, "name": "Britain?", "top_words": "britain, westminster, british, london, uk"},
                {"model": "rn101", "unit": 369, "name": "Europe?", "top_words": "european, europe, brussels, euro, euros"},

                {"model": "rn101", "unit": 482, "name": "Africa?", "top_words": "zimbabwe, nigeria, botswana, kenya, uganda"},
                {"model": "rn101", "unit": 698, "name": "Greater Middle East?", "top_words": "pakistan, yemen, baghdad, uzbekistan, bangladesh"},
                {"model": "rn101", "unit": 438, "name": "India?", "top_words": "hindu, reliance, india, delhi, singh"},
                {"model": "rn101", "unit": 858, "name": "South Asia?", "top_words": "singh, mumbai, pakistan, hindu, shanghai"},
                {"model": "rn101", "unit": 801, "name": "East Asia?", "top_words": "shanghai, chinese, beijing, china, vietnam"},
                {"model": "rn101", "unit": 93, "name": "East Asia?", "top_words": "indonesia, indonesian, bangkok, malaysia, thailand"},

                {"model": "rn101", "unit": 1415, "name": "Australia?", "top_words": "brisbane, melbourne, australian, canberra, australia"},
            ]
        },
        {
            "name": "rn101 - all secondary",
            "neurons": [
                {"model": "rn101", "unit": 1268, "name": "Angels?", "top_words": "angel, angels, wings, heaven, angeles"},
                {"model": "rn101", "unit": 1651, "name": "Startups", "top_words": "entrepreneurs, entrepreneur, founder, startup, starter"},
                {"model": "rn101", "unit": 1543, "name": "Male WASP names", "top_words": "chris, josh, jake, mike, ryan"},
                {"model": "rn101", "unit": 395, "name": "immigration", "top_words": "immigrants, immigration, borders, border, refugees"},
                {"model": "rn101", "unit": 645, "name": "Great Cats?", "top_words": "lions, jaguar, tigers, eagles, tiger"},
                {"model": "rn101", "unit": 1731, "name": "Cold?", "top_words": "blanket, jackets, jacket, wrap, arctic"},
                {"model": "rn101", "unit": 1895, "name": "Terrorism", "top_words": "saudi, terrorists, terrorism, terrorist, allah"},
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

    let active = undefined;
    let active_unsetter = undefined;
    function enter(i){
        if (active_unsetter != undefined) {clearTimeout(active_unsetter)};
        active=i;
    }
    function leave(){
        active_unsetter = setTimeout(() => {active=undefined;}, 50)
    }
    const map_modes = [
        {"name": "geography", "description": "<b>Unlabeled map activations</b>: Spatial activations of neurons in response to unlabeled geographical world map. Activations averaged over random crops."},
        {"name": "countries", "description": "<b>Country name activations</b>: Countries colored by activations of neurons in response to rastered images of country names. Activations averaged over font sizes, max over word positions."}, 
        {"name": "cities", "description": "<b>City name activations</b>: Cities colored by activations of neurons in response to rastered images of city names. Activations averaged over font sizes, max over word positions."}
    ]
    let map_mode = "geography";



    function setRegionalState(map_mode_, selected_family_=null, active_=null) {
        if (map_mode_ != null) { map_mode = map_mode_;}
        if (selected_family_ != null) { selected_family = selected_family_;}
        if (active_ != null) { active = active_;}
    }
    onMount((x) => {window.setRegionalState = setRegionalState})
</script>


<style>
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
            [title] auto [map] auto 16px 
            [neuron-title] auto 4px [color] auto 4px [top-words] auto 4px
            [facets-start] 
                repeat(4, [facet] auto) [overflow] auto 
            [facets-end] 
            16px [caption] auto;
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

    <div style='grid-area: title; border-bottom: 1px solid #DDD; margin-bottom: 4px;'>
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
            focus={(active!=null)? active : null} />
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
    <div class='figcaption' style='background:#EEE; padding: 6px; border-radius: 2px;'>{(neuron_indices[neuron_i] != -1)? top_words[neuron_indices[neuron_i]].slice(0,5).join(", ") : ""}</div>
    
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
        <div class='figcaption'>Regional neurons respond to many different kinds of images related to their region. <a href="#faceted-feature-visualization">Faceted feature visualiziation</a> allows us to see some of this diversity.</div>
        <div class='figcaption' style='margin-top: 8px;'>Hover on a neuron to isolate acitvations. Click to open in Microscope.</div>
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
        <a href='#' class='figure-anchor'>Figure N:</a> This diagram contextualizes region neurons with a map. It can show their response
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
        "<span class="pseudo-link" on:click={() => {selected_family=1; active=null;}}>latitude neurons</span>"
        (such as the "<span class="pseudo-link" on:click={() => {selected_family=1; active=0;}}>Northern Hemisphere</span>" neuron)
        and at 
        "<span class="pseudo-link" on:click={() => {selected_family=2; active=null;}}>secondarily regional neurons</span>"
        (neurons which seem to be primarily about a concept we wouldn't typically conceptualize as geographic such as 
        "<span class="pseudo-link" on:click={() => {selected_family=2; active=1;}}>entrepeneurship</span>"
        or 
        "<span class="pseudo-link" on:click={() => {selected_family=2; active=6;}}>terrorism</span>").
    </div>
</div>


