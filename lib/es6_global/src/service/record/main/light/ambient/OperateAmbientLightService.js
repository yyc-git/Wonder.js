// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as RecordAmbientLightMainService$Wonderjs from "../../../../state/main/light/ambient/RecordAmbientLightMainService.js";

function getColor(mappedIndex, param) {
  return RecordAmbientLightMainService$Wonderjs.getColor(mappedIndex, param[/* colors */2]);
}

function setColor(mappedIndex, color, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* colors */RecordAmbientLightMainService$Wonderjs.setColor(mappedIndex, color, record[/* colors */2]),
          /* mappedIndexMap */record[/* mappedIndexMap */3],
          /* gameObjectMap */record[/* gameObjectMap */4]
        ];
}

export {
  getColor ,
  setColor ,
  
}
/* RecordAmbientLightMainService-Wonderjs Not a pure module */