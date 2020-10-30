import Svelte from './svelte'
import SvelteMargin from './svelte-margin'
import SvelteInline from './svelte-inline'
import Todo from './diagrams/todo'
import Todos from './diagrams/todos'

<Todo to="Nick" value={4}>Come up with a hero draft</Todo>
<Todo to="Nick" value={3}>Find better quote from Quiroga</Todo>
<Todo to="Chris" value={3}>Terminology: Model vs Stream vs Side</Todo>
<Todo to="Chris" value={3}>Footnote styling “,” issue</Todo>


In 2005, a letter published in Nature described human neurons responding to specific people, such as Jennifer Aniston or Halle Berry <d-cite bibtex-key="quiroga2005invariant" />. The exciting thing wasn’t just that they selected for particular people, but that they did so regardless of whether they were shown photographs, drawings, or even images of the person’s name. The neurons were multimodal. As the lead author would put it: "You are looking at the far end of the transformation from metric, visual shapes to conceptual… information." <d-footnote>Quiroga's full quote, from <a href="https://www.newscientist.com/article/dn7567-why-your-brain-has-a-jennifer-aniston-cell/">New Scientist</a> reads: "I think that’s the excitement to these results. You are looking at the far end of the transformation from metric, visual shapes to conceptual memory-related information. It is that transformation that underlies our ability to understand the world. It’s not enough to see something familiar and match it. It’s the fact that you plug visual information into the rich tapestry of memory that brings it to life." We elided the portion discussing memory since it was less relevant.</d-footnote>

We report the existence of similar multimodal neurons in artificial neural networks. This includes neurons selecting for prominent public figures or fictional characters, such as Donald Trump, Lady Gaga, and Spiderman.<d-footnote>Some of the figures we found neurons for are divisive. It should go without saying that having a dedicated neuron simply reflects the prominence of these figures in the training data, collected in [2019?]. Being divisive increases this prominence, because divisive figures are more likely to be extensively discussed on the Internet. In the case of the Donald Trump neuron, it seems likely there would have also been a Hillary Clinton neuron if data had been collected in 2016 instead. (There are other neurons which respond to Hillary Clinton in addition to other topics.) </d-footnote><d-footnote comma>It’s important to note that the vast majority of people these models recognize don’t have a specific neuron, but instead are represented by a combination of neurons. Often, the contributing neurons are conceptually related. For example, the Trump neuron fires (albeit more weakly) for Mike Pence, contributing to representing him.</d-footnote><d-footnote comma>Some of the neurons we found seem strikingly similar to those described in Quiroga et al []. The Donald Trump neuron we found might be seen as similar to Quiroga et al’s Bill Clinton neuron. A Star Wars neuron we find seems analogous to a biological Star Wars neuron described Quiroga et al’s follow up paper []. And although we don’t find an exact Jennifer Aniston neuron, we do find a neuron for the TV show “Friends” which fires for her.</d-footnote> Like the biological multimodal neurons, these artificial neurons respond to the same subject in photographs, drawings, and images of their name:

<Todo to="Chris" value={4}>Do we want to use this diagram?</Todo>

import HalleBerry from './diagrams/halleBerry/index.svelte'

<Svelte component={HalleBerry} container={<div />} />


People-detecting neurons only scratch the surface of the highly abstract neurons we've found. There are neurons coding for emotions, regions of the world, religions, and much more. They generalize in highly abstract ways. For example, the region neurons respond to the relevant regions on a world map, dominant ethnicities, local scripts, and country names.

We find these multimodal neurons in the recent CLIP models [], although it's possible similar undiscovered multimodal neurons may exist in earlier models. A CLIP model consists of both a ResNet vision model and a Transformer language model, trained to align pairs of images and text from the internet using a contrastive loss. <d-footnote>The authors also kindly shared an alternative version from earlier experiments, where the training objective was an autoregressive language modelling objective, instead of a contrastive objective. The features seem pretty similar.</d-footnote> There are several CLIP models of varying sizes; we find multimodal neurons in all of them, but focus on studying the mid-sized RN50-x4 model. <d-footnote>We found it challenging to make feature visualization work on the largest CLIP models. The reasons why remain unclear. See faceted feature visualization.</d-footnote> We focus our analysis on CLIP's vision stream, so when we talk about a multimodal neuron responding to text we mean the model "reading" text in images. <d-footnote>The alignment with the text side of the model might be seen as an additional form of multimodality, perhaps analogous to a human neuron responding to hearing a word rather than seeing it (see Quiroga’s later work). But since that is an expected result of the training objective, it seems less interesting.</d-footnote>

CLIP’s abstract visual features might be seen as the natural result of aligning vision and text. We expect word embeddings (and language models generally) to learn abstract "topic" features []. Either the language stream needs to give up those features, or the vision stream needs to build visual analogues. <d-footnote>Many researchers are interested in “grounding” language models by training them on tasks involving another domain, in the hope of them learning a more real world understanding of language. The abstract features we find in vision models can be seen as a kind of “inverse grounding”: vision taking on more abstract features by connection to language.</d-footnote> <d-footnote comma>This includes some of the classic kinds of bias we see in word embeddings, such as a “terrorism”/”Islam” neuron, or an “Immigration”/”Mexico” neuron. See discussion in the <a href="#region-neurons">region neurons section</a>.</d-footnote> But even if these features seem natural in retrospect, they are qualitatively different from neurons previously studied in vision models <d-cite bibtex-key="" />. They also have real world consequences: these models are vulnerable to a kind of “typographic attack” where adding adversarial text to images can cause them to be systematically misclassified.

import AttackDemo from './diagrams/AttackDemo.svelte'

<Svelte component={AttackDemo} container={<div className="margin-diagram" />} />

import MicroscopeAlert from './diagrams/MicroscopeAlert.svelte'

<Svelte component={MicroscopeAlert} container={<div className="div" />} />



<br /><hr /><br />

<h2 id="guided-tour-of-neuron-families">
A Guided Tour of Neuron Families
</h2>

What features exist in CLIP models? In this section, we examine neurons found in the final convolutional layer of the image stream across four models. Each consists of thousands of neurons, so for our preliminary analysis we looked at feature visualizations, the dataset examples that most activated the neuron, and the English words which most activated the neuron when rastered as images. This revealed an incredible diversity of features:

<Todo to="Nick" value={5}>Chris deleted the ‘most neurons are interpretable’ comment. Talk to Chris about evidence that would convince him to add it back in. (eg. try to categorize the top 100 neurons).</Todo>

import NeuronFamilies from './diagrams/NeuronFamilies.svelte'

<Svelte component={NeuronFamilies} />

These neurons don’t just select for a single object. They also fire (more weakly) for associated stimuli, such as a Barack Obama neuron firing for Michelle Obama or a morning neuron firing for images of breakfast. They also tend to be maximally inhibited by stimuli which could be seen, in a very abstract way, as their opposite. <d-footnote>Some neurons seem less abstract. For example, typographic features like the “-ing” detector seem to roughly fire based on how far a string is away in Levenshtein distance. Although, even these show remarkable generalization, such as responding to different font sizes and rotated text.</d-footnote>

How should we think of these neurons? They might sound like “grandmother neurons” from neuroscience, but their associative nature distinguishes them from how many neuroscientists interpret the term <d-cite bibtex-key="" />. The term “concept neurons” has sometimes been used to describe biological neurons with similar properties  <d-cite bibtex-key="" />, but this framing might encourage people to overinterpret these artificial neurons. Instead, the authors generally think of these neurons as being something like the visual version of a topic feature, activating for features we might expect to be similar in a word embedding.

CLIP contains a large number of interesting neurons. To allow detailed examination we’ll focus on three of the “neuron families” shown above: people neurons, emotion neurons, and region neurons. We invite you to explore others in Microscope.

<h3 id="person-neurons">
Person Neurons
</h3>

To caption images on the Internet you need cultural knowledge. If you try captioning the popular images of a foreign place, you’ll quickly find your object and scene recognition skills aren't enough. You can't caption photos at a stadium without recognizing the sport, and you may even need to know specific players to get the caption right. Pictures of politicians and celebrities speaking are even more difficult to caption if you don’t know who’s talking and what they talk about, and these are some of the most popular pictures on the Internet. With this in mind, perhaps it’s unsurprising that the model invests significant capacity in understanding the most prominent people in popular culture.

A Hitler neuron learns to detect his face and body, symbols of the Nazi party, relevant historical documents, and other loosely related concepts like German food. Feature visualization shows swastikas and Hitler seemingly doing a Nazi salute. A Jesus Christ neuron detects Christian symbols like crosses and crowns of thorns, paintings of Jesus, his written name, and feature visualization shows him as a baby in the arms of the Virgin Mary. A Spiderman neuron recognizes the masked hero and knows his secret identity, Peter Parker. It also responds to images, text, and drawings of heroes and villians from Spiderman movies and comics over the last half-century.

import PeopleMargin from './pages/people/margin'

<PeopleMargin />

#### Case Study: Donald Trump Neuron

Which people the model develops dedicated neurons for is stochastic, but seems correlated with the person's prevalence across the dataset. The one person we’ve found in every CLIP model is Donald Trump. It recognizes him across a wide variety of settings, including effigies and caricatures in many artistic mediums, as well as people he’s worked closely with like Mike Pence and Steve Bannon. It also responds to his political symbols and messaging (eg. “The Wall” and “Make America Great Again” hats). On the other hand, it most *negatively* activates to musicians like Nicky Minaj and Eminem, video games like Fortnite, black rights activists like Martin Luther King Jr., and LGBT symbols like rainbow flags.

To better understand this neuron we estimate the conditional probability of several categories of images at different activation levels using human labeling, of X images.

import PeopleHandLabeled from './pages/people/handLabeledTrump'

<PeopleHandLabeled />

<Todo to="Nick" value={6}> move to stddev instead of activations, show two dataset examples under each legend labels, show dataset examples for each range of activation</Todo>

(fig caption: To get a qualitative sense for what kinds of images cause the neuron to fire different amounts, we collected X images across different levels of firing, labeled them by hand into several categories, giving us an estimate of the conditional probability of each category at different levels of activation. While we labeled the images we couldn’t see how much they made the neuron fire.)

While labeling images for the previous experiment it became clear the neuron activates different amounts for specific people. We can study this more by searching the Internet for pictures of specific people and measuring how the images of each person makes the neuron fire.

import TrumpPeople from './pages/people/trumpPeople'

<TrumpPeople />

<Todo to="Nick" value={6}> transpose so bars are going horizontal, designate zero-point, std of each category show on bar</Todo>

Presumably, people detecting neurons also exist in normal facial recognition models. What makes these neurons unique is that they respond to the person across modalities and associations, situating them in a cultural context. In particular, we're struck by how the neuron's response tracks an informal intuition with how associated people are. In this sense, person neurons can be thought of as a landscape of person-associations, with the person themself as simply the tallest peak.

<h3 id="emotion-neurons">
Emotion Neurons
</h3>

Since a small change in someone's expression can radically change the meaning of a picture, emotional intelligence is essential to the task of captioning. We've found dozens of neurons that primarily respond to emotion, and many others that detect emotion as a part of a related but broader concept.



import EmotionsIntro from './pages/emotions/intro'

<EmotionsIntro />

<Todo to="Nick" value={6}>replace accepting an offer or fix, consider adding small indoor figure footnote, keep indoor</Todo>

<Todo to="Chris" value={5}>Create new version of emotion neuron diagrams in margin</Todo>

These neurons are flexible, recognizing body language and facial expressions in humans and animals, drawings, text, and even landscapes and interior designs that evoke the emotion's vibe. The surprise neuron activates even when the majority of the face is obscured. It responds to slang like "OMG!" and "WTF", and text feature visualization produces similar words of shock and surprise.

import MarginNeuronShock from './diagrams/MarginNeuronShock.svelte'

<Svelte component={MarginNeuronShock}  container={<div className="margin-diagram" style={{gridRow: "auto / span 1"}} ></div>} />

<!-- import EmotionsSurprise from './pages/emotions/surprise'

<EmotionsSurprise /> -->


Other neurons learn to detect emotions as part of a broader concept. A neuron that primarily detects pornographic content has a secondary function of detecting the emotion of arousal. A price tag neuron detects an expression of looking up in awe, and text feature visualization includes "looking up into the heavens". A neuron that primarily detects official letters of acceptance or notices of appointment also contains a facial expression of acceptance.


import MarginNeuronsMisc from './diagrams/MarginNeuronsMisc.svelte'

<Svelte component={MarginNeuronsMisc}  container={<div className="margin-diagram" style={{gridRow: "auto / span 1"}} ></div>} />

<!-- import EmotionsMinor from './pages/emotions/minor'

<EmotionsMinor /> -->


On the other extreme, some neurons respond simply to specific body and facial expressions, like the silly expression neuron. It activates most to the internet-born duckface expression and peace signs, and both words show up in its text feature visualization.

import MarginNeuronDuck from './diagrams/MarginNeuronDuck.svelte'

<Svelte component={MarginNeuronDuck} container={<div className="margin-diagram" style={{gridRow: "auto / span 2"}} ></div>} />

<!-- import EmotionsDuckface from './pages/emotions/minor/duckface'

<EmotionsDuckface /> -->

We're excited at the promise of emotion neurons to benefit social studies that need algorithmic access to emotion detectors. These neurons could help people understand the emotional content of a long video, either by coloring the video's scrubber based on the emotions at each time, or by showing an Activation Atlas of the scenes of a movie based on emotion to see cinematography in a new way. These emotions could also be useful for studying how expressions change over time. With a dataset of selfies over the last decade with their location tagged, perhaps one could better understand birth and spread of expressions like the duckface as it propagates across cultures and geographies.

#### Case Study: Mental Illness Neuron

One neuron that doesn't represent a single emotion but rather a high level category of emotions is the mental illness neuron, which is separate from a different physical illness neuron. It responds to a variety of low valence emotions like anxiety, depression, and loneliness across modalities. It also responds to images and text of drugs, and words like "mental" and "psychology".

To better understand this neuron we again estimated the conditional probabilities of various categories by activation magnitude. The strongest positive activations are concepts related to mental illness. Conversely, the strongest negative activations correspond to activities like exercise, sports, and music events.


import EmotionsMentalHealth from './pages/emotions/mentalHealth'

<EmotionsMentalHealth />

In a later section, we'll see that an important role of the mental illness neuron is composition with other emotion neurons to differentiate between healthy and unhealthy versions of the emotion it’s combined with. For instance, anxiety is the union of shock and mental illness.

<h3 id="region-neurons">
Region Neurons
</h3>

From local weather and food, to travel and immigration, to language and race: geography is an important implicit or explicit context in a great deal of online discourse. Blizzards are more likely to be discussed in  <a href="#region-neuron-diagram" onClick={()=>{window.setRegionalState("geography", 13, 1)}}>Canada</a>. Vegemite is more likely to come up in  <a href="#region-neuron-diagram" onClick={()=>{window.setRegionalState("geography", 0, 6)}}>Australia</a>. Discussion of  <a href="#region-neuron-diagram" onClick={()=>{window.setRegionalState("geography",  0, 5)}}>China</a> is more likely to be in Chinese.

We find that CLIP models develop <i>region neurons</i> responding to geographic regions. These neurons might be seen as vision analogues of geographic information in word embeddings <d-cite bibtex-key="konkol2017geographical"></d-cite>. They respond to a wide variety of modalities and facets: country and city names, distinctive architecture, prominent public figures, faces of the most common ethnicity, distinctive clothing, wildlife, and local script (if not roman alphabet). If shown a world map, even without labels, these neurons fire selectively for the relevant region on the map.<d-footnote>Map responses seem to be strongest around distinctive geographic landmarks, such as the Gulf Of Carpentaria and Cape York Peninsula for Australia, or the Gulf of Guinea for Africa.</d-footnote>

Region neurons vary greatly in scale, from neurons corresponding to entire hemispheres — for example, a  <a href="#region-neuron-diagram" onClick={()=>{window.setRegionalState("geography", 1, 0)}}>Northern Hemisphere neuron</a> which responds to bears, moose, coniferous forest, and the entire Northern third of a world map — down to sub-regions of countries, such as the US West Coast. Which regions the model dedicates neurons to seems stochastic and varies across models we examined.<d-footnote> Some region neurons seem to form more consistently than others. Which neurons form doesn't seem to be fully explained by prevalence in the dataset: for example, <a href="#region-neuron-diagram" onClick={()=>{window.setRegionalState("geography", 6, null)}}>every model has an Australia neuron</a>, but not all models seem to have a UK neuron. Why is that? One intuition is that there’s more variance in neurons when there’s a natural supercategory they can be grouped into. For example, when an individual UK neuron doesn’t exist, it seems to be folded into a Europe neuron. In Africa, we sometimes see multiple different Africa neurons (in particular a South/West Africa neuron and an East Africa neuron), while other times there seems to be a single unified Africa neuron. In contrast, Australia is perhaps less subdividable, since it’s both a continent and country.</d-footnote>


 

import RegionalDiagram from './diagrams/RegionalNeurons.svelte'

<Svelte component={RegionalDiagram} container={<figure className="fullscreen-diagram" id="region-neuron-diagram" />} />


In addition to these region neurons, we find that many other neurons seem to be “<a href="#region-neuron-diagram" onClick={()=>{window.setRegionalState("geography", 2, null)}}>secondarily regional</a>.”<d-footnote>Some caution is needed in interpreting these neurons as truly regional, rather than spuriously weakly firing for part of a world map. Important validations are that they fire for the same region on multiple different maps, and if they respond to words for countries or cities in that region.</d-footnote> These neurons don’t have a region as the primary focus, but have some kind of geographic information baked in, firing weakly for regions on a world map related to them. For example, an <a href="#region-neuron-diagram" onClick={()=>{window.setRegionalState("geography", 2, 1)}}>entrepreneurship neuron</a> that fires for California, a <a href="#region-neuron-diagram" onClick={()=>{window.setRegionalState("geography", 2, 4)}}>cold neuron</a> that fires for the Arctic, and a big cat neuron that fires for Africa.<d-footnote>Most models have a great cat neuron, and it generally only fires for Africa. This misses non-lion great cats in other parts of the world, but mirrors a plausible and perhaps common human error.</d-footnote><d-footnote>We also find an <a href="#region-neuron-diagram" onClick={()=>{window.setRegionalState("geography", 2, 0)}}>angel neuron</a> which responds to “Los Angeles” and California on a map.</d-footnote> Other neurons link concepts to regions of the world in ways that seem Americentric or even racist: an <a href="#region-neuron-diagram" onClick={()=>{window.setRegionalState("geography", 2, 2)}}>immigration neuron</a> that responds to Latin America, and a <a href="#region-neuron-diagram" onClick={()=>{window.setRegionalState("geography", 2, 5)}}>terrorism neuron</a> that responds to the Middle East.<d-footnote>We also find that the linear combination of neurons that respond to Russia on a map strongly responds to Pepe the frog, a symbol of white nationalism in the United States allegedly promoted by Russia. Our impression is that Russians probably wouldn’t particularly see this as a symbol of Russia, suggesting it is more “Russia as understood by the US.”</d-footnote>

#### Case Study: Central (?) Africa Neuron

Despite these examples of neurons learning Americentric caricatures, there are some rays of light where the model seems more nuanced than one might fear. For example, rather than blurring all of Africa into a monolithic entity, the RN50-x4 model develops neurons for three regions within Africa. 

import MarginNeuronsAfrica from './diagrams/MarginNeuronsAfrica.svelte'

<Svelte component={MarginNeuronsAfrica} container={<div className="margin-diagram" />} />

In fact, in early explorations it quickly became clear these neurons knew more about Africa than the authors. For example, one of the first feature visualizations of the South African regional neuron drew the text “Imbewu”, which we learned was a South African TV drama. [Learning new things from neural networks is one of the dreams of interpretability, so we were excited to look into this more??]

We chose the East Africa neuron for more careful investigation, again using a conditional probability plot. It fires most strongly for flags, country names, and other strong national associations.<d-footnote>This also includes images of website TLDs, cell service providers, television networks, and maps.</d-footnote> Surprisingly, the medium strength activations -- the much more common case<d-footnote>exponential</d-footnote>-- have a significantly different distribution and seems to be mostly about ethnicity. Perhaps this is because ethnicity is implicit in all images of people, providing weak evidence for a region, while features like flags are far less frequent, but provide strong evidence when they do occur. This is the first neuron we've studied closely with a distinct regime change between medium and strong activations.

import RegionalConditional from './pages/regions/regionalConditional'

<RegionalConditional neuron={1317} />

We also looked at the activations of the other two Africa neurons. We suspect they have interesting differences beyond their detection of different country names and flags -- why else would the model dedicate three neurons -- but we lacked the cultural knowledge to appreciate their subtleties.

<h3 id="feature-properties">
Feature properties
</h3>

<Todo to="Chris" value={6}>Can we tighten this a bunch with even more aggressive footnotes?</Todo>

So far, we’ve looked at particular neurons to give a sense of the kind of features that exist in CLIP models. It's worth noting several properties that either warrant emphasis or might be missed in the discussion of individual features:
    
<p><b>Multimodality / Abstraction:</b> As we’ve seen in the previous sections, most CLIP neurons are multimodal and abstract, responding to the same concept across forms such as photos, drawings, maps, images of text, and more.</p>
    
import ImageWordEmbeddingFootnote from './diagrams/ImageWordEmbeddingFootnote.svelte'

<p><b>Image-Based Word Embedding:</b> Despite being a vision model, one can produce “word embeddings” with the visual CLIP model by rastering words into images and then feeding these images into the model. Like normal word embeddings, the nearest neighbors of words tend to be semantically related.{/*<Svelte component={ImageWordEmbeddingFootnote}  container={<d-footnote />} />*/}  Word arithmetic <d-cite bibtex-key="mikolov2013linguistic" /> such as <br /><span style={{display: " inline-block", margin: 12}}><i>V(Img(</i>“King”<i>)) <span style={{margin: 4}}>-</span> V(Img(</i>“Man”<i>)) <span style={{margin: 4}}>+ </span>V(Img(</i>“Woman”<i>)) <span style={{margin:4}}>=</span> V(Img(</i>“Queen”<i>))</i></span><br /> work in some cases if we mask non-semantic lexicographic neurons (eg. “-ing” detectors). It seems likely that mixed arithmetic of words and images should be possible.</p>
    
<p><b>Limited Multilingual Behavior:</b> Although CLIP’s training data was filtered to be English, many features exhibit limited multilingual responsiveness. For example, a “positivity” neuron (4x:36) responds to images of English “Thank You”, French “Merci”, German “Danke”, and Spanish “Gracias,” and also to English “Congratulations”, German “Gratulieren”, Spanish “Felicidades”, and Indonesian “Selamat”. As the example of Indonesian demonstrates, the model can recognize some words from non Romance/Germanic languages. However, we were unable to find any examples of the model mapping words in non-latin script to semantic meanings. It can recognize many scripts (Arabic, Chinese, Japanese, etc) and will activate the corresponding regional neurons, but doesn’t seem to be able to map words in those scripts to their meanings.<d-footnote>One interesting question is why the model developed reading abilities in latin alphabet languages, but not others. Was it because more data of that type slipped into the training data, or (the more exciting possibility) because it’s easier to learn a language from limited data if you already know the alphabet?</d-footnote></p>
      
<p><b>Bias:</b> Certain kinds of bias seem to be embedded into these representations, similar to classic biases in word embeddings (eg. <d-cite bibtex-key="bolukbasi2016man" />). The most striking examples are likely racial and religious bias. For example, there seems to be a “terrorism/Islam” neuron (4x:1596) which responds to images of words such as “Terrorism”, “Attack”, “Horror”, “Afraid”, and also “Islam”, “Allah”, “Muslim”. This isn’t just an illusion from looking at a single neuron: the image-based word embedding for “Terrorism” has a cosine similarity of 0.98 with “Muslims”. Similarily, an “illegal immigration neuron” (4x:2213) selects for Latin America countries.</p>

(We’ll see further examples of bias in the next section, when we how these features are used in aligning with captions.)
    
<p><b>Polysemanticity and Conjoined Neurons:</b>  Although we’ve focused on neurons which seem to have a single clearly defined concept they respond to, many CLIP neurons are “polysemantic” <d-cite bibtex-key="olah2017feature,olah2020zoom" />, responding to multiple unrelated features. Unusually, polysemantic neurons in CLIP often have suspicious links between the different concepts they respond to. For example, we observe as <b>Phil</b>adelphia/<b>Phil</b>ipines/<b>Phil</b>ip neuron, a Christm<b>as</b>/<b>As</b>s neuron, and an Ac<b>tor</b>/Velocirap<b>tor</b> neuron. The concepts in these neurons seem “conjoined”, overlapping in a superficial way in one facet, and then generalizing out in multiple directions. We haven’t ruled out the possibility that these are just coincidences, given the large number of facets that could overlap for each concept. But if conjoined features genuinely exist, they hint at new potential explanations of polysemanticity.<d-footnote>In the past, when we've observed seemingly polysemantic neurons, we've considered two possibilities: either it is responding to some shared feature of the stimuli, in which case it isn’t really polysemantic, or it is genuinely responding to two unrelated cases. Usually we distinguish these cases with feature visualization. For example, InceptionV1 4e:55 responds to cars and cat heads. One could imagine it being the case that it’s responding to some shared feature — perhaps cat eyes and car lights look similar. But feature visualization establishes a facet selecting for a globally coherent cat head, whiskers and all, as well as the metal chrome and corners of a car. We concluded that it was genuinely <i>OR(cat, car)</i>.<br /><br />
Conjoined features can be seen as a kind of mid-point between detecting a shared low-level feature and detecting independent cases. Detecting Santa Claus and “turn” are clearly true independent cases, but there was a different facet where they share a low-level feature. <br /><br />
Why would models have conjoined features? Perhaps they’re a vestigial phenomenon from early in training when the model couldn’t distinguish between the two concepts in that facet. Or perhaps there’s a case where they’re still hard to distinguish, such as large font sizes. Or maybe it just makes concept packing more efficient, as in the superposition hypothesis.</d-footnote></p>



<br /><hr /><br />

<h2 id="using-abstractions">
Using Abstractions
</h2>

We typically care about features because they’re useful, and CLIP’s features are more useful than most. Simple linear probes on top of them can perform a wide variety of tasks, including ImageNet classification. How do they do this?

In this section, we explore how CLIP features are used for two downstream tasks: ImageNet classification and emotion captioning. Answering these questions will require us to look at how neurons work in concert to represent a broader space of concepts.


--
We typically care about features because they’re useful, and CLIP’s features are more useful than most. Simple linear probes on top of them can perform a wide variety of tasks, including ImageNet classification. Somehow, a simple dot product with the network’s representation can be used to perform rich queries across countless domains.

How do they do this?

..

--
We typically care about features because they’re useful, and CLIP’s features are more useful than most. Somehow, a simple dot product with the network’s representation can be used to perform rich queries, enabling a wide range of tasks.



---

We typically care about features because they’re useful, and CLIP’s features are more useful than most. These features, when ensembled, allow direct retrieval on a variety of queries via the dot product alone. 

Untangling the image into its semantics [7] enables the model to perform a wide variety of downstream tasks including imagenet classification, facial expression detection, geolocalization and more []. How do they do this? Answering these questions will require us to look at how neurons work in concert to represent a broader space of concepts.

To begin, we’ll make this question concrete by taking a deep dive into one particular task: the Imagenet challenge.

--

It has been hypothesized that the formation of intermediate representations, both in the brain and in neural networks, facilitate "subspace untangling" [7] — a transformation of an input into a vector that allows rich queries on the relevant task through dot products. This is, indeed, explicitly the goal of CLIP, where linear probes achieve impressive accuracies in imagenet classification [Section []], facial expression detection [], geolocalization, and more.

Somehow, linear combinations of neurons can be used to perform a wide variety of downstream tasks. How do they do this? Answering these questions will require us to look at how neurons work in concert to represent a broader space of concepts.

To begin, we’ll make this question concrete by taking a deep dive into one particular task: the Imagenet challenge.

[?? How do we rewrite this introduction]
It has been hypothesized that the formation of intermediate representations, both in the brain and in neural networks, facilitate "subspace untangling" [7] — a transformation of an input into a vector that allows rich queries on the relevant task through dot products.

This is, indeed, explicitly the goal of CLIP, where linear probes achieve impressive accuracies in imagenet classification [Section []], facial expression detection [], geolocalization, and more. We make a stab at making this concrete by taking a deep dive into one particular task: the Imagenet challenge.

<h3 id="imagenet-challenge">
The Imagenet Challenge
</h3>

To study how CLIP classifies Imagenet, it helps to look at the simplest case. We use a sparse linear model for this purpose, following the methodology of Radford [] et al. With each class using only 3 neurons on average, it is easy to look at all of the weights. This model, by any modern standard, fares poorly, achieving an accuracy of 35% [Measure] -- but the surprising thing is that such a miserly model can do anything at all. How is each weight carrying so much weight?

ImageNet [] organizes images into categories borrowed from another project called WordNet.
Neural networks typically classify images treating ImageNet classes as structureless labels. But WordNet actually gives them a rich structure of higher level nodes. For example, a Labrador Retriever is a Canine which is a Mammal which is an Animal. 

We find that the weights and neurons of CLIP reflect some of this structure.

import HyperSet from './diagrams/HyperSet.svelte'

<Svelte component={HyperSet} />

[diagram]

At the highest levels we find a single neuron that represents the split between the living - animal, and the nonliving, that fires for nearly all the animals in the 1000 classes chosen.
The animal kingdom itself is split into the domesticated pets and wildlife. 

More conventionally, the animal kingdom is also split into more conventional categories, such as insects, birds and reptiles.

We see other classes too that do not correspond neatly to such classes organized by experts, but nevertheless make sense.

We see, for example, three neurons that respond to creatures found in different aspects of the ocean/water.

The “piggy bank” class in imagenet, for example, can still be obtained by combining neurons that respond to abstract concepts.

--

We arrive at a surprising discovery — it seems as though the neurons appear to arrange themselves into a taxonomy of classes that appear to mimic, very approximately, the imagenet hierarchy. While there have been attempts to explicitly integrate this information [8], CLIP was not given this information as a training signal. The fact that these neurons naturally form a hierarchy -- form a hierarchy without even being trained on ImageNet -- suggests that such hierarchy may be a universal feature of learning systems.<d-footnote>We’ve seen hints of similar structure in region neurons, with a whole world neuron, a northern hemisphere neuron, a USA neuron, and then a West Coast neuron.</d-footnote>



<h3 id="understanding-language">
Understanding Language
</h3>

The most exciting aspect of CLIP is its ability to do zero-shot classification: it can be “programmed” with natural language to classify images into new categories, without fitting a model. Where linear probes had fixed weights for a limited set of classes, now we have dynamic weight vectors that can be generated automatically from text.

Recall that CLIP has two sides, a vision model (which we’ve discussed up to this point) and a language model. The two models meet at the end, going through some processing and then performing a dot product to create a logit. If we ignore spatial structure[footnote], the logit has the following form:

logit = x_img W x_text  /  ||x_img||||x_text||

We focus on the bilinear interaction term, which governs local interactions in most directions. Although this approximation is somewhat extreme, we believe the bilinear term reflects the morally correct structure to focus on: we see exactly this in many other contrastive models [], and also in transformers [].[cite bilinear ml paper somewhere] [We’ll test that this approximation makes correct predictions in the next section.]

The bilinear term has a number of interesting interpretations. If we fix x_text, Wx_text gives a dynamic weight vector for classifying images. On the other hand, if we fix x_img, x_imgW gives weights for how much text features correspond to a given image.

We’ll mostly be focusing on using text to create zero-shot weights for images. But it’s worth noting one tool that the other direction gives us. If we fix a neuron on the vision side, we can search for the text that maximizes the logit. We can see this as the text maximally corresponding to that neuron.

Examples:
Emotion neurons


<h3 id="emotional-intelligence">
Emotional intelligence
</h3>

<Todo to="Nick" value={7}>Circuit editing or other experiment to validate that increasing bias neuron increases relevant word. Or, end to end by running an image relevant to the bias neuron (lgbt image to see if accepted goes up). Pay particular to bias examples and how confident my text sounds.</Todo>
<Todo to="Nick" value={7}>Figure out exactly what nmf is doing and make sure they do what I think and if they don't, explain that. If I'm doing the top k components, clarify in footnote</Todo>

As we see above, English has far more words for emotions than the image stream has emotion neurons. And yet, the vision stream recognizes these more obscure emotions. How can it do that? 

We can see what different emotion words correspond to on the image stream by taking attribution [ref to previous section] to "I feel X" on the language stream. This gives us a vector of image neurons for each emotion word. Looking at a list of common emotion words<d-footnote>from a feeling wheel, we'll see later</d-footnote>, we see that the largest elements in their vectors are usually emotion neurons, composed in reasonable ways to span this broader space of emotions. This mirrors a line of thinking in psychology where combinations of basic emotions form the “complex emotions” we experience.<d-footnote>theory of constructed emotion</d-footnote>

For example, the jealousy emotion is success + grumpy. Bored is relaxed + grumpy. Intimate is soft smile + heart - sick. Interested is question mark + heart and inquisitive is question mark + shocked. Surprise is celebration + shock.




import EmotionsSemantic from './pages/emotions/semantic'

<EmotionsSemantic emotionNames={['jealous', 'bored', 'intimate', 'surprised']} />

Sometimes physical objects contribute to representing emotions.
We also see that not all emotions are clearly separate from worldly objects. For example, part of "powerful" is a lightning neuron, part of "creative" is a painting neuron, part of "embarrassed" is a neuron corresponding to the years 2000-2012<d-footnote>explain the neuron is a time period and the language side thinks of it as embarrassing</d-footnote>, and part of “let down" is a neuron for destruction.


<EmotionsSemantic emotionNames={['powerful', 'creative', 'embarrassed', 'let down']} />

We also see concerning use of sensitive topics in these emotion vectors, suggesting that problematic spurious correlations are used to caption expressions of emotion. For instance, "accepted" detects LGBT. "Confident" detects overweight. "Pressured" detects Asian culture.
(disrespected)



<EmotionsSemantic emotionNames={['accepted', 'confident', 'pressured']} />

We can also search for examples where particular neurons are used, to explore their role in complex emotions. We see the mental illness neuron contributes to emotions like “stressed,” “anxious,” and “mad.”



<EmotionsSemantic emotionNames={['stressed', 'anxious', 'mad']} />


So far, we’ve only looked at a subset of these emotion words. We can also see a birds-eye view of this broader landscape of emotions by visualizing every attribution vector together.



import Atlas from './pages/emotions/atlas'

<Atlas />

<Todo to="nick" value={5}>Clean up footnote text</Todo>


This atlas has a few connections to classical emotion research. When we use just 2 factors, we roughly reconstruct the canonical mood-axes used in much of psychology: valence and arousal [include mood result]. If we increase to 7 factors, we nearly reconstruct a well known categorization of these emotions into happy, surprised, sad, bad, disgusted, fearful, and angry, except with “disgusted” switched for a new category related to affection that includes “valued,” “loving,” “lonely,” and “insignificant.”

<br /><hr /><br />

<h2 id="typographic-attacks">
Typographic Attacks
</h2>

As we’ve seen, CLIP is full of multimodal neurons which respond to both images and text for a given concept. Given how strongly these neurons react to text, we wonder: can we perform a kind of non-programmatic adversarial attack – a *typographic attack* – using just a marker and an English word?

To test this hypothesis, we took several common items and deliberately mislabeled them. We then observed how this affects ImageNet classifications (discussed <a href="imagenet-challenge">earlier</a>). These attacks often change the image’s classification.


import InTheWild2 from './diagrams/InTheWild2.svelte'

<Svelte component={InTheWild2} />

While many classic adversarial attacks focus on making imperceptible changes to images [], typographic attacks are more similar to work such as *adversarial patches* [1] and *physical adversarial examples* [2]. Adversarial patches are stickers that can be placed on real-life objects in order to cause neural nets to misclassify those objects as something else – for example, as toasters. Physical adversarial examples are complete 3D objects that are reliably misclassified from all perspectives, such as a 3D-printed turtle that is reliably misclassified as a rifle. Typographic attacks are both weaker and stronger than these. On the one hand, they only work for models with multimodal neurons. On the other hand, once you understand this property of the models, the attacks can be executed *non-programmatically* and as *black-box attacks*, available to any adversary – including six year olds.



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

[Assuming we have a zero-shot col in above table.] It’s worth noting that the zero-shot classifier is more vulnerable to these attacks than the linear probes classifier, but the attacks are somewhat effective on both.


<h3 id="the-stroop-effect">
The Stroop Effect (? or something [TODO])
</h3>

The model’s response to these adversarial images is reminiscent of the Stroop effect []. Just as our models make errors when adversarial text is added to images, humans are slower and more error prone when images have incongruent labels. 

A classic demonstration of the Stroop effect is that recognizing a 'mislabeled' color (eg. <span style={{color: "blue", opacity: "0.8"}}>green</span>, <span style={{color: "red", opacity: "0.8"}}>blue</span>, <span style={{color: "green", opacity: "0.8"}}>red</span>) is harder than normal. To compare CLIP’s behavior to these human experiments, we had CLIP classify these stimuli by color, using its zero-shot classification.  Unlike humans, CLIP can’t slow down to compensate for the harder task. It takes the same amount of time for the incongruent stimuli and has a very high error rate:

import StroopExperiment from './diagrams/StroopExperiment.svelte'

<Svelte component={StroopExperiment} />


<br /><hr /><br />

<h2 id="appendix">
Appendix 1: Methodological Details
</h2>

<h3 id="faceted-feature-visualization">
Faceted Feature Visualization
</h3>

<p>
    A neuron is said to have multiple facets if there are multiple distinct
    cases that they fire for<d-cite bibtex-key="nguyen2016multifaceted"></d-cite> —
    that is, if a feature can be described as <i>OR(case_1, case_2, …)</i>.
    For example, a pose-invariant dog-head detector that detects dog heads
    tilted to the left, right, or facing straight on<d-cite
    bibtex-key="olah2020zoom"
    ></d-cite
    >, or a boundary detector which looks for a difference in texture from one
    side to the other but doesn’t care which is which<d-cite
    bibtex-key="olah2020overview"
    ></d-cite
    >, or a “grocery store” output neuron that detects both exterior and
    interior views of a grocery store<d-cite
    bibtex-key="nguyen2016multifaceted"
    ></d-cite
    >. (You may also be familiar with the idea of a “polysemantic”
    neuron<d-cite bibtex-key="olah2017feature,olah2020zoom"></d-cite>. Polysemantic
    neurons are a special type of multifaceted neuron in which the facets are
    unrelated.)
</p>

<p>
    <a href="https://distill.pub/2017/feature-visualization/"
    >Feature visualization</a
    ><d-cite bibtex-key="erhan2009visualizing,olah2017feature,simonyan2013deep,nguyen2015deep,mordvintsev2015inceptionism,nguyen2016plug"
    ></d-cite>
    is a technique where the input to a neural network is optimized to create
    a stimuli demonstrating some behavior, typically maximizing the activation
    of a neuron. There are two challenges with using feature visualization on
    multi-faceted neurons. Firstly, the optimization process may give us an
    out-of-distribution input that tries to activate multiple facets at once;
    this can sometimes help reveal the existence of multiple facets, but can
    also lead to difficult-to-parse or nonsensical stimuli. (We suspect this
    is true when the multiple facets aren’t mutually inhibiting; for contrast,
    see mutual inhibition in the InceptionV1 pose invariant dog head
    circuit<d-cite bibtex-key="olah2020zoom"></d-cite>.) Secondly, even if the
    optimization process successfully reveals once facet, it may not reveal
    others.
</p>

<p>
    These challenges are of increased significance in the multimodal models we
    study in this paper, because the highly-abstract neurons at the end of the
    network seem to activate for an enormous variety of cases!
</p>

<p>
    We are aware of two past approaches to improving feature visualization for
    multi-faceted neurons. The first approach is to find highly diverse images
    which activate a given neuron, and use them as seeds for the feature
    visualization optimization process<d-cite
    bibtex-key="nguyen2016multifaceted"
    ></d-cite
    >. This approach requires one to have access to the dataset, may taint the
    value of feature visualization in establishing evidence of causality, and
    the stimuli may still be pulled into a different basin of attraction. An
    alternative approach is to perform multiple feature visualizations at once
    optimizing for an additional “diversity term” which encourages the
    different feature visualizations to activate different lower-level
    neurons<d-cite bibtex-key="olah2017feature"></d-cite>. However, this can incent
    the visualizations to include unrelated content to activate lower level
    neurons and increase the diversity term.
</p>

<p>
    We take a new variant of the second approach, adding a diversity term to
    the optimization process. However, we base our diversity term not on the
    <i>activation</i> of lower level neurons, but on the <i>attribution</i> of
    the high-level neuron to lower level neurons. The intent here is to only
    incent variation in low-level neurons if it affects the neuron we’re
    visualizing. To formalize this, we use a simple
    <i>attribution = gradient ⊙ activation</i> attribution method, which can
    be seen as the linear approximation of the effect of the lower level
    neurons on the high level one. Since this is a resnet where there is a
    linear pathway between them, this seems especially principled. We then
    maximize the orthogonal components of these attribution vectors . A
    reference implementation can be found in attached colab notebooks.
</p>

<p>
    Sometimes it’s desirable to visualize analogous types of facets across
    many neurons in a controlled manner. In the multimodal models, many
    neurons have a “text” facet — in fact, many neurons have lots of
    different text facets, responding to many words! — and we’d like to see
    them for all neurons. To do this, we first collect images of each type
    (text, faces, etc) and fit a logistic regression. We then add a targeted
    diversity term <i>regression weights ⊙ attribution</i> to encourage a
    facet that activates our high-level neuron through low-level neurons
    associated with a given facet type. Again, a reference implementation can
    be found in attached colab notebooks.
</p>

<Todos />

