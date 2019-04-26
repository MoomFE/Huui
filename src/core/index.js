import create from "../utils/create";
import util from "./util/index";
import { inBrowser } from "../shared/const/env";


const Huui = create({
  util
});

{
  const otherHuui = inBrowser ? window.Huui : void 0;

  Huui.noConflict = () => {
    if( inBrowser && window.Huui === Huui ) window.Huui = otherHuui;
    return Huui;
  }

  if( inBrowser ){
    window.Huui = Huui;
  }
}

export default Huui;