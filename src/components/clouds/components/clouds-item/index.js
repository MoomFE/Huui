import css from './index.scss';
import random from "../../../../utils/random";
import render from "../../../../utils/render";


Hu.define( 'hu-clouds-item', {

  data(){
    const width = random( 80, 150 );
    const height = width / 2.75;

    return {
      width: width + 'px',
      height: height + 'px',
      top: `calc(${ random( 0, 100 ) }% - ${ height / 2 }px)`,
      left: `calc(${ random( 0, 100 ) }% - ${ width / 2 }px)`,
      opacity: random( 10, 66 ) / 100,
      animationDelay: random( 500, 6666 ) + 'ms',
      animationDuration: random( 10000, 20000 ) + 'ms'
    };
  },

  render: render({
    css,
    html( html ){
      return html`<div :style=${ this.$data }></div>`;
    }
  })

});