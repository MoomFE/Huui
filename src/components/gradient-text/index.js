/**
 * 组件灵感来自来自: 腾讯ISUX
 * https://isux.tencent.com/articles/svg-for-web
 */

import css from './index.scss';
import define from '../../utils/define';
import { html } from '../../shared/global/Hu/index';
import { svg } from '../../shared/global/Hu/html';


define( 'gradient-text', {

  props: {
    from: '#279f76',
    to: '#F4A460',
    steps: '',
    text: ''
  },

  render: {
    css,
    html(){
      return html`
        <div text=${ this.text }>
          ${ this.svg }
        </div>
      `;
    }
  },

  computed: {
    stops({ from, to, steps }){
      const stops = [];

      if( steps ){
        stops.push(
          ...steps.split(',').map( color => {
            return color.trim();
          })
        );
      }

      if( from ) stops.splice( 0, 0, from );
      if( to ) stops.push( to );

      const length = stops.length;
      const proportion = length > 1 ? 100 / ( length - 1 ) : 0;

      return stops.map(( color, index ) => {
        return svg`<stop stop-color=${ color } offset="${ proportion * index }%"/>`;
      });
    },
    svg({ stops, text }){
      return html`
        <svg>
          <defs>
            <linearGradient id="ISUX">${ stops }</linearGradient>
          </defs>
          <text y="50%" dy="30%" fill="url(#ISUX)">${ text }</text>
        </svg>
      `;
    }
  }

});