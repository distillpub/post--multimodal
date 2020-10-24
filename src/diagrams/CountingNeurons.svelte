<script>
  import SmallNeuronGrid from './SmallNeuronGrid.svelte';
  let neurons = [
    {
      model: "4x",
      unit: 17,
      title: "trios",
      facets: ["indoor"],
    },
    {
      model: "4x",
      unit: 202,
      title: "pairs or fours",
      facets: ["any"],
    },
    {
      model: "4x",
      unit: 310,
      title: "many",
      facets: ["face"],
    },
  ];
</script>
<SmallNeuronGrid neurons={neurons} />
