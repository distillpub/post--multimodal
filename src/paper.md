import Svelte from './svelte'

In 2005, a letter published in Nature described human neurons responding to specific people, as well as landmarks<d-cite key="quiroga2005invariant" />. The exciting thing wasn’t just that they selected for particular people, such as Jennifer Aniston or Halle Berry, but that they did so regardless of whether they were shown images, drawings, or even images of the person’s name. The neurons were multimodal. As the lead author would put it: "You are looking at the far end of the transformation from metric, visual shapes to conceptual… information." <d-footnote>Quiroga's full quote, from <a href="https://www.newscientist.com/article/dn7567-why-your-brain-has-a-jennifer-aniston-cell/">New Scientist</a>reads: "I think that’s the excitement to these results. You are looking at the far end of the transformation from metric, visual shapes to conceptual memory-related information. It is that transformation that underlies our ability to understand the world. It’s not enough to see something familiar and match it. It’s the fact that you plug visual information into the rich tapestry of memory that brings it to life." We elided the portion discussing memory since it was less relevant.</d-footnote> 

We report the existence of similar multimodal neurons in artificial neural networks. This includes neurons selecting for prominent public figures or fictional characters, such as Donald Trump, Lady Gaga, and Spiderman. Like the biological multimodal neurons, these neurons respond to the same subject in photographs, drawings, and images of text <d-footnote>Some of the figures we found neurons for are divisive. It should go without saying that having a dedicated neuron simply reflects the prominence of these figures in the training data, collected in [2019?]. Being divisive increases this prominence, because divisive figures are more likely to be extensively discussed on the Internet. In the case of the Donald Trump neuron, it seems likely there would have also been a Hillary Clinton neuron if data had been collected in 2016 instead. (There are other neurons which respond to Hillary Clinton in addition to other topics.) </d-footnote><d-footnote>It’s important to note that the vast majority of people these models recognize don’t have a specific neuron, but instead are represented by a combination of neurons. Often, the contributing neurons are conceptually related. For example, the Trump neuron fires (albeit more weakly) for Mike Pence, contributing to representing him.</d-footnote><d-footnote>Some of the neurons we found seem strikingly similar to those described in Quiroga et al []. The Donald Trump neuron we found might be seen as similar to Quiroga et al’s Bill Clinton neuron. A Star Wars neuron we find seems analogous to a biological Star Wars neuron described Quiroga et al’s follow up paper []. And although we don’t find an exact Jennifer Aniston neuron, we do find a neuron for the TV show “Friends” which fires for her.</d-footnote>

import HalleBerry from './diagrams/halleBerry/index.svelte'

<Svelte component={HalleBerry} container={<div />} />


But these people-detecting neurons only scratch the surface of highly abstract neurons we found. We also find features coding for emotions, regions of the world, fictional settings, and much more. Moreover, these interpretable neurons are the norm — in our several month exploration, nearly every neuron we’ve looked at can be broadly summarized in just a few words.These neurons generalize in highly abstract ways beyond photo/drawing/text multimodality. For example, the regional neurons respond to the relevant regions on a world map, dominant ethnicities, local script, the names of countries and cities, and much more.

These neurons generalize in highly abstract ways beyond Quiroga et al’s photo/drawing/text trifecta. For example, the regional neurons respond to the relevant regions on a world map, distinct local wildlife, unusual products, apparel, architecture, politicians, dominant ethnicities, local script, landmarks, the names of countries and cities, and much more.

We find these neurons in multimodal models [final name] from Radford et al [], although it’s possible similar features exist in earlier multimodal models. These models use a contrastive loss to learn to align pairs of text and images from the internet.<d-footnote>The authors also kindly shared an alternative version from earlier experiments, where the training objective was an autoregressive language modelling cost, instead of a contrastive objective. The features seem pretty similar.</d-footnote>

In this paper we'll focus on the visual side of these neural networks, a residual network [] with a size that depends on the specific model, the details of which can be found in their paper. While these models are themselves multimodal, when we refer to multimodal neurons we are only talking about the image side of the model, just as the biological multimodal neurons in Quiroga et al are entirely within the realm of their visual behavior.

In some ways, it seems natural for multimodal models like this to form these kinds of abstract visual features. We expect word embeddings and language models to form abstract, topical features []. Arguably, what we’re seeing is simply the vision model learning to align with the native topical features of language models.<d-footnote>Many researchers are interested in “grounding” language models by training them on tasks involving another domain, in the hope of them learning a more real world understanding of language. The abstract features we find in vision models can be seen as a kind of “inverse grounding” -- vision taking on more abstract features by connection to language.</d-footnote> <!--Should add some kind of discussion to section 1  if we want to include the following:<d-footnote>This includes some of the classic kinds of bias we see in word embeddings: for example, a feature that responds to rastered images of the following words: housewives, kathy, britney, jennifer, elizabeth, amanda, madonna, daughters, pregnancy, pharmaceutical, pharmaceuticals, amy, tiffany, barbara, daughter, healthcare.</d-footnote>-->

We'll begin by taking a dive into several interesting neuron families from the model, including neurons for specific people, neurons that correspond to emotion, and highly multimodal neurons for different regions of the world. From there, we’ll explore how those features are used to accomplish the model’s goal of aligning images and text. This leads us to discover that these models are vulnerable to a kind of “typographic attack” where adding the right text to images can cause them to be systematically misclassified. 

import AttackDemo from './diagrams/AttackDemo.svelte'

<Svelte component={AttackDemo} container={<div />} />

Finally, we’ll explore some of the intermediary features and circuits that build up abstract features. These explorations will require a few novel methods which we discuss in detail in an appendix 1.

# A Guided Tour of Neuron Families

What features exist in CLIP models? In this section, we’ll examine the most abstract visual neurons in CLIP, found in the final convolutional layer. This layer contains an incredible diversity of features, but to allow detailed examination we’ll focus on three major “neuron families” []: people neurons, emotion neurons, and regional neurons. After these deep dives, we’ll give a high-level overview of other types of neurons we find.

It’s important to understand that these neurons aren’t object detectors: they’re much more abstract and associational. They often have some core object or concept which their activation peaks for, but they will fire for associated ideas. They also tend to be maximally inhibited by stimuli which could be seen, in a very abstract way, as their opposite.


## Person Neurons

To caption images on the Internet you need cultural knowledge. If you try captioning the popular images of a foreign place, you’ll quickly find your object and scene recognition skills aren't enough. You can't caption photos at a stadium without recognizing the sport, and you may even need to know specific players to get the caption right. Pictures of politicians and celebrities speaking are even more difficult to caption if you don’t know who’s talking and what they talk about, and these are some of the most popular pictures on the Internet. With this in mind, perhaps it’s unsurprising that the model invests significant capacity in understanding the most prominent people in popular culture.

A Hitler neuron learns to detect his face and body, symbols of the Nazi party, relevant historical documents, and other loosely related concepts like German food. Feature visualization shows swastikas and Hitler seemingly doing a Nazi salute. A Jesus Christ neuron detects Christian symbols like crosses and crowns of thorns, paintings of Jesus, his written name, and feature visualization shows him as a baby in the arms of the Virgin Mary. A Spiderman neuron recognizes the masked hero and knows his secret identity, Peter Parker. It also responds to images, text, and drawings of heroes and villians from Spiderman movies and comics over the last half-century.

Which people the model develops dedicated neurons for is stochastic, but seems correlated with the person's prevalence across the dataset. The one person we’ve found in every CLIP model is Donald Trump. It recognizes him across a wide variety of settings, including effigies and caricatutes in many artistic mediums, as well as people he’s worked closely with like Mike Pence and Steve Bannon. It also responds to his political symbols and messaging (eg. “The Wall” and “Make America Great Again” hats). On the other hand, it most negatively activates to musicians like Nicky Minaj and Eminem, video games like Fortnite, black rights activists like Martin Luther King Jr., and LGBT symbols like rainbow flags.

import PeopleMargin from './pages/people/margin'

<PeopleMargin />

To better understand this neuron we estimate the conditional probability of several categories of images at different activation levels using human labeling, of X images.

import PeopleHandLabeled from './pages/people/handLabeledTrump'

<PeopleHandLabeled />

[move to stddev instead of activations, show two dataset examples under each legend labels, show dataset examples for each range of activation]

(fig caption: To get a qualitative sense for what kinds of images cause the neuron to fire different amounts, we collected X images across different levels of firing, labeled them by hand into several categories, giving us an estimate of the conditional probability of each category at different levels of activation. While we labeled the images we couldn’t see how much they made the neuron fire.)

While labeling images for the previous experiment it became clear the neuron activates different amounts for specific people. We can study this more by searching the Internet for pictures of specific people and measuring how the images of each person makes the neuron fire.

import TrumpPeople from './pages/people/trumpPeople'

<TrumpPeople />

[notes: transpose so bars are going horizontal, designate zero-point, std of each category show on bar]

Presumably, people detecting neurons also exist in normal facial recognition models. What makes these neurons unique is that they respond to the person across modalities and associations, situating them in a cultural context. In particular, we're struck by how the neuron's response tracks an informal intuition with how associated people are. In this sense, person neurons can be thought of as a landscape of person-associations, with the person themself as simply the tallest peak.

## Emotion Neurons

Since a small change in someone's expression can radically change the meaning of a picture, emotional intelligence is essential to the task of captioning. We've found dozens of neurons that primarily respond to emotion, and many others that detect emotion as a part of a related but broader concept.



import EmotionsIntro from './pages/emotions/intro'

<EmotionsIntro />

[for nick: replace accepting an offer or fix, consider adding small indoor figure footnote, keep indoor]

These neurons are flexible, recognizing body language and facial expressions in humans and animals, drawings, text, and even landscapes and interior designs that evoke the emotion's vibe. The surprise neuron activates even when the majority of the face is obscured. It responds to slang like "OMG!" and "WTF", and text feature visualization produces similar words of shock and surprise.

import EmotionsSurprise from './pages/emotions/surprise'

<EmotionsSurprise />

Other neurons learn to detect emotions as part of a broader concept. A neuron that primarily detects pornographic content has a secondary function of detecting the emotion of arousal. A price tag neuron detects an expression of looking up in awe, and text feature visualization includes "looking up into the heavens". A neuron that primarily detects official letters of acceptance or notices of appointment also contains a facial expression of acceptance.


import EmotionsMinor from './pages/emotions/minor'

<EmotionsMinor />

[to nick: use chris' regional diagram, maybe wait for dataset examples api]

On the other extreme, some neurons respond simply to specific body and facial expressions, like the silly expression neuron. It activates most to the internet-born duckface expression and peace signs, and both words show up in its text feature visualization.



import EmotionsDuckface from './pages/emotions/minor/duckface'

<EmotionsDuckface />

We're excited at the promise of emotion neurons to benefit social studies that need algorithmic access to emotion detectors. These neurons could help people understand the emotional content of a long video, either by coloring the video's scrubber based on the emotions at each time, or by showing an Activation Atlas of the scenes of a movie based on emotion to see cinematography in a new way. These emotions could also be useful for studying how expressions change over time. With a dataset of selfies over the last decade with their location tagged, perhaps one could better understand birth and spread of expressions like the duckface as it propagates across cultures and geographies.

### Mental Illness Neuron

One neuron that doesn't represent a single emotion but rather a high level category of emotions is the mental illness neuron, which is separate from a different physical illness neuron. It responds to a variety of low valence emotions like anxiety, depression, and loneliness across modalities. It also responds to images and text of drugs, and words like "mental" and "psychology".

To better understand this neuron we again estimated the conditional probabilities of various categories by activation magnitude. The strongest positive activations are concepts related to mental illness. Conversely, the strongest negative activations correspond to activities like exercise, sports, and music events.


import EmotionsMentalHealth from './pages/emotions/mentalHealth'

<EmotionsMentalHealth />

In a later section, we'll see that an important role of the mental illness neuron is composition with other emotion neurons to differentiate between healthy and unhealthy versions of the emotion it’s combined with. For instance, anxiety is the union of shock and mental illness.

## Region Neurons

From local weather and food, to travel and immigration, to language and race: geography is an important implicit or explicit context in a great deal of online discourse. We find that CLIP models develop <i>regional neurons</i> responding to geographic regions. These neurons respond to a wide variety of modalities and facets: country and city names, distinctive architecture, prominent public figures, faces of the most common ethnicity, distinctive clothing, wildlife, and local script (if not roman alphabet). If shown a world map, even without labels, these neurons fire selectively for the relevant region on the map.<d-footnote>Map responses seem to be strongest around distinctive geographic landmarks, such as the Gulf Of Carpentaria and Cape York Peninsula for Australia, or the Gulf of Guinea for Africa.</d-footnote>

Regional neurons vary greatly in scale, from neurons corresponding to entire hemispheres -- for example, a Northern Hemisphere neuron which responds to bears, moose, coniferous forest, and the entire Northern third of a world map -- down to sub-regions of countries, such as the US West Coast. Which regions the model dedicates neurons to seems stochastic and varies across models we examined.<d-footnote>Some regional neurons seem to form more consistently than others. Which neurons form doesn't seem to be fully explained by prevalence in the dataset: for example, every model has an Australia neuron, but not all models seem to have a UK neuron. Why is that? One intuition is that there’s more variance in neurons when there’s a natural supercategory they can be grouped into. For example, when an individual UK neuron doesn’t exist, it seems to be folded into a Europe neuron. In Africa, we sometimes see multiple different Africa neurons (in particular a South/West Africa neuron and an East Africa neuron), while other times there seems to be a single unified Africa neuron. In contrast, Australia is perhaps less subdividable, since it’s both a continent and country.</d-footnote>

 

import RegionalDiagram from './diagrams/RegionalNeurons.svelte'

<Svelte component={RegionalDiagram} />

In addition to these regional neurons, we find that many other neurons seem to be “secondarily regional.”<d-footnote>Some caution is needed in interpreting these neurons as truly regional, rather than spuriously weakly firing for part of a world map. Important validations are that they fire for the same region on multiple different maps, and if they respond to words for countries or cities in that region.</d-footnote> These neurons don’t have a region as the primary focus, but have some kind of geographic information baked in, firing weakly for regions on a world map related to them. For example, an entrepreneurship neuron that fires for California, a cold neuron that fires for the Arctic, and a big cat neuron that fires for Africa.<d-footnote>Most models have a great cat neuron, and it generally only fires for Africa. This misses non-lion great cats in other parts of the world, but mirrors a plausible and perhaps common human error.</d-footnote><d-footnote>We also find an angel neuron which responds to “Los Angeles” and California on a map.</d-footnote> Other neurons link concepts to regions of the world in ways that seem Americentric or even racist: an immigration neuron that responds to Latin America, and a terrorism neuron that responds to the Middle East.<d-footnote>We also find that the linear combination of neurons that respond to Russia on a map strongly responds to Pepe the frog, a symbol of white nationalism in the United States allegedly promoted by Russia. Our impression is that Russians probably wouldn’t particularly see this as a symbol of Russia, suggesting it is more “Russia as understood by the US.”</d-footnote>


[for nick: do conditional probabilities for one of the neurons]

## Miscellaneous Neurons

**Person trait neurons.** These neurons detect gender presentation<d-footnote>By this, we mean that it both responds to people presenting as this gender, as well as concepts associated with that gender.</d-footnote> and age, as well as facial features like moustaches. (Ethnicity tends to be represented by regional neurons.)

[diagram]

**Image type neurons.** These neurons detect different ways an image might be drawn, rendered, or photographed.

[diagram]

Image types can be quite rich. To provide some more specific examples, RN101 distinguishes among these three different types of medical content. Although they share an underlying topic (medicine and physiology), nonetheless these three different image types each get their own dedicated neuron!

Image feature neurons. These neurons detect extraneous features that a photo might contain: photobombs and bunny ears, the heads of people seated in front of you at a lecture, Photoshopped modifications, and more.
Feature visualization shown along with logo, face, and text facets.
[[Fix the ‘Seated at lecture’ facet and cut the height down to 1 viz per neuron here]]
Counting neurons. These neurons detect duplicates of the same person or thing, and can distinguish them by their count. For example, the "trios" neuron might fire for a trio of friends taking a photo together, whereas the "pairs or fours" neuron might fire for pairs of shoes, pairs of cookies, and pairs of people.
[[Dataset examples are really compelling here]]
[[Section could be improved by removing the rows and columns and just taking the Greatest Hits]]
Holiday neurons. These neurons recognize the names, decorations, and traditional trappings around various holidays.
[[First do simple thing of adding dense rows –– possibly introduce some captions to call out some of the more interesting things here, e.g. the face facets]]
[[Maybe if more time, Figmaize]]
Fiction neurons. These neurons represent characters and concepts from within a particular fictional universe. [[Harry Potter, Avengers, 924 Pokemon/Nintendo]]
Typographic neurons. Surprisingly, despite being able to “read” words and map them to semantic features, the model keeps a handful of more typographic features in its high-level representations. Like a child spelling out a word they don’t know, we suspect these neurons help the model represent text it can’t fully read.
Brightness Gradient Neurons: Another surprising cluster of features are lighting gradient features, which detect a better lit object or image portion than its surroundings. Why does the model have such low-level features in its high-level representation? Perhaps they help inform which portions of the image are more likely to be the subjects of captions.
[[Need examples. Those in 4x may be polysemantic. But may be more dominant component of the polysemantic neuron.]]
[[Add a footnote about the role of attention here.]]

## Feature properties

So far, we’ve looked at particular neurons to give a sense of the kind of features that exist in CLIP models. It's worth noting several properties that either warrant emphasis or might be missed in the discussion of individual features:
    
<p><b>Multimodality / Abstraction:</b> As we’ve seen in the previous sections, most CLIP neurons are multimodal and abstract, responding to the same concept across forms such as photos, drawings, maps, images of text, and more.</p>
    
<p><b>Image-Based Word Embedding:</b> Despite being a vision model, one can produce “word embeddings” with the visual CLIP model by rastering words into images and then feeding these images into the model. Like normal word embeddings, the nearest neighbors of words tend to be semantically related.</p>

import ImageWordEmbeddingFootnote from './diagrams/ImageWordEmbeddingFootnote.svelte'

<Svelte
  component={ImageWordEmbeddingFootnote}
  container={<d-footnote />}
/>

Word arithmetic <d-cite key="mikolov2013linguistic" /> such as <br /><span style={{display: " inline-block", margin: 12}}><i>V(Img(</i>“King”<i>)) <span style={{margin: 4}}>-</span> V(Img(</i>“Man”<i>)) <span style={{margin: 4}}>+ </span>V(Img(</i>“Woman”<i>)) <span style={{margin:4}}>=</span> V(Img(</i>“Queen”<i>))</i></span><br /> work in some cases if we mask non-semantic lexicographic neurons (eg. “-ing” detectors).

It seems likely that mixed arithmetic of words and images should be possible.
    
<p><b>Limited Multilingual Behavior:</b> Although CLIP’s training data was filtered to be English, many features exhibit limited multilingual responsiveness. For example, a “positivity” neuron (4x:36) responds to images of English “Thank You”, French “Merci”, German “Danke”, and Spanish “Gracias,” and also to English “Congratulations”, German “Gratulieren”, Spanish “Felicidades”, and Indonesian “Selamat”. As the example of Indonesian demonstrates, the model can recognize some words from non Romance/Germanic languages. However, we were unable to find any examples of the model mapping words in non-latin script to semantic meanings. It can recognize many scripts (Arabic, Chinese, Japanese, etc) and will activate the corresponding regional neurons, but doesn’t seem to be able to map words in those scripts to their meanings.<d-footnote>One interesting question is why the model developed reading abilities in latin alphabet languages, but not others -- was it because more data of that type slipped into the training data, or (the more exciting possibility) because it’s easier to learn a language from limited data if you already know the alphabet?</d-footnote></p>
      
<p><b>Bias:</b> Certain kinds of bias seem to be embedded into these representations, similar to classic biases in word embeddings (eg. <d-cite key="bolukbasi2016man" />). The most striking examples are likely racial and religious bias. For example, there seems to be a “terrorism/Islam” neuron (4x:1596) which responds to images of words such as “Terrorism”, “Attack”, “Horror”, “Afraid”, and also “Islam”, “Allah”, “Muslim”. This isn’t just an illusion from looking at a single neuron: the image-based word embedding for “Terrorism” has a cosine similarity of 0.98 with “Muslims”. Similarily, an “illegal immigration neuron” (4x:2213) selects for Latin America countries.</p>

(We’ll see further examples of bias in the next section, when we how these features are used in aligning with captions.) 
    
<p><b>Polysemanticity and Conjoined Neurons:</b>  Although we’ve focused on neurons which seem to have a single clearly defined concept they respond to, many CLIP neurons are “polysemantic” <d-cite key="olah2017feature,olah2020zoom" />, responding to multiple unrelated features. Unusually, polysemantic neurons in CLIP often have suspicious links between the different concepts they respond to. For example, we observe as <b>Phil</b>adelphia/<b>Phil</b>ipines/<b>Phil</b>ip neuron, a Christm<b>as</b>/<b>As</b>s neuron, and an Ac<b>tor</b>/Velocerap<b>tor</b> neuron. The concepts in these neurons seem “conjoined”, overlapping in a superficial way in one facet, and then generalizing out in multiple directions. We haven’t ruled out the possibility that these are just coincidences, given the large number of facets that could overlap for each concept. But if conjoined features genuinely exist, they hint at new potential explanations of polysemanticity.<d-footnote>In the past, when we've observed seemingly polysemantic neurons, we've considered two possibilities: either it is responding to some shared feature of the stimuli, in which case it isn’t really polysemantic, or it is genuinely responding to two unrelated cases. Usually we distinguish these cases with feature visualization. For example, InceptionV1 4e:55 responds to cars and cat heads. One could imagine it being the case that it’s responding to some shared feature -- perhaps cat eyes and car lights look similar. But feature visualization establishes a facet selecting for a globally coherent cat head, whiskers and all, as well as the metal chrome and corners of a car. We concluded that it was genuinely <i>OR(cat, car)</i>.<br /><br />
Conjoined features can be seen as a kind of mid-point between detecting a shared low-level feature and detecting independent cases. Detecting Santa Claus and “turn” are clearly true independent cases, but there was a different facet where they share a low-level feature. <br /><br />
Why would models have conjoined features? Perhaps they’re a vestigial phenomenon from early in training when the model couldn’t distinguish between the two concepts in that facet. Or perhaps there’s a case where they’re still hard to distinguish, such as large font sizes. Or maybe it just makes concept packing more efficient, as in the superposition hypothesis.</d-footnote></p>

# Using Abstractions

We typically care about features because they’re useful, and CLIP’s features are more useful than most. Simple linear probes on top of them can perform a wide variety of tasks, including ImageNet classification. How do they do this?

In this section, we explore how CLIP features are used for two downstream tasks: ImagNet classification and emotion captioning. Answering these questions will require us to look at how neurons work in concert to represent a broader space of concepts. 

It has been hypothesized that the formation of intermediate representations, both in the brain and in neural networks, facilitate "subspace untangling" [7] -- a transformation of an input into a vector that allows rich queries on the relevant task through dot products. This is, indeed, explicitly the goal of CLIP, where linear probes achieve impressive accuracies in imagenet classification [Section []], facial expression detection [], geolocalization, and more.

Somehow, linear combinations of neurons can be used to perform a wide variety of downstream tasks. How do they do this? Answering these questions will require us to look at how neurons work in concert to represent a broader space of concepts. 

To begin, we’ll make this question concrete by taking a deep dive into one particular task: the Imagenet challenge.

[?? How do we rewrite this introduction]
It has been hypothesized that the formation of intermediate representations, both in the brain and in neural networks, facilitate "subspace untangling" [7] -- a transformation of an input into a vector that allows rich queries on the relevant task through dot products.

This is, indeed, explicitly the goal of CLIP, where linear probes achieve impressive accuracies in imagenet classification [Section []], facial expression detection [], geolocalization, and more. We make a stab at making this concrete by taking a deep dive into one particular task: the Imagenet challenge.

## The Imagenet Challenge

The IILSRV challenge [] uses a subset of the wordnet hierarchy and is an explicit attempt to systematize human knowledge. The synsets are organized as overlapping trees of general concepts, with the task of a classifier trained to classify the leaves.

Following the methodology of Radford [] et all, we train a sparse linear probe on the imagenet labels to understand which neurons are the most informative for the task. We do this with only 3, on average, nonzeros per class, forcing the network to use neurons very sparingly. This model, by most any modern standard, fares poorly, achieving an accuracy of 35% [Measure]. Our goal, however is to understand how a model as parsimonious as this can do anything at all. As we inspect the model's weights, a clearer picture emerges.

At the highest levels we find a single neuron that represents the split between the living - animal, and the nonliving, that fires for nearly all the animals in the 1000 classes chosen.
The animal kingdom itself is split into the domesticated pets and wildlife. More conventionally, the animal kingdom is also split into more conventional categories, such as insects, birds and reptiles.

We see other classes too that do not correspond neatly to such classes organized by experts, but nevertheless make sense. We see, for example, three neurons that respond to creatures found in different aspects of the ocean/water.

The “piggy bank” class in imagenet, for example, can still be obtained by combining neurons that respond to abstract concepts.

We arrive at a surprising discovery -- it seems as though the neurons appear to arrange themselves into a taxonomy of classes that appear to mimic, very approximately, the imagenet hierarchy.

The fact that these neurons form a hierarchy suggests that this form of organization may be a universal feature of learning systems. While there have been attempts to explicitly integrate this information [8], CLIP was not given this information as a training signal. 

, in CLIP this has not been given in any explicit form as a training signal. The fact that these neurons are scrutable suggests that organizations of high-level concepts of this kind may be a universal feature of learning systems.

## Understanding language

The primary consumer of these representations is the language head of the model. Indeed, augmented with the language head alone, the model is capable of being "programmed" to perform many feats of classification using nothing more than a natural language description of the task, zero-shot.

It seems plausible that, just as individual neurons may play key roles in linear probes, they may also encourage the firing of key words or even phrases. Formally, we ask, if we increase the strength of a neuron in a positive direction, what kinds of words are more likely? Or conversely, given a word (or a set of words), can we break down the meaning of that word in a crisp set of neurons?

[explain the variables]

The [linear attribution] To do this, we rely on the following approximation (consider moving to footnote):

\begin{aligned} \text{\textbf{cosine}}(F(x+\delta),y) & \approx\text{\textbf{cosine}}(F(x)+\nabla F(x)^{T}\delta,y)\\ & =\text{\textbf{cosine}}(F(x)+V\delta,y)\\ & \approx \delta^{T}Vy+\text{\textbf{cosine}}(F(x),y) \end{aligned}
cosine(F(x+δ),y)
​
≈cosine(F(x)+∇F(x)
T
δ,y)
=cosine(F(x)+Vδ,y)
≈δ
T
Vy+cosine(F(x),y)
​
Which states that to understand the perturbation due to an image, we can simply look its dot product with the value matrix 
V
V. Armed with this insight, we can ask questions of the language embeddings in a way that is independent of any image. When we maximize the dot product for 
x
x, we get the set of words that a neuron encourages.

If we maximize this, alternatively, over y 
y
y, we can ask what neurons compose to cause that to fire.

Using these techniques, we now seek to understand one particular family of neurons - the set of emotions.

## Emotional intelligence

Notes: validate aggressive bias claims with more explicit, redo attribution text in figcaption. Run two experiments: circuit editing to increase LGBT make sure "accepted" goes up. The complex emotion that goes highest to lgbt is accepted. Two: put an image of the word "LGBT" and "accepted" should go up. Nick: really make sure the factorizations do what you say they do
 
English has far more words for emotions than the image stream has emotion neurons. And yet, the vision stream recognizes these more obscure emotions. How can it do that? We can see what different emotion words correspond to on the image stream by taking attribution [ref to previous section] to "I feel X" on the language stream. This gives us a vector of image neurons for each emotion word. Looking at a list of common emotion words<d-footnote>from a feeling wheel, we'll see later</d-footnote>, we see that the largest elements in their vectors are usually emotion neurons, composed in reasonable ways to span this broader space of emotions. This mirrors a line of thinking in psychology where combinations of basic emotions form the “complex emotions” we experience.<d-footnote>theory of constructed emotion</d-footnote>

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

[cite all the things]

This atlas has a few connections to classical emotion research. When we use just 2 factors, we roughly reconstruct the canonical mood-axes used in much of psychology: valence and arousal [include mood result]. If we increase to 7 factors, we nearly reconstruct a well known categorization of these emotions into happy, surprised, sad, bad, disgusted, fearful, and angry, except with “disgusted” switched for a new category related to affection that includes “valued,” “loving,” “lonely,” and “insignificant.”

# Typographic Attacks

As we’ve seen, CLIP is full of multimodal neurons which respond to both images and text for a given concept. Given how strongly these neurons react to text, we wonder: can we perform a kind of non-programmatic adversarial attack – a typographic attack – using just a marker and an English word?

## Physical typographic attacks

To test this hypothesis, we took several common items and deliberately mislabeled them. We then observed how this affects ImageNet classification (discussed <a>earlier</a>). We find this attack often successfully changes the classification:


[….]


import InTheWild2 from './diagrams/InTheWild2.svelte'

<Svelte component={InTheWild2} />

The model’s response to these adversarial images is reminiscent of the Stroop effect [] from psychology, in which participants become slower at naming the color of a stimulus if they’re naming the font color over an unrelated color word, as compared to simply naming the color of a colored square. We find there’s something similarly jarring to the experience of looking at these deliberately mislabeled objects, and just as humans are susceptible to the Stroop effect, CLIP is susceptible to these attacks.

While many classic adversarial attacks focus on making imperceptible changes to images [], typographic attacks are more similar to work such as adversarial patches [1] and physical adversarial examples [2]. Adversarial patches are stickers that can be placed on a real-life objects in order to cause neural nets to misclassify that object as something else – for example, a toaster. Physical adversarial examples are complete 3D objects that are reliably misclassified from all perspectives: previous work gives a 3D-printed turtle that is reliably misclassified as a rifle and a baseball that is misclassified as an espresso. However, typographic attacks are both weaker and stronger than these. On the one hand, they only work for models with multimodal neurons. On the other hand, once you understand this property of the models, they can be executed non-programmatically and as a black-box attack, available to any adversary -- including six year olds.



## Automated typographic attacks

Are typographic attacks reliable? Duct tape and markers don't scale, so we create a simple automated setup to measure the attack’s success rate on the ImageNet validation set.


import AttackSetup from './diagrams/AttackSetup.svelte'

<Svelte component={AttackSetup} />

We found text snippets for our attacks in two different ways. Firstly, we brute-force searching through all of the ImageNet class names looking for short class names which are, in and of themselves, effective attacks. This is how we found rifle, pizza, radio, iPod, and library. Secondly, we manually looked through the multimodal model's neurons for those that appear sensitive to particular kinds of text. This is how we found the piggy bank and Siamese cat attacks.

import AttackableNeurons from './diagrams/AttackableNeurons.svelte'

<Svelte component={AttackableNeurons} />

 

Using this setup, we found several attacks to be reasonably effective. The most successful attacks achieve a 97% attack success rate with only around 7% of the image's pixels changed. These results are competitive with the results found in Adversarial Patch, albeit on a different model.



import AutomatedAttacks from './diagrams/AutomatedAttacks.svelte'

<Svelte component={AutomatedAttacks} />

[Assuming we have a zero-shot col in above table.] It’s worth noting that the zero-shot classifier is more vulnerable to these attacks than the linear problem classifier, but the attacks are somewhat effective on both.


# Appendix 1: Methodological Details

## Faceted Feature Visualization

A neuron is said to have multiple facets if there are multiple distinct cases that they fire for [Angh] -- that is, if a feature can be described as <i>OR(case_1, case_2, …)</i>. For example, a pose-invariant dog-head detector that detects dog heads tilted to the left, right, or facing straight on [], or a boundary detector which looks for a difference in texture from one side to the other, but doesn’t care which is which [], or a “grocery store” output neuron that detects both exterior and interior views of a grocery store. (You may also be familiar with the idea of a “polysemantic” neuron. Polysemantic neurons are a special type of multifaceted neuron in which the facets are unrelated.)

Feature visualization is a technique where the input to a neural network is optimized to create a stimuli demonstrating some behavior, typically maximizing the activation of a neuron.  There are two challenges with using feature visualization on multi-faceted neurons. Firstly, the optimization process may give us an out-of-distribution input that tries to activate multiple facets at once; this can sometimes help reveal the existence of multiple facets, but can also lead to difficult-to-parse or nonsensical stimuli. (We suspect this is true when the multiple facets aren’t mutually inhibiting -- for contrast, see mutual inhibition in the pose invariant dog head circuit in [].) Secondly, even if the optimization process successfully reveals once facet, it may not reveal others.

These challenges are of increased significance in the multimodal models we study in this paper, because the highly-abstract neurons at the end of the network seem to activate for an enormous variety of cases!

We are aware of two past approaches to improving feature visualization for multi-faceted neurons. The first approach is to find highly diverse images which activate a given neuron, and use them as seeds for the feature visualization optimization process []. This approach requires one to have access to the dataset, may taint the value of feature visualization in establishing evidence of causality, and the stimuli may still be pulled into a different basin of attraction. An alternative approach is to perform multiple feature visualizations at once optimizing for an additional “diversity term” which encourages the different feature visualizations to activate different lower-level neurons []. However, this can incent the visualizations to include unrelated content to activate lower level neurons and increase the diversity term.

We take a new variant of the second approach. Like [], we add a diversity term to the optimization process. However, we base our diversity term not on the <i>activation</i> of lower level neurons, but on the <i>attribution</i> of the high-level neuron to lower level neurons. The intent here is to only incent variation in low-level neurons if it affects the neuron we’re visualizing. To formalize this, we use a simple <i>attribution = gradient ⊙ activation</i> attribution method, which can be seen as the linear approximation of the effect of the lower level neurons on the high level one. Since this is a resnet where there is a linear pathway between them, this seems especially principled. We then maximize the orthogonal components of these attribution vectors . A reference implementation can be found in attached colab notebooks.

Sometimes it’s desirable to visualize analogous types of facets across many neurons in a controlled manner. In the multimodal models, many neurons have a “text” facet -- in fact, many neurons have lots of different text facets, responding to many words! -- and we’d like to see them for all neurons. To do this, we first collect images of each type (text, faces, etc) and fit a logistic regression. We then add a targeted diversity term <i>regression weights ⊙ attribution</i> to encourage a facet that activates our high-level neuron through low-level neurons associated with a given facet type. Again, a reference implementation can be found in attached colab notebooks.














====

Modality ordering czar

==========================



Idea for organization of the article?

Introduction 
Multimodal neurons + Grandmother neurons
What are the representations? (neuron tour + universality)
Possible: Break into vignettes
		Focus on stuff that isn’t obvious, breeze through stuff that is more obvious.
Text
OCR stack
		      -  Photoshop Detection?
			- Places
Unioning stuff
Themes
Sketch
Parenthood
Christmas
Humans
Pose/Facial Expression/Race(?)/Intent(?)
Include high level (abstract ideas), medium level (faces/text) and low level (large/small text detectors)
Include possible “deeper dives” into particular neurons here.
How are the representations made? (circuits)
Face
Circuits Chris found w.r. To face detectors/background detectors
Branches/Enrichments
How are the representations used? (attribution experiments)
Understanding Geography
Understanding Value
Paradoxes of Abstraction (typographical attacks + captioning attacks)


Conclusion (thoughts on neuroscience and the brain, limitations of single neuron approach, polysemantic neurons) (?)
Appendix for Techniques
Diversity
Facets
Text Feature Viz
Text Feature Viz (Image side) (?)


Multimodal Representations

Related Work
[Quiroga1 et al] Invariant Visual Representation by Single Neurons in the Human Brain
http://amygdala.psychdept.arizona.edu/IntroData/Readings/week5/Quiroga-reddy-kreiman-koch-Fried+invariant-visual-single-neurons-human+Nature+2005.pdf


Universality

Related Work



The Mechanics of Abstraction

Related Work



Typographic Attacks

Related Work
[Brown et al] Adversarial Patch 
https://arxiv.org/abs/1712.09665

Activation Atlas
[Carter et al] https://distill.pub/2019/activation-atlas/

Stroop Effect
[Stroop et al] https://en.wikipedia.org/wiki/Stroop_effect
Supernormal Stimuli? https://en.wikipedia.org/wiki/Supernormal_stimulus






