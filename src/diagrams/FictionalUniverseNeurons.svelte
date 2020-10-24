<script>
  import SmallNeuronGrid from './SmallNeuronGrid.svelte';
  let neurons = [
    {
      model: "4x",
      unit: 924,
      title: "Pokémon",
      facets: ["logo"],
    },
    {
      model: "rn101",
      unit: 905,
      title: "Marvel",
      facets: ["any"],
    },
    {
      model: "rn101",
      unit: 2043,
      title: "legend of zelda",
      facets: ["logo"],
    },
    {
      model: "rn101",
      unit: 1532,
      title: "Star Wars",
      facets: ["indoor"],
    },
    {
      model: "rn101",
      unit: 789,
      title: "The Simpsons",
      facets: ["logo"],
    },
  ];
</script>
<SmallNeuronGrid neurons={neurons} />
