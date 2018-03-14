open MainStateDataType;

let createState = () => {
  settingRecord: RecordSettingService.create(),
  jobData: JobHelper.create(),
  noWorkerJobConfig: None,
  workerJobConfig: None,
  renderConfigRecord: None,
  gpuDetectRecord: RecordGPUDetectService.create(),
  viewRecord: RecordViewService.create(),
  sourceInstanceRecord: RecordSourceInstanceService.create(),
  objectInstanceRecord: RecordObjectInstanceService.create(),
  deviceManagerRecord: RecordDeviceManagerService.create(),
  gameObjectRecord: RecordGameObjectService.create(),
  transformRecord: RecordTransformServicie.create(),
  sceneRecord: RecordSceneService.create(),
  basicCameraViewRecord: RecordBasicCameraViewService.create(),
  perspectiveCameraProjectionRecord: RecordPerspectiveCameraProjectionService.create(),
  basicMaterialRecord: RecordBasicMaterialService.create(),
  lightMaterialRecord: RecordLightMaterialService.create(),
  ambientLightRecord: RecordAmbientLightService.create(),
  directionLightRecord: RecordDirectionLightService.create(),
  pointLightRecord: RecordPointLightService.create(),
  boxGeometryRecord: RecordBoxGeometryService.create(),
  meshRendererRecord: RecordMeshRendererService.create(),
  shaderRecord: RecordShaderService.create(),
  glslRecord: RecordGLSLService.create(),
  programRecord: RecordProgramService.create(),
  glslLocationRecord: RecordGLSLLocationService.create(),
  glslSenderRecord: RecordGLSLSenderService.create(),
  glslChunkData: ShaderChunkSystem.create(),
  renderRecord: RecordRenderService.create(),
  timeControllerData: TimeControllerHelper.create(),
  vboBufferRecord: RecordVboBufferService.create(),
  globalTempRecord: RecordGlobalTempService.create(),
  typeArrayPoolRecord: RecordTypeArrayPoolService.create(),
  workerInstanceData: WorkerInstanceHelper.create(),
  workerDetectData: WorkerDetectHelper.create()
};