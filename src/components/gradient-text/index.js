/**
 * 组件灵感来自来自: 腾讯ISUX
 * https://isux.tencent.com/articles/svg-for-web
 */

import css from './index.scss';
import define from '../../utils/define';
import { html } from '../../shared/global/Hu/index';


define( 'gradient-text', {

  props: {
    from: '#279f76',
    to: '#F4A460',
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
    svg( hu ){
      return html`
        <svg>
          <defs>
            <linearGradient id="ISUX">
              <stop stop-color=${ this.from } offset="0%"/>
              <stop stop-color=${ this.to } offset="100%"/>
            </linearGradient>
          </defs>
          <text y="50%" dy="30%" fill="url(#ISUX)">${ hu.text }<text>
        </svg>
      `;
    }
  }

});