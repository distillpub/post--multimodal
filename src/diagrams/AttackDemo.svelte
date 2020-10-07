<script>
    const one_example_attack = require("../../static/typographic/one_example_attack.json");
    
    import ClassificationCard from '../components/ClassificationCard.svelte';
</script>
    
<div>
<ClassificationCard
    imageUrl={"/typographic/small_attacks/example_after.png"}
    imageAltText={"a picture of a chihuahua with the word 'pizza' overlaid eight times"}
    probabilities={one_example_attack.results.pizza.pizza.full_results[0].slice(0,9)}
    customHues={{}}
/>
</div>
