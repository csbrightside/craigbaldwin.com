---
title: "Super simple scroll animations"
date: 2020-05-21
tags: ["Development"]
draft: true
excerpt: "Dependency-free intersection observer-based CSS scroll animations package available now."
---

It's a fairly simple requirement; as you scroll down the page, make elements appear in an animated fashion. In fact it happened so regularly I decided to create a simple package to achieve it.

{{<
  link
  title="Super Simple Scroll Animations"
  subtitle="Intersection observer-based CSS scroll animations."
  url="https://www.npmjs.com/package/super-simple-scroll-animations"
>}}

Introducing [Super Simple Scroll Animations](https://www.npmjs.com/package/super-simple-scroll-animations) (SSSA). It's available now over on npm. Check out the source code on [GitHub](https://github.com/csbrightside/super-simple-scroll-animations).

Now you could use the ever popular [AOS](https://michalsnik.github.io/aos/), and SSSA definitely doesn't replace all the features of AOS (SSSA _is_ only [436B](https://bundlephobia.com/result?p=super-simple-scroll-animations@1.0.2) compared to AOS's [4.5kB](https://bundlephobia.com/result?p=aos@2.3.4)) but it did everything I needed; add a class to an element when it comes into the viewport and optionally remove it when it leaves.