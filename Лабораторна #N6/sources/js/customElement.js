class SimpleGallery extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" });

    const div = this._getDiv("simple-gallery", "imgs-src");
    const style = this._getStyle();

    shadow.appendChild(div);
    shadow.appendChild(style);
  }

  _getStyle() {
    const style = document.createElement("style");
    style.innerHTML = this._getStyleBody();
    return style;
  }

  _getDiv(idValue, hasAttribute) {
    let div = document.createElement("div");
    div.setAttribute("class", idValue);

    if (this.hasAttribute(hasAttribute)) {
      let imgs = this.getAttribute(hasAttribute).split(";");
      div = this._addImgs(imgs, div, "'https://www.arabamerica.com/wp-content/themes/arabamerica/assets/img/thumbnail-default.jpg'");
    }

    return div;
  }

  // It's possible to wirte this in one-line 
  // in constructor with map,
  // but i don't want to create hard-to-read structures
  _addImgs(imgs, toAppend, defPic) {
    for (let img of imgs) {
      let wrapper = document.createElement("div");
      var image = document.createElement("img");

      wrapper.setAttribute("onclick", "handleFullscreen(this)");
      image.setAttribute("src", "./resources/gallery/" + img);
      image.setAttribute("onerror", "this.src = " + defPic);
      image.setAttribute("onload", "handleImgSize(this)");

      wrapper.appendChild(image);
      toAppend.appendChild(wrapper);
    }
    return toAppend;
  }

  _getStyleBody() {
    return `
    .simple-gallery {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .simple-gallery div {
      display: flex;
      overflow: hidden;
      align-items: center;
      justify-content: center;
      margin: 5px;
      width: 350px;
      height: 350px;
    }
    div .fullscreen {
      position: fixed;
      width: 100%;
      height: 100%;
      transition: all 1s ease-in
    }`;
  }
}

function handleImgSize(img) {
  if (img.clientWidth < img.clientHeight) {
    resizeImg(img, "auto", "90%");
  }
  else {
    resizeImg(img, "90%", "auto");
  }
}

function resizeImg(img, height, width) {
  img.style.height = height;
  img.style.width = width;
}

function handleFullscreen(div) {
  if (div.getAttribute('class') !== 'fullscreen') {
    div.setAttribute('class', 'fullscreen');
  }
  else {
    div.setAttribute('class', '');
  }
}


customElements.define("simple-gallery", SimpleGallery);