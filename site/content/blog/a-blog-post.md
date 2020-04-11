---
title: "A blog post"
date: "2020-04-11"
tags: ["Development"]
draft: false
excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor efficitur ligula, sit amet fringilla risus efficitur eget. Donec fringilla, erat sed ultrices cursus."
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor efficitur ligula, sit amet fringilla risus efficitur eget. Donec fringilla, erat sed ultrices cursus, mi tellus hendrerit mi, in commodo metus nisl et neque. In efficitur nisi id placerat malesuada. Cras tincidunt tellus nec viverra tempus. Fusce finibus ultrices nisi, ut posuere urna semper et. Donec scelerisque justo arcu, eget feugiat nunc euismod nec. Nunc bibendum augue non lacus gravida, non molestie nulla rhoncus. Aenean ipsum massa, gravida in scelerisque eu, convallis finibus leo.

{{< highlight css >}}

/**
 * Comment.
 */
code {
  color: $COLOR_DARK_MODE_WHITE;
  display: block;
  font-family: 'Source Code Pro', monospace;
  font-size: 1.1rem;
  line-height: 1.6;
  min-width: fit-content;
  padding-right: $SPACING_S;

  &::selection,
  span::selection {
    background-color: $COLOR_BLUE;
    color: $COLOR_DARK_MODE_WHITE;
  }

  .ln {
    opacity: 0.5;
    padding-right: $SPACING_S;
  }
}
{{< /highlight >}}

Duis lacinia nisl viverra eros aliquet, nec porttitor arcu dapibus. Duis feugiat sed est in condimentum. Nunc vitae massa orci. Vivamus id leo euismod, imperdiet metus ut, luctus magna. Vivamus placerat magna ut dui sagittis, efficitur sodales orci lacinia. Vestibulum suscipit aliquet erat, at blandit lectus maximus condimentum. Sed viverra erat dui, eget aliquet odio lobortis vitae. Nulla id mi id orci tempor luctus vitae sed mi. Nunc ut est quam. Nullam tellus felis, venenatis tempus magna nec, pharetra mollis neque. Nullam eget dui porttitor, tincidunt ipsum et, fringilla sapien.

{{< highlight js >}}
/**
 * Open the navigation drawer.
 * @param {Boolean} trapFocusInside - Whether to trap focus.
 */
function openNavigationDrawer(trapFocusInside = true) {
  nodeSelectors.menuButton.classList.add(cssClasses.active);
  nodeSelectors.menuButton.setAttribute('aria-expanded', true);

  nodeSelectors.navigationDrawer.classList.add(cssClasses.active);
  nodeSelectors.navigationDrawer.setAttribute('aria-hidden', false);

  nodeSelectors.navigationLink.forEach((element) => element.setAttribute('tabindex', 0));
  nodeSelectors.navigationDrawer.querySelector(selectors.darkMode).setAttribute('tabindex', 0);

  disableBodyScroll(document.body);

  if (trapFocusInside) {
    document.addEventListener('keydown', trapFocus);
  }
}
{{< /highlight >}}

Mauris sapien ante, gravida sit amet vehicula et, dignissim quis felis. Etiam finibus, sem id suscipit viverra, nisl ligula dictum eros, id finibus est nunc non elit. Nunc arcu sapien, interdum a dictum a, gravida sit amet leo. In molestie interdum tristique. Morbi dapibus nulla arcu, et varius ex maximus sit amet. Sed nisi orci, tempus nec nulla a, gravida viverra arcu. Nunc tempor turpis sapien, vitae lacinia libero tristique non. Quisque eget ante sit amet nisi rutrum dapibus ut eu elit. Integer feugiat velit lobortis, euismod orci at, ullamcorper nibh.
