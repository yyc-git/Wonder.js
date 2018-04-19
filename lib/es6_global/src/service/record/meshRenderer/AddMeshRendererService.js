// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as ArrayService$Wonderjs        from "../../atom/ArrayService.js";
import * as AddComponentService$Wonderjs from "../../primitiive/component/AddComponentService.js";

function _setRenderGameObjectArray(_, gameObject, renderGameObjectArray) {
  return ArrayService$Wonderjs.push(gameObject, renderGameObjectArray);
}

function handleAddComponent(meshRenderer, gameObjectUid, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* renderGameObjectArray */ArrayService$Wonderjs.push(gameObjectUid, record[/* renderGameObjectArray */1]),
          /* gameObjectMap */AddComponentService$Wonderjs.addComponentToGameObjectMap(meshRenderer, gameObjectUid, record[/* gameObjectMap */2]),
          /* disposedIndexArray */record[/* disposedIndexArray */3]
        ];
}

export {
  _setRenderGameObjectArray ,
  handleAddComponent        ,
  
}
/* ArrayService-Wonderjs Not a pure module */