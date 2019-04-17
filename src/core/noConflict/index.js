import Huui from "../index";
import { inBrowser } from "../../shared/const/env";


const otherHuui = inBrowser ? window.Huui
                            : undefined;

Huui.noConflict = () => {
  if( inBrowser && window.Huui === Huui ) window.Huui = otherHuui;
  return Huui;
}

if( inBrowser ){
  window.Huui = Huui;
}