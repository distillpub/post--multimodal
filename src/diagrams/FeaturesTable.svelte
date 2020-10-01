
<script>
    export let models = ["InceptionV1", "InceptionV1_caffe_Places365", "MultimodalLLM", "contrastive_v1", "contrastive_rn50", "contrastive_v2", "contrastive_4x"];
    export let features = ['high-low', 'bw-color'];
    export let categoryLabels = [];
    export let big_icon = true;
    let FeaturesData = require("../../static/diagram-data/Features.json");
    let ModelsData = require("../../static/diagram-data/Models.json");
    $: columnTitles = models.map( name => ModelsData[name]);
    $: rows = features.map( name => {
        var row = Object.assign({}, FeaturesData[name]);
        row.model_features = models.map(model_name => row.model_features[model_name] || []); 
        return row;  });
</script>

<style>
    @media only screen and (min-width: 1400px) {
        .table {
            grid-gap: 12px;
            grid-template-columns: [category] auto [label] auto repeat(7, [main] 122px);
        }
    }
    @media only screen and (max-width: 1399px){
        .table {
            display: grid;
            grid-column-gap: 12px;
            grid-template-columns: [category] auto [label] 100px repeat(7, [main] 80px);
        }
    }
    .table {
        display: grid;
        grid-row-gap: 16px;
        grid-template-rows: [category] auto [label] auto repeat(6, [main] auto) [caption] auto;
    }
    .feature-box {
        display: flex; flex-wrap: wrap; grid-gap: 2px; align-content: start;
    }
    .big-icon a, .feature-box a {
        border-bottom: none; text-decoration: none;
        display: block;
    }
    .feature-box img {
        width: 60px; height: 60px; background: #AAA; border-radius: 4px; object-fit: none;
        display: block;
    }
    .big-icon img, .feature-box img {
        background: #AAA; border-radius: 4px; object-fit: none;
        display: block;
    }
    .big-icon {
        width: 100%; height: 100%;
        text-decoration: none;
        display: block;
    }


    .figure-anchor {
        font-weight: bold;
    }
</style>



    
<div style='margin: auto; width: fit-content;'>
<div class='table' style=' width: fit-content;'>


    {#each columnTitles as column, i}
    <div style='grid-column: main {i+1}; grid-row: label; padding-bottom: 8px; /*border-bottom: 1px solid #CCC;*/'>
        {column.header}
        <div class='figcaption'>{@html column.sub}</div>
    </div>
    {/each}

    {#each rows as row, j}
    <div style='grid-column: label; grid-row: main {j+1}; padding-right: 10px; max-width: {(categoryLabels.length > 0)? "80px" : "200px"}'>
        <div style='line-height: 120%; margin-bottom: 8px;'>{row.name}</div>
        <div class='figcaption'>{@html row.description}</div>
    </div>
    {#each row.model_features as features, i}
    {#if features.length == 0}
    <div style='grid-column: main {i+1}; grid-row: main {j+1}; background: #EEE; border-radius: 2px; ' class="feature-box">
        <div class="figcaption" style='margin:auto; margin: 4px; margin-top: 24px; max-width: 120px; opacity: 0.7;'>No correlated features.</div>
    </div>
    {:else if big_icon}
    <div class='big-icon' style = 'grid-column: main {i+1}; grid-row: main {j+1};'>
    <a href="{features[0].a_url}" >
        <img src='{features[0].img_url}' alt='{features[0].model} {features[0].layer}:{features[0].unit}'>
    </a>
    </div>
    {:else}
    <div style='grid-column: main {i+1}; grid-row: main {j+1};' class="feature-box">
        {#each features as feature}
        <a href="{feature.a_url}" >
        <img src='{feature.img_url}' alt='{feature.model} {feature.layer}:{feature.unit}'>
        </a>
        {/each}
    </div>
    {/if}
    {/each}
    {/each}

    {#each categoryLabels as category}
    <div style='grid-column: category; grid-row: main {category.start+1} / main {category.end+1}; padding-right: 10px; height: 100%; border-right: 1px solid #CCC; max-width: 200px;'>
        <div style='line-height: 120%; margin-bottom: 8px;'>{category.header}</div>
        <div class='figcaption'>{@html category.sub}</div>
    </div>
    {/each}

</div>

</div>

