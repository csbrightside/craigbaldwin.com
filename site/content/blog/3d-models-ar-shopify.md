---
title: "Complex 3D models and augmented reality in Shopify"
date: 2021-02-08
tags: ["Development"]
draft: true
excerpt: "How we solved seamless 3D model switching for TP Toys."
---

{{<
  link
  title="Example 3D model"
  subtitle="Open the 360 view and then change the selected variant"
  url="https://www.tptoys.com/"
>}}

## Solving requirements

One of the main requirements for the TP Toys' store was the ability to combine augmented reality with 3D models so customers could see the product in their garden to make sure it would fit. Whilst at the same time being able to see an updated model as they changed variant, or product builder configuration.

In the original specification we were planning on switching the 3D model entirely whenever a new variant, or configuration, was selected. It soon became apparent this wasn't viable with 3D models being 5 or more megabytes and certain products having more than 20 configurations meaning a customer might end up download 100 Mb of models use to preview the product.

Shopify uses the [model-viewer API](https://modelviewer.dev/) to display 3D models in the browser and in AR. Upon reviewing the documentation, and in consultation with TP Toys' 3D artist, I decided to use different animations to represent each variant, or configuration, using a set naming convention.

## Development

The product page was built using a combination of Liquid templates and Vue components. This could have been entirely built using Vue templating, but I always prefer to use inline templates so I can leverage Liquid rendering, this makes things easier as we can still access Liquid objects and language strings.

First we had to check to see if a product had a 3D model uploaded to media and then assign it using Liquid.

{{< highlight html >}}
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

Once we've got that we need to output the `model-viewer` component. We show/hide this based on Vue state but I've left that out to keep things more concise.

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