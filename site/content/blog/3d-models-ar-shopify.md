---
title: "3D models and variants in Shopify"
date: 2021-02-08
tags: ["Development", "TP Toys"]
draft: true
excerpt: "How we solved seamless 3D model switching for TP Toys."
---

## Solving requirements

One of the main requirements for the TP Toys' store was the ability to combine augmented reality with 3D models so customers could see the product in their garden. At the same time they needed to be able to see an updated model seamlessly as they changed variant, or product builder configuration.

In the original specification we were planning on switching the 3D model file entirely whenever a new variant was selected. It soon became apparent this wasn't viable; 3D files were no smaller than 5 MB and some products had more than 20 configurations meaning a customer might end up downloading 100 MB just to preview the product model.

Shopify uses the [model-viewer API](https://modelviewer.dev/) to display 3D models in the browser and in AR. Upon reviewing the documentation, and in consultation with TP Toys' 3D artist, we decided to use different animations in the same file to represent each variant using a special naming convention.

{{<
  link
  title="Example 3D model"
  subtitle="Open the 360 view and then change the selected variant."
  url="https://www.tptoys.com/products/tp-infinity-octagonal-trampoline"
>}}

## Development

The product page was built using a combination of Liquid templates and Vue components. This could have been entirely built using Vue templating, but I always prefer to use inline templates so I can leverage Liquid rendering, this makes sense as Liquid objects and language strings are still easily available.

First I had to check if a product had a 3D model file uploaded to its media and then assign it in Liquid. Each product only supports a single 3D model.

{{< highlight htm >}}
{% assign models = product.media | where: 'media_type', 'model' %}

{% if models.size > 0 %}
  {% assign model = models | first %}

  {% for model_source in model.sources %}
    {% if model_source.format == 'glb' %}
      {% assign model_url = model_source.url %}
    {% elsif model_source.format == 'usdz' %}
      {% assign model_url_usdz = model_source.url %}
    {% endif %}
  {% endfor %}
{% endif %}
{{< /highlight >}}

Once this is set I needed to output the `model-viewer` component. I decided not to use the base Shopify implementation so I could customise its display with Vue, this means I also had to separately call the model-viewer JS.

{{< highlight html >}}
<model-viewer
  ref="model"
  class="product-gallery__model"
  alt="{{ model.alt }}"
  animation-crossfade-duration="0"
  ar
  ar-models="webxr scene-viewer quick-look"
  ar-scale="fixed"
  camera-controls
  interaction-prompt="none"
  ios-src="{{ model_url_usdz }}"
  loading="lazy"
  quick-look-browsers="safari"
  reveal="manual"
  shadow-intensity="1"
  src="{{ model_url }}"
  tabindex="-1"
  @load="handleModelLoad()"
></model-viewer>
{{< /highlight >}}

The `handleModelLoad()` function is used to update the Vue state once the `load` event is fired by model-viewer. This function also runs the `getVariantModelAnimation()` function but first let's look at other the Vue states.

Every variant has a unique SKU and as these SKUs are selected a `currentSkus` computed array is updated and sorted alphanumerically. It's possible to have multiple current SKUs due to the product builder hence why it's an array.

Each configuration is represented as an animation in the model, and each animation is named as follows:

* 001.SKU1
* 002.SKU2
* 003.SKU1-SKU2
* 004.SKU1-SKU2-SKU2
* etc.

Using a Vue watch on `currentSkus` I run `getVariantModelAnimation()` every time it's updated, this function is used to look through available animations and then exactly match it with the `currentSkus` array.

{{< highlight js >}}
/**
 * Get current SKUs matching model animation.
 * - If no matching animation then set to first animation.
 */
getVariantModelAnimation() {
  if (
    !this.model.loaded ||
    !this.$refs.model.availableAnimations.length
  ) {
    return;
  }

  /**
   * Check to see if there is a matching animation with the same number of
   * SKUs and which contains all current SKUs.
   */
  const match = this.$refs.model.availableAnimations.find((animation) => {
    let animationSkus = animation.split('.')[1].split('-');

    if (animationSkus.length !== this.currentSkus.length) {
      return false;
    }

    animationSkus = animationSkus.sort();

    return animationSkus.every((sku, index) => {
      return sku === sortedCurrentSkus[index];
    });
  });

  /**
   * Update model animation and set time to end.
   */
  this.$refs.model.animationName = (
    match ||
    this.$refs.model.availableAnimations[0]
  );

  this.$refs.model.currentTime = 1.0;
},
{{< /highlight >}}

As you can see in the code (lines 34-37) `match` is then used to update the current animation on the model. The `currentTime` is also set to the end (line 39) otherwise it might show a transitional state between two animations.

Thanks to a bit of co-operation and Vue this was ultimately a fairly straightforward challenge when it could have been a much bigger problem.