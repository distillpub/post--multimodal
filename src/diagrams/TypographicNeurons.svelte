<script>
  import SmallNeuronGrid from './SmallNeuronGrid.svelte';
  let neurons = [
    {
      model: "4x",
      unit: 2504,
      title: "un-",
      facets: ["text"],
    },
    {
      model: "4x",
      unit: 656,
      title: "con-",
      facets: ["text"],
    },
    {
      model: "4x",
      unit: 444,
      title: "-oo-",
      facets: ["text"],
    },
    {
      model: "4x",
      unit: 2524,
      title: "-ing",
      facets: ["text"],
    },
    {
      model: "4x",
      unit: 399,
      title: "j-",
      facets: ["text"],
    },
  ];
</script>
<SmallNeuronGrid neurons={neurons} />
