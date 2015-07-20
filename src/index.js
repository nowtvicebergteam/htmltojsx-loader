"use strict";
import HTMLtoJSX from "htmltojsx";

let htmlToJsx = new HTMLtoJSX();

export default function (source) {
  if (this.cachable) {
    this.cachable();
  }

  return `module.exports = ${htmlToJsx.convert(source)}`;
}
