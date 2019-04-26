import './components/clouds-item/index';
import css from './index.scss';
import define from '../../utils/define';
import random from '../../utils/random';
import { html } from "../../shared/global/Hu/index";


define( 'clouds', {

  props: {
    num: null,
    color: '#FFF'
  },

  computed: {
    length({ num }){
      if( num ){
        if( !isNaN( num ) ) return +num;
        if( ( num = num.split(',') ).length > 1 ){
          let [ num1, num2 ] = num;

          if( !isNaN( num1 ) && num1 >= 0 && !isNaN( num2 ) && num2 >= 0 ){
            num1 = +num1;
            num2 = +num2;

            return num2 > num1 ? random( num1, num2 ) : random( num2, num1 );
          }
        }
      }
      return random( 6, 12 );
    },
    clouds({ length }){
      return Array.apply( null, { length } ).map(() => {
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