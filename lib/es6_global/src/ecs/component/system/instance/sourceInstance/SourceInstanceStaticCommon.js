// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as Contract$Wonderjs                  from "../../../../../definition/Contract.js";
import * as SparseMapSystem$WonderCommonlib    from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapSystem.js";
import * as SourceInstanceStateCommon$Wonderjs from "./SourceInstanceStateCommon.js";

function markModelMatrixIsStatic(sourceInstance, isStatic, state) {
  SparseMapSystem$WonderCommonlib.set(sourceInstance, isStatic, SourceInstanceStateCommon$Wonderjs.getSourceInstanceData(state)[/* isModelMatrixStaticMap */4]);
  return state;
}

function isModelMatrixIsStatic(sourceInstance, state) {
  return Contract$Wonderjs.ensureCheck((function () {
                return Contract$Wonderjs.test("should exist", (function () {
                              return Contract$Wonderjs.assertExist(SparseMapSystem$WonderCommonlib.get(sourceInstance, SourceInstanceStateCommon$Wonderjs.getSourceInstanceData(state)[/* isModelMatrixStaticMap */4]));
                            }));
              }), SparseMapSystem$WonderCommonlib.unsafeGet(sourceInstance, SourceInstanceStateCommon$Wonderjs.getSourceInstanceData(state)[/* isModelMatrixStaticMap */4]));
}

function markSendModelMatrix(sourceInstance, isSend, state) {
  SparseMapSystem$WonderCommonlib.set(sourceInstance, isSend, SourceInstanceStateCommon$Wonderjs.getSourceInstanceData(state)[/* isSendModelMatrixDataMap */5]);
  return state;
}

function isSendModelMatrix(sourceInstance, state) {
  return Contract$Wonderjs.ensureCheck((function () {
                return Contract$Wonderjs.test("should exist", (function () {
                              return Contract$Wonderjs.assertExist(SparseMapSystem$WonderCommonlib.get(sourceInstance, SourceInstanceStateCommon$Wonderjs.getSourceInstanceData(state)[/* isSendModelMatrixDataMap */5]));
                            }));
              }), SparseMapSystem$WonderCommonlib.unsafeGet(sourceInstance, SourceInstanceStateCommon$Wonderjs.getSourceInstanceData(state)[/* isSendModelMatrixDataMap */5]));
}

export {
  markModelMatrixIsStatic ,
  isModelMatrixIsStatic   ,
  markSendModelMatrix     ,
  isSendModelMatrix       ,
  
}
/* SourceInstanceStateCommon-Wonderjs Not a pure module */