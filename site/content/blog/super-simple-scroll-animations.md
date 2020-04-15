---
title: "Super simple scroll animations"
date: 2020-04-15
tags: ["Development"]
draft: false
excerpt: "Dependency-free intersection observer-based CSS scroll animations package available now."
---

{{<
  link
  title="Super Simple Scroll Animations"
  subtitle="Intersection observer-based CSS scroll animations."
  url="https://www.npmjs.com/package/super-simple-scroll-animations"
>}}

Introducing [Super Simple Scroll Animations](https://www.npmjs.com/package/super-simple-scroll-animations) (SSSA), available now on npm. Check out the source code on [GitHub](https://github.com/csbrightside/super-simple-scroll-animations) and submit any [issues](https://github.com/csbrightside/super-simple-scroll-animations/issues) you encounter.

It covers the basics of what most scroll-triggered animations require: adding a class to an element when it comes into the viewport and, optionally, removes it when it leaves. It then uses a set of data attributes combined with CSS transitions to achieve the animation.

It also supports triggering animations on child elements when the parent comes into the viewport, instead of individually as each child elements comes into the viewport.

## Usage
See the [readme](https://www.npmjs.com/package/super-simple-scroll-animations) for full details on how to use it and browser compatibility, no Internet Explorer unless you add a polyfill.

## Alternatives
For a fully featured library you could use [AOS](https://michalsnik.github.io/aos/) but I was trying to keep it as light as possible; SSSA _is_ only [436B](https://bundlephobia.com/result?p=super-simple-scroll-animations@1.0.2) compared to AOS's [4.5kB](https://bundlephobia.com/result?p=aos@2.3.4).


