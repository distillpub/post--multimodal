<script>
    const two_example_attack = require("../../static/typographic/two_example_attack.json");

    import ClassificationCard from '../components/ClassificationCard.svelte';
</script>

<div>
  <ClassificationCard
    imageUrl={"typographic/small_attacks/example_second.png"}
    imageAltText={"a picture of a meerkat with the word 'iPod' overlaid eight times"}
    probabilities={two_example_attack.linear_probes.results.iPod.iPod.full_results[0][13].slice(0,6)}
    customHues={{}}
    forceShorterWidth={true}
  />
  <div class="figcaption">
    <p>
      A typographic attack.
    </p>
  </div>
</div>
