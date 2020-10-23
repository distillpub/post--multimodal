<script>
let small_attacks = require('../../static/typographic/small_attacks.json');
let attack_ordering = [
  ["waste container", "trash"],
  ["iPod", "iPod"],
  ["rifle", "rifle"],
  ["pizza", "pizza"],
  ["radio", "radio"],
  ["great white shark", "shark"],
  ["library", "library"],
  ["Siamese cat", "meow"],
  ["piggy bank", "$$$"]
];
</script>

<div>
  <table id="best-small-attacks" style="width: 100%">
    <thead>
      <tr>
        <th scope="col">Target class</th>
        <th scope="col">Attack text</th>
        <th scope="col">Pixel cover</th>
        <th scope="col">Success <div class="figcaption">Linear probes</div></th>
      </tr>
    </thead>
    <tbody>
      {#each attack_ordering as [target_class, attack_text]}
        <tr>
          <td><code>{ target_class }</code></td>
          <td><i>{ attack_text === "$$$" ? "$\\\$\\\$\\\$$" : attack_text }</i></td>
          <td>{ Math.round(small_attacks.linear_probes.results[target_class][attack_text].avg_img_l0_norm_diff * 10000)/100 }%</td>
          <td>{ Math.round(small_attacks.linear_probes.results[target_class][attack_text].fraction_changed_to * 10000)/100 }%</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="figcaption">
    <p>
      <a class="figure-anchor" href="#automated-attacks">Figure N:</a> Probabilities were collected from <a href="https://ggoh-staging-dot-encyclopedia-251300.wl.r.appspot.com/models/contrastive_4x?models.technique=deep_dream">CLIP 4x</a>.

      <b>Pixel cover</b> measures the attack's impact on the original image: the average percentage of pixels that were changed by any amount (an L0-norm) in order to add the attack.

      <b>Success rate</b> is measured over {Math.round(small_attacks.n)} ImageNet validation images with an attack considered to have succeeded if the attack class is the most likely. We do not consider an attack to have succeeded if the attack-free image was already classified as the attack class.

      For reference, {Math.round(small_attacks.linear_probes.baseline_accuracy * 10000)/100 }% of images were classified correctly before the addition of any attacks.
    </p>

    <!-- <p>
      In the <b>linear probes</b> methodology, we use the ImageNet training set to optimize a matrix of weights to apply to activations taken from the vision model in order to convert those activations into ImageNet predictions.
      <d-footnote>We did not test these adversarial attacks against a fine-tuned model, because we did not find that a fine-tuned model performed substantially better at baseline on ImageNet classification than the linear probes methodology did. Furthermore, fine-tuning performance on this task could depend on how long the model is trained or other factors.
      </d-footnote>
    </p> -->
    <!-- <p>In the <b>zero-shot</b> methodology, we convert the multimodal model to an ImageNet classifier by calculating probabilities on the completion “a photo of a ___” for each ImageNet class.</p> -->
  </div>
</div>
