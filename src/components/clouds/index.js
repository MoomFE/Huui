import './components/clouds-item/index';
import css from './index.scss';
import define from '../../utils/define';
import getNumber from './utils/getNumber';
import defaultNumber from './utils/defaultNumber';
import { html } from "../../shared/global/Hu/index";


define( 'clouds', {

  props: {
    num: {
      type: num => isNaN( num ) ? getNumber( num ) : num,
      default: defaultNumber
    },
    color: '#FFF'
  },

  computed: {
    clouds : hu => {
      return Array.apply( null, { length: hu.num } ).map(() => {
        return html`<hu-clouds-item/>`;
      });
    }
  },

  render: {
    css,
    html(){
      return html`
        <div style="color: ${ this.color }">${ this.clouds }</div>
      `;
    }
  }

});