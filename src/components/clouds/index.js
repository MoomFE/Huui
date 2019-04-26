import './components/clouds-item/index';
import css from './index.scss';
import getNumber from './utils/getNumber';
import defaultNumber from './utils/defaultNumber';
import render from "../../utils/render";
import { html } from "../../shared/global/Hu/index";



Hu.define( 'hu-clouds', {

  props: {
    num: {
      type: num => isNaN( num ) ? getNumber( num ) : num,
      default: defaultNumber
    }
  },

  computed: {
    clouds : hu => {
      return Array.apply( null, { length: hu.num } ).map(() => {
        return html`<hu-clouds-item/>`;
      });
    }
  },

  render: render({
    css,
    html(){
      return html`<div>${ this.clouds }</div>`
    }
  })

});