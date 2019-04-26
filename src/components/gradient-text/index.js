/**
 * 组件灵感来自来自: 腾讯ISUX
 * https://isux.tencent.com/articles/svg-for-web
 */

import css from './index.scss';
import render from '../../utils/render';
import { html } from '../../shared/global/Hu/index';
import props from '../../utils/props';


Hu.define( 'hu-gradient-text', {

  props: props({
    from: '#279f76',
    to: '#F4A460',
    text: ''
  }),

  render: render({
    css,
    html( html ){
      const hu = this;

      return html`
        <div text=${ hu.text }>
          ${ hu.svg }
        </div>
      `;
    }
  }),

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