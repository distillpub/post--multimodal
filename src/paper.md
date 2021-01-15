import Svelte from './svelte'
import SvelteMargin from './svelte-margin'
import SvelteInline from './svelte-inline'
import Todo from './diagrams/todo'
import Todos from './diagrams/todos'
import {mref, geo_ref} from './util_mdx.js'

<div><Todo to="Nick" value={4}>Come up with a hero draft</Todo><Todo to="Chris" value={4}>Dataset examples in interactive diagrams</Todo><Todo to="Chris" value={4}>Add note to conditional probabilities appendix saying we didn't use dataset examples from the dataset, but used closely analogous ones for every image</Todo></div>


In 2005, a letter published in Nature described human neurons responding to specific people, such as Jennifer Aniston or Halle Berry <d-cite bibtex-key="quiroga2005invariant" />. The exciting thing wasn’t just that they selected for particular people, but that they did so regardless of whether they were shown photographs, drawings, or even images of the person’s name. The neurons were multimodal. As the lead author would put it: "You are looking at the far end of the transformation from metric, visual shapes to conceptual… information." <d-footnote>Quiroga's full quote, from <a href="https://www.newscientist.com/article/dn7567-why-your-brain-has-a-jennifer-aniston-cell/">New Scientist</a> reads: "I think that’s the excitement to these results. You are looking at the far end of the transformation from metric, visual shapes to conceptual memory-related information. It is that transformation that underlies our ability to understand the world. It’s not enough to see something familiar and match it. It’s the fact that you plug visual information into the rich tapestry of memory that brings it to life." We elided the portion discussing memory since it was less relevant.</d-footnote>

<p>We report the existence of similar multimodal neurons in artificial neural networks. This includes neurons selecting for prominent public figures or fictional characters, such as {mref("Lady Gaga", 263)} or {mref("Spiderman", 550)}.<d-footnote>It’s important to note that the vast majority of people these models recognize don’t have a specific neuron, but instead are represented by a combination of neurons. Often, the contributing neurons are conceptually related. For example, we found a Donald Trump neuron which fires (albeit more weakly) for Mike Pence, contributing to representing him.</d-footnote><d-footnote comma>Some of the neurons we found seem strikingly similar to those described in neuroscience. A Donald Trump neuron we found might be seen as similar to Quiroga et al’s Bill Clinton neuron <d-cite bibtex-key="quiroga2005invariant" />. A {mref("Star Wars", 2500)} neuron we find seems analogous to a biological Star Wars neuron described Quiroga et al’s follow up paper <d-cite bibtex-key="quiroga2009explicit" />. And although we don’t find an exact Jennifer Aniston neuron, we do find a neuron for the TV show “Friends” which fires for her.</d-footnote> Like the biological multimodal neurons, these artificial neurons respond to the same subject in photographs, drawings, and images of their name:</p>


import HalleBerry from './diagrams/halleBerry/index.svelte'

<Svelte component={HalleBerry} container={<div />} />


<p>People-detecting neurons only scratch the surface of the highly abstract neurons we've found. Some neurons seem like topics out of a kindergarten curriculum: weather, seasons, letters, counting, or primary colors. All of these features, even the trivial-seeming ones, have rich multimodality, such as a {mref("yellow neuron", 713)} firing for images of the words “yellow”, “banana” and “lemon,” in addition to the color.</p>

We find these multimodal neurons in the recent CLIP models <d-cite bibtex-key="radford2020clip" />, although it's possible similar undiscovered multimodal neurons may exist in earlier models. A CLIP model consists of two sides, a ResNet <d-cite bibtex-key="kaiming2015resnet" /> vision model and a Transformer <d-cite bibtex-key="vaswani2017attention" /> language model, trained to align pairs of images and text from the internet using a contrastive loss <d-cite bibtex-key="sohn2016improved,tian2019contrastive" />. <d-footnote>The authors also kindly shared an alternative version from earlier experiments, where the training objective was an autoregressive language modelling objective, instead of a contrastive objective. The features seem pretty similar.</d-footnote> There are several CLIP models of varying sizes; we find multimodal neurons in all of them, but focus on studying the mid-sized RN50-x4 model. <d-footnote>We found it challenging to make feature visualization work on the largest CLIP models. The reasons why remain unclear. See faceted feature visualization.</d-footnote> We refer readers to the <a href="https://openai.com/blog/clip/">CLIP blog post</a> and  <a href="https://cdn.openai.com/papers/Learning_Transferable_Visual_Models_From_Natural_Language_Supervision.pdf">paper</a><d-cite bibtex-key="radford2020clip" /> for more detailed discussion of CLIP’s architecture and performance. OWe focus our analysis will focus on CLIP's vision side, so when we talk about a multimodal neuron responding to text we mean the model "reading" text in images. <d-footnote>The alignment with the text side of the model might be seen as an additional form of multimodality, perhaps analogous to a human neuron responding to hearing a word rather than seeing it (see Quiroga’s later work). But since that is an expected result of the training objective, it seems less interesting.</d-footnote>

CLIP’s abstract visual features might be seen as the natural result of aligning vision and text. We expect word embeddings (and language models generally) to learn abstract "topic" features <d-cite bibtex-key="arora2018linear" />. Either the side of the model which processes captions (the “language side”) needs to give up those features, or its counterpart, the “vision side”, needs to build visual analogues. <d-footnote>Many researchers are interested in “grounding” language models by training them on tasks involving another domain, in the hope of them learning a more real world understanding of language. The abstract features we find in vision models can be seen as a kind of “inverse grounding”: vision taking on more abstract features by connection to language.</d-footnote> <d-footnote comma>This includes some of the classic kinds of bias we see in word embeddings, such as a “terrorism”/”Islam” neuron, or an “Immigration”/”Mexico” neuron. See discussion in the <a href="#region-neurons">region neurons section</a>.</d-footnote> But even if these features seem natural in retrospect, they are qualitatively different from neurons previously studied in vision models (eg. <d-cite bibtex-key="karpathy2015visualizing,zhou2014object,netdissect2017,olah2020zoom" />). They also have real world implications: these models are vulnerable to a kind of “typographic attack” where adding adversarial text to images can cause them to be systematically misclassified.

import AttackDemo from './diagrams/AttackDemo.svelte'

<Svelte component={AttackDemo} container={<div className="margin-diagram" />} />

import MicroscopeAlert from './diagrams/MicroscopeAlert.svelte'

<Svelte component={MicroscopeAlert} container={<div className="div" />} />



<br /><hr /><br />

<h2 id="guided-tour-of-neuron-families">
A Guided Tour of Neuron Families
</h2>

What features exist in CLIP models? In this section, we examine neurons found in the final convolutional layer of the vision side across four models. A majority of these neurons seem to be interpretable.<d-footnote>We checked a sample of 50 neurons from this layer and classified them as interpretable, polysemantic, or uninterpretable. We found that 76% of the sampled neurons were interpretable. (As a 95% confidence interval, that’s between 64% and 88%.) A further 18% were polysemantic but with interpretable facets, and 6% were as yet uninterpretable.</d-footnote> Each layer consists of thousands of neurons, so for our preliminary analysis we looked at feature visualizations, the dataset examples that most activated the neuron, and the English words which most activated the neuron when rastered as images. This revealed an incredible diversity of features, a sample of which we share below:

import NeuronFamilies from './diagrams/NeuronFamilies.svelte'

<Svelte component={NeuronFamilies} />

These neurons don’t just select for a single object. They also fire (more weakly) for associated stimuli, such as a Barack Obama neuron firing for Michelle Obama or a morning neuron firing for images of breakfast. They also tend to be maximally inhibited by stimuli which could be seen, in a very abstract way, as their opposite. <d-footnote>Some neurons seem less abstract. For example, typographic features like the “-ing” detector seem to roughly fire based on how far a string is away in Levenshtein distance. Although, even these show remarkable generalization, such as responding to different font sizes and rotated text.</d-footnote>

How should we think of these neurons? From an interpretability perspective, these neurons can be seen as extreme examples of “multi-faceted neurons” which respond to multiple distinct cases <d-cite bibtex-key="nguyen2016multifaceted"></d-cite>. Looking to neuroscience, they might sound like “grandmother neurons,”<d-footnote>The <a href="https://en.wikipedia.org/wiki/Grandmother_cell">“grandmother neuron”</a> is a classic example in neuroscience of a hypothetical neuron that responds in a highly specific way to some complex concept or stimulus – such as a person’s grandmother.</d-footnote> but their associative nature distinguishes them from how many neuroscientists interpret that term <d-cite bibtex-key="quiroga2008sparse" />. The term “concept neurons” has sometimes been used to describe biological neurons with similar properties  <d-cite bibtex-key="quiroga2012concept" />, but this framing might encourage people to overinterpret these artificial neurons. Instead, the authors generally think of these neurons as being something like the visual version of a topic feature, activating for features we might expect to be similar in a word embedding.

<p>Many of these neurons deal with sensitive topics, from political figures to emotions. Some neurons explicitly represent or are closely related to protected characteristics: age, gender, race, religion, sexual orientation,<d-footnote>There’s a neuron we conceptualize as an LGBT neuron, which responds to the Pride flag, rainbows, and images of words like “LGBT”. Previous work (Wang & Kosinski) has suggested that neural networks might be able to determine sexual orientation from facial structure. This work has since been thoroughly rebutted and we wish to emphasize that we see no evidence CLIP models do this.</d-footnote> disability and mental health status, pregnancy and parental status.<d-footnote>For neurons related to age and gender, see "person trait neurons." Region neurons seem closely related to race and national origin, responding to ethnicities associated with given regions of the world. For sexual orientation, see the {mref("LGBT neuron", 1820)}, which responds to things like pride flags and the word "LGBT." There appear to be individual neurons closely linked to {mref("disability status", 1917)}, {mref("mental health status", 2191)}, and {mref("pregnancy status", 2401)}. Another neuron seems related to {mref("parental status", 572)}, responding to images of children, children's toys, children's drawings, and words like "mom", "dad", or "parent".</d-footnote> These neurons may reflect prejudices in the “associated” stimuli they respond to, or be used downstream to implement biased behavior. There are also a small number of people detectors for individuals who have committed crimes against humanity, and a “toxic” neuron which responds to hate speech and sexual content. Having neurons corresponding to sensitive topics doesn’t necessarily mean a network will be prejudiced. You could even imagine explicit representations helping in some cases: the toxic neuron might help the model match hateful images with captions that refute them. But they are a warning sign for a wide range of possible biases, and studying them may help us find potential biases which might be less on our radar.<d-footnote>Examples of bias in AI models, and work drawing attention to it, has helped the research community to become somewhat “alert” to potential bias with regards to gender and race. However, CLIP could easily have biases which we are less alert to, such as biased behavior towards parents when there’s a child’s drawing in the background.</d-footnote></p>

CLIP contains a large number of interesting neurons. To allow detailed examination we’ll focus on three of the “neuron families” shown above: people neurons, emotion neurons, and region neurons. We invite you to explore others in Microscope.

<h3 id="person-neurons">
Person Neurons
</h3>

<div class="sensitivity-warn">This section will discuss neurons representing present and historical figures. Our discussion is intended to be descriptive and frank about what the model learned from the internet data it was trained on, and is not endorsement of associations it makes or of the figures discussed, who include political figures and people who committed crimes against humanity. This content may be disturbing to some readers.</div>

To caption images on the Internet, humans rely on cultural knowledge. If you try captioning the popular images of a foreign place, you’ll quickly find your object and scene recognition skills aren't enough. You can't caption photos at a stadium without recognizing the sport, and you may even need to know specific players to get the caption right. Pictures of politicians and celebrities speaking are even more difficult to caption if you don’t know who’s talking and what they talk about, and these are some of the most popular pictures on the Internet. Some public figures elicit strong reactions, which may influence online discussion and captions regardless of other content.

<p>With this in mind, perhaps it’s unsurprising that the model invests significant capacity in representing specific public and historical figures — especially those that are emotional or inflammatory. A {mref("Jesus Christ neuron", 1777)} detects Christian symbols like crosses and crowns of thorns, paintings of Jesus, his written name, and feature visualization shows him as a baby in the arms of the Virgin Mary. A {mref("Spiderman neuron", 550)} recognizes the masked hero and knows his secret identity, Peter Parker. It also responds to images, text, and drawings of heroes and villians from Spiderman movies and comics over the last half-century. A {mref("Hitler neuron", 309)} learns to detect his face and body, symbols of the Nazi party, relevant historical documents, and other loosely related concepts like German food. Feature visualization shows swastikas and Hitler seemingly doing a Nazi salute.</p>

import MarginNeuronPeople from './diagrams/MarginNeuronPeople.svelte'

<Svelte component={MarginNeuronPeople}  container={<div className="margin-diagram" style={{gridRow: "auto / span 1"}} ></div>} />


#### Case Study: Donald Trump Neuron

<p>Which people the model develops dedicated neurons for is stochastic, but seems correlated with the person's prevalence across the dataset<d-footnote>The model’s dataset was collected in 2019 and likely emphasizes content from around that time. In the case of the Donald Trump neuron, it seems likely there would have also been a Hillary Clinton neuron if data had been collected in 2016 instead. (There are other {mref("neurons", 672)} which weakly respond to Hillary Clinton, but more strongly fire for other content.)</d-footnote>  and the intensity with which people respond to them. The one person we’ve found in every CLIP model is Donald Trump. It strongly responds to images of him across a wide variety of settings, including effigies and caricatures in many artistic mediums, as well as more weakly activating for people he’s worked closely with like Mike Pence and Steve Bannon. It also responds to his political symbols and messaging (eg. “The Wall” and “Make America Great Again” hats). On the other hand, it most *negatively* activates to musicians like Nicky Minaj and Eminem, video games like Fortnite, civil rights activists like Martin Luther King Jr., and LGBT symbols like rainbow flags.</p>

<p>To better understand {mref("this neuron", 89)} we estimate the conditional probability of several categories of images at different activation levels using human labeling.</p>

import PeopleHandLabeled from './pages/people/handLabeledTrump'

<PeopleHandLabeled />

While labeling images for the previous experiment it became clear the neuron activates different amounts for specific people. We can study this more by searching the Internet for pictures of specific people and measuring how the images of each person makes the neuron fire.

import TrumpPeople from './pages/people/trumpPeople'

<TrumpPeople />

Presumably, person neurons also exist in other models, such as facial recognition models. What makes these neurons unique is that they respond to the person across modalities and associations, situating them in a cultural context. In particular, we're struck by how the neuron's response tracks an informal intuition with how associated people are. In this sense, person neurons can be thought of as a landscape of person-associations, with the person themself as simply the tallest peak.

<h3 id="emotion-neurons">
Emotion Neurons
</h3>

<div class="sensitivity-warn">This section will discuss neurons representing emotions, and a neuron for “mental illness.” Our discussion is intended to be descriptive and frank about what the model learned from the internet data it was trained on and is not endorsement. This content may be disturbing to some readers.</div>

Since a small change in someone's expression can radically change the meaning of a picture, emotional content is essential to the task of captioning. The model dedicates dozens of neurons to this task, each representing a different emotion.

<p>These emotion neurons don’t just respond to facial expressions associated with an emotion -- they’re flexible, responding to body language and facial expressions in humans and animals, drawings, and text. For example, the neuron we think of as a {mref("happiness neuron", 1512)} responds both to smiles, and words like “joy.” The {mref("surprise neuron", 2478)} activates even when the majority of the face is obscured. It responds to slang like "OMG!" and "WTF", and text feature visualization produces similar words of shock and surprise. There are even some emotion neurons which respond to scenes that evoke the emotion's “vibe,” such as the {mref("creative neuron", 1372)} responding to art studios.<d-footnote>We include neurons such as the {mref("creative neuron", 1372)} in discussion of emotions because (1) they are sometimes included in emotion wheels, (2) they seem to play a role in captioning emotions and feelings, and (3) being more inclusive in our discussion allow us to explore more of the model.</d-footnote> Of course, these neurons simply respond to cues associated with an emotion and don’t necessarily correspond to the mental state of subjects in an image.<d-footnote>In addition to CLIP neurons potentially incorrectly recognizing cues, they cues themselves don’t necessarily reflect people’s mental states. For example, facial expressions don’t reliably correspond to someone experiencing an emotion <d-cite bibtex-key="barrett2019emotional" />. Similarly, an image including words related to an emotion doesn’t mean that emotion is what subjects in the image feel.</d-footnote></p>

import MarginNeuronShock from './diagrams/MarginNeuronShock.svelte'

<Svelte component={MarginNeuronShock}  container={<div className="margin-diagram" style={{gridRow: "auto / span 1"}} ></div>} />

<p>In addition to these emotion neurons, we also find which neurons respond to an emotion as a secondary role, but mostly respond to something else. We’ll see in a later section that {mref("a neuron", 1551)} which primarily responds to jail and incarceration helps represent emotions such as “persecuted.” Similarly, a neuron that primarily detects pornographic content seems to have a secondary function of representing arousal. And {mref("a neuron", 2202)} which responds most strongly to question marks contributes to representing “curious.”</p>

import MarginNeuronsMisc from './diagrams/MarginNeuronsMisc.svelte'

<Svelte component={MarginNeuronsMisc}  container={<div className="margin-diagram" style={{gridRow: "auto / span 1"}} ></div>} />





import EmotionsIntro from './pages/emotions/intro'

<EmotionsIntro />

<p>While most emotion neurons seem to be very abstract, there are also some neurons which simply respond to specific body and facial expressions, like the {mref("silly expression neuron", 1692)}. It activates most to the internet-born duckface expression and peace signs, and we'll see later that both words show up in the maximally corresponding captions.</p>

import MarginNeuronDuck from './diagrams/MarginNeuronDuck.svelte'

<Svelte component={MarginNeuronDuck} container={<div className="margin-diagram" style={{gridRow: "auto / span 2"}} ></div>} />


#### Case Study: Mental Illness Neuron

<p>One neuron that doesn't represent a single emotion but rather a high level category of mental states is a unit we conceptualize as a {mref("\"mental illness\" neuron", 2191)}. This neuron activates when images contain words associated with negative mental states (eg. “depression,” “anxiety,” “lonely,” “stressed”), words associated with clinical mental health treatment (“psychology”, “mental,” “disorder”, “therapy”) or mental health pejoratives (“insane,” “psycho”).  It also fires more weakly for images of drugs, and for facial expressions that look sad or stressed, and for the names of negative emotions.</p>

import MarginNeuronMental from './diagrams/MarginNeuronMental.svelte'

<Svelte component={MarginNeuronMental}  container={<div className="margin-diagram" style={{gridRow: "auto / span 1"}} ></div>} />

Ordinarily, we wouldn’t think of mental illness as a dimension of emotion. However, a couple things make this neuron important to frame in the emotion context. First, in its low-mid range activations, it represents common negative emotions like sadness. Secondly, words like “depressed” are often colloquially used to describe non-clinical conditions.  Finally, we’ll see in a later section that this neuron plays an important role in captioning emotions, composing with other emotion neurons to differentiate “healthy” and “unhealthy” versions of an emotion.

To better understand this neuron we again estimated the conditional probabilities of various categories by activation magnitude. The strongest positive activations are concepts related to mental illness. Conversely, the strongest negative activations correspond to activities like exercise, sports, and music events.


import EmotionsMentalHealth from './pages/emotions/mentalHealth'

<EmotionsMentalHealth />


<h3 id="region-neurons">
Region Neurons
</h3>

<div class="sensitivity-warn">This section will discuss neurons representing regions of the world, and indirectly ethnicity. The model’s representations are learned from the internet, and may reflect prejudices and stereotypes, sensitive regional situations, and colonialism. Our discussion is intended to be descriptive and frank about what the model learned from the internet  data it was trained on, and is not endorsement of the model’s representations or associations. This content may be disturbing to some readers.</div>

<p>From local weather and food, to travel and immigration, to language and race: geography is an important implicit or explicit context in a great deal of online discourse. Blizzards are more likely to be discussed in {geo_ref("Canada", 13, 1)}. Vegemite is more likely to come up in {geo_ref("Australia", 0, 6)}. Discussion of {geo_ref("China", 0, 5)} is more likely to be in Chinese.</p>

We find that CLIP models develop <i>region neurons</i> responding to geographic regions. These neurons might be seen as vision analogues of geographic information in word embeddings <d-cite bibtex-key="konkol2017geographical"></d-cite>. They respond to a wide variety of modalities and facets associated with a given region: country and city names, architecture, prominent public figures, faces of the most common ethnicity, distinctive clothing, wildlife, and local script (if not the Roman alphabet). If shown a world map, even without labels, these neurons fire selectively for the relevant region on the map.<d-footnote>Map responses seem to be strongest around distinctive geographic landmarks, such as the Gulf Of Carpentaria and Cape York Peninsula for Australia, or the Gulf of Guinea for Africa.</d-footnote>

<p>Region neurons vary greatly in scale, from neurons corresponding to entire hemispheres — for example, a {geo_ref("Northern Hemisphere neuron", 1, 0)} which responds to bears, moose, coniferous forest, and the entire Northern third of a world map — down to sub-regions of countries, such as the US West Coast.<d-footnote>One interesting property of the regional neuron “hierarchy” is that the parent neuron often doesn’t fire when a child is uniquely implicated. So while the Europe neuron fires for the names of European cities, the general United States neuron generally does not, and instead lets neurons like the West Coast neuron fire. See also another example of a neuron “hierarchy” in <a href="#imagenet-challenge">The ImageNet Challenge</a> section.</d-footnote> Which regions the model dedicates neurons to seems stochastic and varies across models we examined.<d-footnote> Some region neurons seem to form more consistently than others. Which neurons form doesn't seem to be fully explained by prevalence in the dataset: for example, {geo_ref("every model has an Australia neuron", 6)}, but not all models seem to have a UK neuron. Why is that? One intuition is that there’s more variance in neurons when there’s a natural supercategory they can be grouped into. For example, when an individual UK neuron doesn’t exist, it seems to be folded into a Europe neuron. In Africa, we sometimes see multiple different Africa neurons (in particular a South/West Africa neuron and an East Africa neuron), while other times there seems to be a single unified Africa neuron. In contrast, Australia is perhaps less subdividable, since it’s both a continent and country.</d-footnote></p>


 

import RegionalDiagram from './diagrams/RegionalNeurons.svelte'

<Svelte component={RegionalDiagram} container={<figure className="fullscreen-diagram" id="region-neuron-diagram" />} />


<p>Not all region neurons fire on a globe-scale map. In particular, neurons which code for smaller countries or regions (eg. {mref("New York", 357)}) may not. This means that visualizing behavior on a global map underrepresents the sheer number of region neurons that exist in CLIP. Using the top-activating English words as a heuristic, we estimate around 4% of neurons are regional.<d-footnote>To estimate the fraction of neurons that are regional, we looked at what fraction of each neuron's top-activating words (ie. words it responds to when rastered as images) were explicitly linked to geography, and used this as a heuristic for whether a neuron was regional. To do this, we created a list of geographic words consisting of continent / country / province / city names, their corresponding <a href="https://en.wikipedia.org/wiki/List_of_adjectival_and_demonymic_forms_for_countries_and_nations">adjectival and demonymic forms</a>, and currencies. <br /><br /> We found 2.5% (64) of RN50-x4 neurons had geographic words for all of the five maximally activating words. This number varied between 2-4% in other CLIP models. However, looking only at neurons for which all top five words are explicitly geographic misses many region neurons which respond strongly to words with implicit regional connotations (eg. “hockey” for a Canada neuron, “volkswagen” for a German neuron, “palm” for an equatorial neuron). We bucketed neurons by fraction of five most activating words that are geographic, then estimated the fraction of each bucket that were regional. With many neurons, the line was quite blurry (should we include polysemantic neurons where one case is regional? What about “secondarily regional neurons”?). For a relatively conservative definition, this seems to get us about 4%, but with a more liberal one you might get as high as 8%.</d-footnote></p>

<p>In addition to pure region neurons, we find that many other neurons seem to be “{geo_ref("secondarily regional", 2)}.”<d-footnote>Some caution is needed in interpreting these neurons as truly regional, rather than spuriously weakly firing for part of a world map. Important validations are that they fire for the same region on multiple different maps, and if they respond to words for countries or cities in that region.</d-footnote> These neurons don’t have a region as the primary focus, but have some kind of geographic information baked in, firing weakly for regions on a world map related to them. For example, an {geo_ref("entrepreneurship neuron", 2, 1)} that fires for California or a {geo_ref("cold neuron", 2, 4)} that fires for the Arctic.<d-footnote>We also find an {geo_ref("angel neuron", 2, 0)} which responds to “Los Angeles” and California on a map.</d-footnote> Other neurons link concepts to regions of the world in ways that seem Americentric or even racist: an {geo_ref("immigration neuron", 2, 2)} that responds to Latin America, and a {geo_ref("terrorism neuron", 2, 5)} that responds to the Middle East.<d-footnote>We also find that the linear combination of neurons that respond to Russia on a map strongly responds to Pepe the frog, a symbol of white nationalism in the United States allegedly promoted by Russia. Our impression is that Russians probably wouldn’t particularly see this as a symbol of Russia, suggesting it is more “Russia as understood by the US.”</d-footnote></p>

#### Case Study: Africa Neurons

Despite these examples of neurons learning Americentric caricatures, there are some areas where the model seems slightly more nuanced than one might fear, especially given that CLIP was only trained on English language data. For example, rather than blurring all of Africa into a monolithic entity, the RN50-x4 model develops neurons for three regions within Africa. This is significantly less detailed than its representation of many Western countries, which sometimes have neurons for individual countries or even sub-regions of countries, but was still striking to us.<d-footnote>It’s important to keep in mind that the model can represent many more things using combinations of neurons. Where the model dedicates neurons may give us some sense of the level of nuance, but we shouldn’t infer, for example, that it doesn’t somehow represent individual African countries.</d-footnote> <d-footnote comma>To contextualize this numerically, the model seems to dedicate ~4% of its regional neurons to Africa, which accounts for ~20% of the world’s landmass, and ~15% of the world’s population.</d-footnote> 

import MarginNeuronsAfrica from './diagrams/MarginNeuronsAfrica.svelte'

<Svelte component={MarginNeuronsAfrica} container={<div className="margin-diagram" />} />

In early explorations it quickly became clear these neurons “know” more about Africa than the authors. For example, one of the first feature visualizations of the South African regional neuron drew the text “Imbewu”, which we learned was a South African TV drama.<d-footnote>One of the long-standing dreams of interpretability is that we’ll be able to learn from neural networks <d-cite bibtex-key="carter2017using,olah2015visualizing"></d-cite>. Learning about a TV drama might not be the kind of deep insights one might have envisioned, but it is a charming proof of concept.</d-footnote>


We chose the East Africa neuron for more careful investigation, again using a conditional probability plot. It fires most strongly for flags, country names, and other strong national associations.<d-footnote>This also includes images of website TLDs, cell service providers, television networks, and maps.</d-footnote> Surprisingly, the medium strength activations — the much more common case<d-footnote>Neuron activations tend to follow an exponential distribution in their tails, a point that was made to us by Brice Menard. This means that strong activations are more common than you’d expect in a Gaussian (where the tail decays at exp(-x^2)), but are much less common than weaker activations.</d-footnote> — have a significantly different distribution and seems to be mostly about ethnicity. Perhaps this is because ethnicity is implicit in all images of people, providing weak evidence for a region, while features like flags are far less frequent, but provide strong evidence when they do occur. This is the first neuron we've studied closely with a distinct regime change between medium and strong activations.

import RegionalConditional from './pages/regions/regionalConditional'

<RegionalConditional neuron={1317} />

We also looked at the activations of the other two Africa neurons. We suspect they have interesting differences beyond their detection of different country names and flags — why else would the model dedicate three neurons — but we lacked the cultural knowledge to appreciate their subtleties.

<h3 id="feature-properties">
Feature properties
</h3>

So far, we’ve looked at particular neurons to give a sense of the kind of features that exist in CLIP models. It's worth noting several properties that might be missed in the discussion of individual features:

import ImageWordEmbeddingFootnote from './diagrams/ImageWordEmbeddingFootnote.svelte'

<p><b>Image-Based Word Embedding:</b> Despite being a vision model, one can produce “image-based word embeddings” with the visual CLIP model by rastering words into images and then feeding these images into the model, and then subtracting off the average over words. Like normal word embeddings, the nearest neighbors of words tend to be semantically related.<Svelte component={ImageWordEmbeddingFootnote}  container={<d-footnote />} />  Word arithmetic <d-cite bibtex-key="mikolov2013linguistic" /> such as <br /><span style={{display: " inline-block", margin: 12}}><i>V(Img(</i>“King”<i>)) <span style={{margin: 4}}>-</span> V(Img(</i>“Man”<i>)) <span style={{margin: 4}}>+ </span>V(Img(</i>“Woman”<i>)) <span style={{margin:4}}>=</span> V(Img(</i>“Queen”<i>))</i></span><br /> work in some cases if we mask non-semantic lexicographic neurons (eg. “-ing” detectors). It seems likely that mixed arithmetic of words and images should be possible.</p>
    
<p><b>Limited Multilingual Behavior:</b> Although CLIP’s training data was filtered to be English, many features exhibit limited multilingual responsiveness. For example, a {mref("“positivity” neuron", 36)} responds to images of English “Thank You”, French “Merci”, German “Danke”, and Spanish “Gracias,” and also to English “Congratulations”, German “Gratulieren”, Spanish “Felicidades”, and Indonesian “Selamat”. As the example of Indonesian demonstrates, the model can recognize some words from non Romance/Germanic languages. However, we were unable to find any examples of the model mapping words in non-Latin script to semantic meanings. It can recognize many scripts (Arabic, Chinese, Japanese, etc) and will activate the corresponding regional neurons, but doesn’t seem to be able to map words in those scripts to their meanings.<d-footnote>One interesting question is why the model developed reading abilities in latin alphabet languages, but not others. Was it because more data of that type slipped into the training data, or (the more exciting possibility) because it’s easier to learn a language from limited data if you already know the alphabet?</d-footnote></p>
      
<p><b>Bias:</b> Certain kinds of bias seem to be embedded into these representations, similar to classic biases in word embeddings (eg. <d-cite bibtex-key="bolukbasi2016man" />). The most striking examples are likely racial and religious bias. As mentioned in our discussion of region neurons, there seems to be a {mref("“terrorism/Islam” neuron",  1596)} which responds to images of words such as “Terrorism”, “Attack”, “Horror”, “Afraid”, and also “Islam”, “Allah”, “Muslim”. This isn’t just an illusion from looking at a single neuron: the image-based word embedding for “Terrorist” has a cosine similarity of 0.52 with “Muslims”, the highest value we observe for a word that doesn’t include “terror.”<d-footnote>By “image-based word embedding”, we mean the activation for an image of that word, with the average activation over images of 10,000 English words subtracted off. The intuition is that this removes generic “black text on white background” fatures. If one measures the cosine similarity between “Terrorism” and “Muslim” without subtracting off the average, it’s much higher at about 0.98, but that’s because all values are shifted up due to sharing the black text white-background.</d-footnote> Similarily, an {mref("“illegal immigration” neuron", 2213)} selects for Latin America countries. (We’ll see further examples of bias in the next section.)</p>
    
<p><b>Polysemanticity and Conjoined Neurons:</b> Our qualitative experience has been that individual neurons are more interpretable than random directions; this mirrors observations made in previous work<d-cite bibtex-key="szegedy2013intriguing,erhan2009visualizing,olah2017feature,olah2020zoom,netdissect2017"></d-cite>.Although we’ve focused on neurons which seem to have a single clearly defined concept they respond to, many CLIP neurons are “polysemantic” <d-cite bibtex-key="olah2017feature,olah2020zoom" />, responding to multiple unrelated features. Unusually, polysemantic neurons in CLIP often have suspicious links between the different concepts they respond to. For example, we observe as {mref("<b>Phil</b>adelphia/<b>Phil</b>ipines/<b>Phil</b>ip neuron", {model: "v1", unit: 843})}, a {mref("Christm<b>as</b>/<b>As</b>s neuron", {model: "v1", unit: 145})}, and an {mref("Ac<b>tor</b>/Velocirap<b>tor</b> neuron", {model: "v1", unit: 707})}. The concepts in these neurons seem “conjoined”, overlapping in a superficial way in one facet, and then generalizing out in multiple directions. We haven’t ruled out the possibility that these are just coincidences, given the large number of facets that could overlap for each concept. But if conjoined features genuinely exist, they hint at new potential explanations of polysemanticity.<d-footnote>In the past, when we've observed seemingly polysemantic neurons, we've considered two possibilities: either it is responding to some shared feature of the stimuli, in which case it isn’t really polysemantic, or it is genuinely responding to two unrelated cases. Usually we distinguish these cases with feature visualization. For example, InceptionV1 4e:55 responds to cars and cat heads. One could imagine it being the case that it’s responding to some shared feature — perhaps cat eyes and car lights look similar. But feature visualization establishes a facet selecting for a globally coherent cat head, whiskers and all, as well as the metal chrome and corners of a car. We concluded that it was genuinely <i>OR(cat, car)</i>.<br /><br />
Conjoined features can be seen as a kind of mid-point between detecting a shared low-level feature and detecting independent cases. Detecting Santa Claus and “turn” are clearly true independent cases, but there was a different facet where they share a low-level feature. <br /><br />
Why would models have conjoined features? Perhaps they’re a vestigial phenomenon from early in training when the model couldn’t distinguish between the two concepts in that facet. Or perhaps there’s a case where they’re still hard to distinguish, such as large font sizes. Or maybe it just makes concept packing more efficient, as in the superposition hypothesis.</d-footnote></p>


<br /><hr /><br />


<h2 id="using-abstractions">
Using Abstractions
</h2>

We typically care about features because they’re useful, and CLIP’s features are more useful than most. These features, when ensembled, allow direct retrieval on a variety of queries via the dot product alone.

Untangling the image into its semantics <d-cite bibtex-key="dicarlo2012does" /> enables the model to perform a wide variety of downstream tasks including imagenet classification, facial expression detection, geolocalization and more. How do they do this? Answering these questions will require us to look at how neurons work in concert to represent a broader space of concepts.

To begin, we’ll make this question concrete by taking a deep dive into one particular task: the Imagenet challenge.

<h3 id="imagenet-challenge">
The Imagenet Challenge
</h3>

To study how CLIP classifies Imagenet, it helps to look at the simplest case. We use a sparse linear model for this purpose, following the methodology of Radford et al <d-cite bibtex-key="radford2020clip" />. With each class using only 3 neurons on average, it is easy to look at all of the weights. This model, by any modern standard, fares poorly with a top-5 accuracy of 56.4%, but the surprising thing is that such a miserly model can do anything at all. How is each weight carrying so much weight?

ImageNet <d-cite bibtex-key="deng2009imagenet" /> organizes images into categories borrowed from another project called WordNet.
Neural networks typically classify images treating ImageNet classes as structureless labels. But WordNet actually gives them a rich structure of higher level nodes. For example, a Labrador Retriever is a Canine which is a Mammal which is an Animal.

We find that the weights and neurons of CLIP reflect some of this structure. At the highest levels we find conventional categories such as

import ImagenetNeurons from './diagrams/ImagenetNeurons.svelte'

<Svelte component={ImagenetNeurons} container={<div />}/>

But we also find nonconventional taxonomies, such as this cluster of water-related classes:

import HyperSet from './diagrams/HyperSet.svelte'

<Svelte component={HyperSet}/>

We arrive at a surprising discovery: it seems as though the neurons appear to arrange themselves into a taxonomy of classes that appear to mimic, very approximately, the imagenet hierarchy. While there have been attempts to explicitly integrate this information <d-cite bibtex-key="santurkar2020breeds" />, CLIP was not given this information as a training signal. The fact that these neurons naturally form a hierarchy — form a hierarchy without even being trained on ImageNet — suggests that such hierarchy may be a universal feature of learning systems.<d-footnote>We’ve seen hints of similar structure in region neurons, with a whole world neuron, a northern hemisphere neuron, a USA neuron, and then a West Coast neuron.</d-footnote>



<h3 id="understanding-language">
Understanding Language
</h3>

The most exciting aspect of CLIP is its ability to do zero-shot classification: it can be “programmed” with natural language to classify images into new categories, without fitting a model. Where linear probes had fixed weights for a limited set of classes, now we have dynamic weight vectors that can be generated automatically from text. Indeed, CLIP makes it possible for end-users to ‘roll their own classifier’ by programming the model via intuitive, natural language commands - this will likely unlock a broad range of downstream uses of CLIP-style models. 

<p>Recall that CLIP has two sides, a vision side (which we’ve discussed up to this point) and a language side. The two sides meet at the end, going through some processing and then performing a dot product to create a logit. If we ignore spatial structure<d-footnote>In order to use a contrastive loss, the 3d activation tensor of the last convolutional layer must discard spatial information and be reduced to a single vector which can be dot producted with the language embedding. CLIP does this with an attention layer, first generating attention weights <d-math block>{"A = \\mathrm{softmax}(W_k x_{\\text{img}} \\cdot W_q \\text{average}(x_{\\text{img}}))"}</d-math> through an averaging over the spatial dimensions, and then producing an embedding <d-math block>{"y = W_o (\\sum_i A_i W_v x_{\\text{img}, i}) = W_o W_v (\\sum_i A_i x_{\\text{img}, i})"}</d-math> This is somewhat similar to other work<d-cite bibtex-key="abs180908264"/ > on weight pooling. Although the attention step is non-linear in <d-math>{"x_{\\text{img}}"}</d-math> in general, it is a simple exercise to show that if the spatial positions are homogenous attention becomes affine in <d-math>{"x_{\\text{img}}"}</d-math>. </d-footnote>, the logit has the following bilinear form for some matrix <d-math>{"W"}</d-math>,</p>

<p><d-math block>{"\\mathrm{logit} = \\frac{x^T_{\\text{img}} W x_{\\text{text}}}{\\|x_{\\text{img}}\\| \\|x_{\\text{text}}\\|},"}</d-math></p>

<p>
where <d-math>{"x_{\\text{img}}"}</d-math> is the vector of neurons in the penultimate layer of the network, and <d-math>{"x_{\\text{text}}"}</d-math> is the text embedding. We focus on the bilinear interaction term, which governs local interactions in most directions. Although this approximation is somewhat extreme, we believe the bilinear form <d-cite bibtex-key="tenenbaum2000separating"/ > reflects the morally correct structure to focus on: we see exactly this in many other contrastive models <d-cite bibtex-key="sohn2016improved" />, and also in transformers <d-cite bibtex-key="vaswani2017attention" />. We’ll test that this approximation makes correct predictions in the next section.</p>

<p>The bilinear term has a number of interesting interpretations. If we fix <d-math>{"x_{\\text{text}}"}</d-math>, the term <d-math>{"Wx_{\\text{text}}"}</d-math> gives a dynamic weight vector for classifying images. On the other hand, if we fix <d-math>{"x_{\\text{img}}"}</d-math>, the term <d-math>{"x^T_{\\text{img}}W"}</d-math> gives weights for how much text features correspond to a given image.</p>

We’ll mostly be focusing on using text to create zero-shot weights for images. But it’s worth noting one tool that the other direction gives us. If we fix a neuron on the vision side, we can search for the text that maximizes the logit. We do this with a hill climbing algorithm to find what amounts to the text maximally corresponding to that neuron. Running this on the common <a href="#emotion-neurons">emotion neurons</a>, we see that the maximal text <d-footnote>Cherry picked from a set of 28</d-footnote> matches our expectations:

import EmotionNeurons2 from './diagrams/EmotionNeurons2.svelte'
import EmotionNeurons from './diagrams/EmotionNeurons.svelte'

<Svelte component={EmotionNeurons} container={<div />}/>

<p>And on <a href="#emotion-neurons">neurons with secondary emotion roles</a>, these maximal texts bring a layer of clarity their meaning and usage:</p>

<Svelte component={EmotionNeurons2} container={<div />}/>

<p>We now focus on the adjoint problem - given a text embedding, we wish to understand neurons that contribute maximally to it.</p>


<h3 id="emotional-intelligence">
Emotion Composition
</h3>

As we see above, English has far more descriptive words for emotions than the vision side has emotion neurons. And yet, the vision side recognizes these more obscure emotions. How can it do that? 

We can see what different emotion words correspond to on the vision side by taking attribution, as described in the previous section, to "I feel X" on the language side. This gives us a vector of image neurons for each emotion word.<d-footnote>Since the approximations we made in the previous section aren’t exact, we double-checked these attribution vectors for all of the “emotion equations” shown by taking the top image neuron in each one, artificially increasing its activation at the last layer on the vision side when run on a blank image, and confirming that the logit for the corresponding emotion word increases on the language side.</d-footnote> Looking at a list of common emotion words<d-footnote>from a feeling wheel, we'll see later</d-footnote>, we find the sparse set of emotion neurons that compose in various ways to span this broader space of emotions.<d-footnote>We do this by taking the vectors <d-math>W x_{\\text{text}}</d-math> for the prompts "i am feeling {emotion}, "Me feeling {emotion} on my face", "a photo of me with a {emotion} expression on my face" on each one of the emotion-words on the emotion-wheel. We assign each prompt a label corresponding to the emotion-word, and then we then run sparse logistic regression to find the neurons that maximally discriminate between the attribution vectors. For the purposes of this article, these vectors are then cleaned up by hand by removing neurons that respond to bigrams.</d-footnote> This may relate to a line of thinking in psychology where combinations of basic emotions form the “complex emotions” we experience.<d-footnote>The theory of constructed emotion.</d-footnote>



For example, the jealousy emotion is success + grumpy. Bored is relaxed + grumpy. Intimate is soft smile + heart - sick. Interested is question mark + heart and inquisitive is question mark + shocked. Surprise is celebration + shock.




import EmotionsSemantic from './pages/emotions/semantic'

<EmotionsSemantic emotionNames={['jealous', 'bored', 'intimate', 'surprised']} figureNumber='9' />


Sometimes physical objects contribute to representing emotions.
For example, part of "powerful" is a lightning neuron, part of "creative" is a painting neuron, part of "embarrassed" is a neuron corresponding to the years 2000-2012<d-footnote>explain the neuron is a time period and the language side thinks of it as embarrassing</d-footnote>, and part of “let down" is a neuron for destruction.


<EmotionsSemantic emotionNames={['powerful', 'creative', 'embarrassed', 'let down']} figureNumber='10' />


We also see concerning use of sensitive topics in these emotion vectors, suggesting that problematic spurious correlations are used to caption expressions of emotion. For instance, "accepted" detects LGBT. "Confident" detects overweight. "Pressured" detects Asian culture.
(disrespected)



<EmotionsSemantic emotionNames={['accepted', 'confident', 'pressured']} figureNumber='11' />


We can also search for examples where particular neurons are used, to explore their role in complex emotions. We see the mental illness neuron contributes to emotions like “stressed,” “anxious,” and “mad.”



<EmotionsSemantic emotionNames={['stressed', 'anxious', 'mad']} figureNumber='12' />


So far, we’ve only looked at a subset of these emotion words. We can also see a birds-eye view of this broader landscape of emotions by visualizing every attribution vector together.



import Atlas from './pages/emotions/atlas'

<Atlas />


This atlas has a few connections to classical emotion research. When we use just 2 factors, we roughly reconstruct the canonical mood-axes used in much of psychology: valence and arousal. If we increase to 7 factors, we nearly reconstruct a well known categorization of these emotions into happy, surprised, sad, bad, disgusted, fearful, and angry, except with “disgusted” switched for a new category related to affection that includes “valued,” “loving,” “lonely,” and “insignificant.”

<br /><hr /><br />

<h2 id="typographic-attacks">
Typographic Attacks
</h2>

As we’ve seen, CLIP is full of multimodal neurons which respond to both images and text for a given concept. Given how strongly these neurons react to text, we wonder: can we perform a kind of non-programmatic adversarial attack – a *typographic attack* – simply using handwriting?

To test this hypothesis, we took several common items and deliberately mislabeled them. We then observed how this affects ImageNet classifications (discussed <a href="imagenet-challenge">earlier</a>). These attacks often change the image’s classification.


import InTheWild2 from './diagrams/InTheWild2.svelte'

<Svelte component={InTheWild2} />

While many classic adversarial attacks focus on making imperceptible changes to images <d-cite bibtex-key="szegedy2013intriguing" />, typographic attacks are more similar to work such as *adversarial patches* <d-cite bibtex-key="brown2017adversarialpatch" /> and *physical adversarial examples*<d-cite bibtex-key="athalye2017adversarialturtle" />. Adversarial patches are stickers that can be placed on real-life objects in order to cause neural nets to misclassify those objects as something else – for example, as toasters. Physical adversarial examples are complete 3D objects that are reliably misclassified from all perspectives, such as a 3D-printed turtle that is reliably misclassified as a rifle. Typographic attacks are both weaker and stronger than these. On the one hand, they only work for models with multimodal neurons. On the other hand, once you understand this property of the models, the attacks can be executed *non-programmatically* and as *black-box attacks*, available to any adversary – including six year olds.



<h3 id="evaluating-typographic-attacks">
Evaluating Typographic Attacks
</h3>

Our physical adversarial examples are a proof of concept, but they don’t give us a very good sense of how frequently typographic attacks succeed. Duct tape and markers don't scale, so we create an automated setup to measure the attack’s success rate on the ImageNet validation set.


import AttackSetup from './diagrams/AttackSetup.svelte'

<Svelte component={AttackSetup} container={<div style={{gridColumn: 'text / screen', marginTop: '40px', marginBottom: '40px' }} /> }   />


We found text snippets for our attacks in two different ways. Firstly, we manually looked through the multimodal model's neurons for those that appear sensitive to particular kinds of text. This is how we found the *piggy bank*, *waste container,* and *Siamese cat* attacks. Secondly, we brute-force searched through all of the ImageNet class names looking for short class names which are, in and of themselves, effective attacks. This is how we found *rifle*, *pizza*, *radio*, *iPod*, *shark*, and *library*.

import AttackableNeurons from './diagrams/AttackableNeurons.svelte'

<SvelteMargin component={AttackableNeurons} />

Using this setup, we found several attacks to be reasonably effective. The most successful attacks achieve a 97% attack success rate with only around 7% of the image's pixels changed. These results are competitive with the results found in *Adversarial Patch*, albeit on a different model.



import AutomatedAttacks from './diagrams/AutomatedAttacks.svelte'

<SvelteInline component={AutomatedAttacks} />


<Todo to="Chelsea" value={3}>Run zero-shot results, get data</Todo>

<!--[Assuming we have a zero-shot col in above table.] It’s worth noting that the zero-shot classifier is more vulnerable to these attacks than the linear probes classifier, but the attacks are somewhat effective on both.!-->

<h3 id="the-stroop-effect">
Comparison with the Stroop Effect
</h3>

The model’s response to these adversarial images is reminiscent of the Stroop effect <d-cite bibtex-key="stroop1935studies" />. Just as our models make errors when adversarial text is added to images, humans are slower and more error prone when images have incongruent labels. 

A classic demonstration of the Stroop effect is that recognizing a 'mislabeled' color (eg. <span style={{color: "blue", opacity: "0.8"}}>green</span>, <span style={{color: "red", opacity: "0.8"}}>blue</span>, <span style={{color: "green", opacity: "0.8"}}>red</span>) is harder than normal. To compare CLIP’s behavior to these human experiments, we had CLIP classify these stimuli by color, using its zero-shot classification.  Unlike humans, CLIP can’t slow down to compensate for the harder task. Instead of taking a longer amount of time for the incongruent stimuli, it has a very high error rate.

import StroopExperiment from './diagrams/StroopExperiment.svelte'

<Svelte component={StroopExperiment} />


<br /><hr /><br />

<h2 id="appendix">
Appendix: Methodological Details
</h2>

<h3 id="conditional-probability">
Conditional Probability Plots
</h3>

If we really want to understand the behavior of a neuron, it’s not enough to look at the cases where it maximally fires. We should look at the full spectrum: the cases where it weakly fired, the cases where it was on the border of firing, and the cases where it was strongly inhibited from firing. This seems especially true for highly abstract neurons, where weak activations can reveal “associated stimuli,” such as a Donald Trump neuron firing for Mike Pence.

Since we have access to a validation set from the same distribution the model was trained on, we can sample the distribution of stimuli that cause a certain level of activation by iterating through the validation set until we find an image that causes that activation.

To more rigorously characterize this, we create a plot showing the conditional probability of various categories as a function of neuron activation, following the example of Curve Detectors <d-cite bibtex-key="cammarata2020curve" />. To do this, we defined uniformly spaced buckets between the maximally inhibitory and maximally excitatory activation values, and sampled a fixed number of stimuli for each activation range. Filling in the most extreme buckets requires checking the neuron activations for millions of stimuli. Once we have a full set of stimuli in each bucket, we blind a labeler to the activation of each stimuli, and have them select salient categories they observed, informed by the hypothesis we have for the neuron. The human labeler then categorized each stimuli into these categories, while blinded to the activation.

We plot the activation axis in terms of standard deviations of activation from zero, since activations have an arbitrary scale. But keep in mind that activations aren’t Gaussian distributed, and have much thicker tails.

In reading these graphs, it’s important to keep in mind that different activation levels can have many orders of magnitude differences in probability density. In particular, probability density peaks around zero and decays exponentially to the tails. This means that false negatives for a rare category will tend to not be very visible, because they’ll be crowded out at zero: these graphs show a neuron’s precision, but not recall. Curve Detectors <d-cite bibtex-key="cammarata2020curve" /> discusses these issues in more detail.

An alternative possibility is to look at the distribution of activations conditioned on a category. We take this approach in our second plot for the Trump neuron. These plots can help characterize how the neuron responds to rare categories in regions of higher density, and can help resolve concerns about recall. However, one needs some way to get samples conditioned on a category for these experiments, and it’s possible that your process may not be representative. For our purposes, since these neurons are so high-level, we used a popular image search to sample images in a category.

<h3 id="faceted-feature-visualization">
Faceted Feature Visualization
</h3>

<p>
    A neuron is said to have multiple facets<d-cite bibtex-key="nguyen2016multifaceted"></d-cite> if it responds to multiple, distinct categories of images. For example, a pose-invariant dog-head detector detects dog heads tilted to the left, right, or facing straight on<d-cite bibtex-key="olah2020zoom"></d-cite>. A grocery store detector <d-cite bibtex-key="nguyen2016multifaceted"></d-cite> fires for both the exteriors and interiors of grocery stores. Boundary detectors <d-cite
    bibtex-key="olah2020overview"></d-cite> look for a difference in texture from one side to the other but doesn’t care which is which. A neuron may even fire for many different, unrelated categories of images <d-cite bibtex-key="olah2017feature,olah2020zoom"></d-cite>. We refer to these as polysemantic neurons. 
</p>

<p>
    <a href="https://distill.pub/2017/feature-visualization/"
    >Feature visualization</a
    ><d-cite bibtex-key="erhan2009visualizing,olah2017feature,simonyan2013deep,nguyen2015deep,mordvintsev2015inceptionism,nguyen2016plug"
    ></d-cite>
    is a technique where the input to a neural network is optimized to create
    a stimuli demonstrating some behavior, typically maximizing the activation
    of a neuron. Neurons that possess multiple facets present particular challenges to feature visualization as the multiple facets are difficult to represent as a single image.
    When such neurons are encountered, feature visualization often tries to draw both facets at once (making it nonsensical), or just reveal one facet <d-footnote>The difference between the two is believed to be related to the phenomena of mutual inhibition, see the InceptionV1 pose invariant dog head circuit<d-cite bibtex-key="olah2020zoom"></d-cite>.</d-footnote>. Both cases are inadequate. 
</p>

<p>
    We are aware of two past approaches to improving feature visualization for multi-faceted neurons. The first approach is to find highly diverse images that activate a given neuron, and use them as seeds for the feature visualization optimization process<d-cite bibtex-key="nguyen2016multifaceted"></d-cite
    >. The second tries to combine feature visualization together with a term that encourages diversity of the activations on earlier layers<d-cite bibtex-key="olah2017feature"></d-cite>.
</p>

<p>
    Here we propose a new feature visualization objective, <i>faceted feature visualization</i>, that allows us to steer the feature visualization towards a particular theme (e.g. text, logos, facial features, etc), defined by a collection of images. The procedure works as follows: first we collect examples of images in this theme, and train a linear probe on the lower layers of the model to discriminate between those images and generic natural images. We then do feature visualization by maximizing the penalized objective, $f(g(x)) + w^T(g(x)\odot \nabla f(g(x)))$, where $w$ are the weights of that linear probe, and $f \circ g$ is the original feature visualization objective, composed of two functions, $g$, which takes the input into an intermediate activations and $f$ which takes those intermediate activations into the final objective. 
</p>

<p>
    For the facets used in this paper, the <i>architecture</i>, <i>indoors</i> and <i>nature</i> facets use images from SUN397 <d-cite bibtex-key="xiao2010sun"></d-cite>, <i>pose</i> uses bounding boxes from VOC2012 <d-cite bibtex-key="everingham2010pascal"></d-cite>, and <i>face</i> uses a mixture of fairface <d-cite bibtex-key="karkkainen2019fairface"></d-cite> and Flickr-Faces-HQ  <d-cite bibtex-key="karras2019style"></d-cite>.
</p>

<p>
    The reader may be curious why we do not maximize $f(g(x)) + w^Tg(x)$ instead. We have found that, in practice, the former objective produces far higher quality feature visualizations; we believe this is because the $\nabla f(g(x))$ acts as a acts as a filter, downweighting the irrelevant components of $g(x)$ that do not contribute to the objective $f \circ g(x)$. We have found, too, replacing the diversity term on the intermediate activations $g$ in <d-cite bibtex-key="olah2017feature"></d-cite> with $g(x)\odot \nabla f(g(x))$ improves the quality of resulting visualizations dramatically.
</p>





<Todos />

