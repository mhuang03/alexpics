import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {Inline, Zoom, Video} from "yet-another-react-lightbox/plugins";

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

let slides = []

// load pics from public/img
require.context('../public/img', true, /.*/).keys().forEach((item, index) => {
  slides.push({
    src: "img" + item.substring(1),
    alt: "Image " + index,
  })
});

// load videos from public/video
require.context('../public/vid', true, /.*/).keys().forEach((item, index) => {
  slides.push({
    type: "video",
    sources: [
      {
        src: "vid" + item.substring(1),
        type: "video/" + item.substring(item.lastIndexOf(".") + 1)
      }
    ]
  })
});

shuffleArray(slides);

const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh"}}>
      <Lightbox 
        slides={slides} 
        plugins={[Inline, Zoom, Video]} 
        zoom={{
          maxZoomPixelRatio: 10,
          scrollToZoom: true
        }}
        video={{
          autoPlay: true,
          controls: false,
          loop: true,
          muted: false,
          preload: "auto",
          playsInline: true
        }}
      />
    </div>
  );
};

export default App;