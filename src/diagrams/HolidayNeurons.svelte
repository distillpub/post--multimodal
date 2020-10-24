<script>
  import SmallNeuronGrid from './SmallNeuronGrid.svelte';
  let neurons = [
    {
      model: "4x",
      unit: 2439,
      title: "halloween",
      facets: ["any"],
    },
    {
      model: "4x",
      unit: 776,
      title: "birthday",
      facets: ["any"],
    },
    {
      model: "4x",
      unit: 1326,
      title: "christmas",
      facets: ["any"],
    },
    {
      model: "rn101",
      unit: 865,
      title: "christmas",
      facets: ["any"],
    },
    {
      model: "4x",
      unit: 1204,
      title: "easter",
      facets: ["any"],
    },
  ];
</script>
<SmallNeuronGrid neurons={neurons} />
