---
title: "Building SofaSofa"
date: 2020-10-03
tags: ["Development", "SofaSofa"]
draft: false
excerpt: "A look at the headline features and how they were built."
---

{{<
  link
  title="sofasofa.co.uk"
  subtitle="A great British manufacturer since 1981."
  url="https://sofasofa.co.uk"
>}}

The SofaSofa website is a blend of the We Make Websites framework _Frame 3_ and custom Vue components built to handle the complicated feature requirements. I was the sole developer on the project for the majority of the time and was responsible for coming up with solutions for the features then building and testing them.

## Product colours

SofaSofa's products would have often exceeded Shopify's 100 variant limit so it was decided early on to split products into separate colour products. For example, the [Mia 3 Seater Sofa](https://sofasofa.co.uk/products/mia-3-seater-sofa-opulence-saffron) appears as a single product, but each of the different colours are a separate product in Shopify, blended together using Vue and Apollo to seamlessly switch products.

These products were associated using a title naming convention; the Mia 3 Seater Sofa is actually called `Mia | 3 Seater Sofa | Opulence Saffron` in the Shopify admin. For each of the colour swatches that appears there is a separate _Fabric Sample_ type product, each tagged with `sample_product_family: Mia`.

On page load a Storefront GraphQL API request is made to load all products in the family _Mia_ with the size _3 Seater Sofa_. A separate request will load all _Fabric Samples_ with the associated tag. These are then combined together in a computed property (with several additional checks) and displayed as a row of swatches.

Clicking a swatch makes a request for the associated product handle, once this has loaded the Vue component's data object is updated.

## Sofa finder

The [Sofa Finder](https://sofasofa.co.uk/collections/sofa-finder) (and other collection pages) uses our custom API wrapper called _Lens_ (built by me). This uses the Klevu JS API to request products, filter results, update the URL, and power the predictive search.

Using _Lens_ allowed full customisation of the Sofa Finder page, something that wouldn't have been possible with the default Klevu Shopify app.

This meant we could display a single 'parent' product instead of all the different colours for each family and size. This filtering is then removed when the customer filters by a certain colour.

This was achieved by tagging parent products with `parent~Product` (tilde is the Klevu filter separator character in this instance) and then filtering all requests by this filter unless the list of filters includes 'colour'.

## Request fabric samples

The [Request Fabric Samples](https://sofasofa.co.uk/collections/fabric-samples) collection is a specially customised collection designed to display all _Fabric Sample_ products with the ability to add up to eight samples to the cart.

This uses several Vue components interacting with one another to handle adding and removing samples from the queue, adding the queue to the cart (displayed as a single line item) and then removing samples from the cart and enforcing the eight sample limit.

I'm particularly pleased that all the functionality continues to work when Javascript is disabled, as does most of the site's functionality.

## In closing

I'm certainly happy with the outcome, not just because of building the technical headline features, but also because of the many small touches and details that I spent a lot of time focusing on. I intend to go into these in another blog post soon.