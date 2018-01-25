let _getDefaultRenderConfig = () => RenderConfigTool.buildRenderConfig();

let initWithRenderConfig = (sandbox) =>
  TestTool.initWithRenderConfig(
    ~sandbox,
    ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)),
    ~renderConfig=_getDefaultRenderConfig(),
    ()
  );

let initWithRenderConfigWithoutBuildFakeDom = (sandbox) =>
  TestTool.initWithRenderConfigWithoutBuildFakeDom(
    ~sandbox,
    ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)),
    ~renderConfig=_getDefaultRenderConfig(),
    ()
  );

let initWithRenderConfigAndBufferConfig = (sandbox, bufferConfig) =>
  TestTool.initWithRenderConfig(
    ~sandbox,
    ~bufferConfig,
    ~renderConfig=_getDefaultRenderConfig(),
    ()
  );

let prepareGameObject = (sandbox, state) => {
  open GameObject;
  open BasicMaterial;
  open BoxGeometry;
  open MeshRenderer;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectMaterialComponent(gameObject, material)
    |> addGameObjectGeometryComponent(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer)
};

let initSystemAndRender = (state: StateDataType.state) =>
  state |> JobSystem.init |> DirectorTool.initSystem |> WebGLRenderAdmin.init;

let updateSystem = (state: StateDataType.state) => state |> DirectorTool.updateSystem;

let passGl = (sandbox, state: StateDataType.state) =>
  state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

let buildConfigData = (~flags=None, ~shader=None, ()) => (flags, shader);