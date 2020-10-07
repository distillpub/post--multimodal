
<script>
    let neuron_families = [
        {
            name: "People",
            neurons: [
                {unit: 89, name: "Donad Trump"},
                {unit: 263, name: "Lady Gaga"},
                {unit: 2233, name: "Ariana Grande"},
                {unit: 2233, name: "Adolf Hitler"},
                {unit: 2233, name: "Jesus Christ"}
            ],
            facets: [
                "Photos",
                "Drawings",
                "Name",
                "Family",
                "Colleagues",
                "Slogans"
            ]
        },
        {
            name: "Emotions",
            neurons: [
                {unit: undefined, name: "Happy"},
                {unit: undefined, name: "Sad"},
                {unit: undefined, name: "Surprised"},
                {unit: undefined, name: "Anger"},
                {unit: undefined, name: "Aroused"}
            ],
            facets: [
                "Facial Expression",
                "Name of Emotion",
                "Emoting words",
                "Emotional Events",
            ]
        },
        {
            name: "Regions",
            neurons: [
                //{unit: undefined, name: "Northern Hemisphere"},
                {unit: undefined, name: "Europe"},
                {unit: undefined, name: "Australia"},
                {unit: undefined, name: "Central Africa"},
                {unit: undefined, name: "East Asia"},
                {unit: undefined, name: "West Coast"}
            ],
            facets: [
                "Country Names",
                "City Names",
                "Flags",
                "Local Script",
                "Maps",
                "Ethnicty"
            ]
        },
        {
            name: "Fiction",
            neurons: [
                {unit: undefined, name: "Spiderman"},
                {unit: undefined, name: "Avengers"},
                {unit: undefined, name: "Harry Potter"},
                {unit: undefined, name: "Pokemon"},
                {unit: undefined, name: "Disney"}
            ],
            facets: [
                "Fiction Name",
                "Characters",
                "Character Names",
                "Logos",
            ]
        },

        // {
        //     name: "Abstract",
        //     neurons: [
        //         {unit: undefined, name: "Familly"},
        //         {unit: undefined, name: "Christmas"},
        //         {unit: undefined, name: "Science"},
        //         {unit: undefined, name: "Rude/Toxic"}
        //     ],
        //     facets: [
        //     ]
        // },
        // {
        //     name: "Image Property",
        //     neurons: [
        //         {unit: undefined, name: "Child Drawing"},
        //         {unit: undefined, name: "Selfie"},
        //         {unit: undefined, name: "Photo Bomb"},
        //         {unit: undefined, name: "Edited Photo"}
        //     ],
        //     facets: [
        //     ]
        // },
    ]
</script>

<style>
    .container {
        display: grid;
        grid-template-columns: [label] 224px repeat( var(--n-families), [family] 120px);
        grid-template-rows: [label] auto [neurons] auto [facets] auto;
        grid-column-gap: 12px;
        grid-row-gap: 12px;
        width: fit-content;
        margin: auto;
    }
</style>


<div class='container' style='--n-families: {neuron_families.length};'>

{#each neuron_families as family, family_i}

<div style='grid-column: family {family_i+1}; grid-row: label;'>{family.name}</div>

<div style='grid-column: family {family_i+1}; grid-row: neurons;'>
{#each family.neurons as neuron}
    <div class='figcaption'>{neuron.name}</div>
{/each}
</div>

<div style='grid-column: family {family_i+1}; grid-row: facets;'>
    {#each family.facets  as facet}
        <div class='figcaption'>{facet}</div>
    {/each}
</div>

{/each}

<div style='grid-column: label; grid-row: neurons; padding-right: 24px;'>
    <div style='line-height: 130%; margin-bottom: 8px; '>Example Neurons</div>
    <div class='figcaption'>Examples of neurons we group in this family (human labels).</div>
</div>
<div style='grid-column: label; grid-row: facets; padding-right: 24px;'>Example Facets
    <div class='figcaption'>Types of stimuli we observe to activate these neurons.</div>
</div>

</div>