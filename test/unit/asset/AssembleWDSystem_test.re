open Wonder_jest;

open Js.Promise;

let _ =
  describe("AssembleWDSystem", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());
    let _getChildren = (parent, state) =>
      TransformAPI.unsafeGetTransformChildren(parent, state)
      |> Js.Array.sortInPlace;
    let _getAllChildrenTransform = (sceneGameObject, state) => {
      let rec _addChildren = (parentArr, state, childrenArr) => {
        let childrenArr = childrenArr |> Js.Array.concat(parentArr);
        parentArr
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (. (state, childrenArr), parent) =>
               _addChildren(_getChildren(parent, state), state, childrenArr),
             (state, childrenArr),
           );
      };
      _addChildren(
        _getChildren(
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            sceneGameObject,
            state,
          ),
          state,
        ),
        state,
        [||],
      );
    };
    let _getAllSortedTransforms = (sceneGameObject, state) => {
      let (state, allTransformChildren) =
        _getAllChildrenTransform(sceneGameObject, state);
      let allTransformChildren = allTransformChildren |> Js.Array.sortInPlace;
      [|
        GameObjectAPI.unsafeGetGameObjectTransformComponent(
          sceneGameObject,
          state,
        ),
      |]
      |> Js.Array.concat(allTransformChildren);
    };

    let _getAllGameObjects = (sceneGameObject, state) => {
      let (state, allTransformChildren) =
        _getAllChildrenTransform(sceneGameObject, state);

      [|sceneGameObject|]
      |> Js.Array.concat(
           allTransformChildren
           |> Js.Array.map(transform =>
                TransformAPI.unsafeGetTransformGameObject(transform, state)
              ),
         );
    };
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestTool.init(
          ~sandbox,
          ~buffer=
            SettingTool.buildBufferConfigStr(
              ~customGeometryPointCount=10000,
              ~customGeometryCount=10,
              (),
            ),
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("build scene gameObject", () => {
      testPromise("test single scene gameObject", () =>
        AssembleWDSystemTool.testResult(
          ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
          ((state, sceneGameObject)) => sceneGameObject |> expect == 0,
          state^,
        )
      );
      testPromise("test multi scene gameObjects", () =>
        AssembleWDSystemTool.testResult(
          AssembleWDSystemTool.buildGLTFJsonOfMultiSceneGameObjects(),
          ((state, sceneGameObject)) =>
            (
              sceneGameObject,
              TransformAPI.unsafeGetTransformChildren(
                GameObjectAPI.unsafeGetGameObjectTransformComponent(
                  sceneGameObject,
                  state,
                ),
                state,
              ),
            )
            |> expect == (2, [|0, 1|]),
          state^,
        )
      );
    });
    describe("test transforms", () => {
      describe("test set parent", () => {
        testPromise("test children", () =>
          AssembleWDSystemTool.testResult(
            ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
            ((state, sceneGameObject)) => {
              let (state, allTransformChildren) =
                _getAllChildrenTransform(sceneGameObject, state);
              allTransformChildren |> expect == [|1, 3, 5, 6, 7, 2, 4|];
            },
            state^,
          )
        );
        testPromise("test parent", () =>
          AssembleWDSystemTool.testResult(
            ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
            ((state, sceneGameObject)) => {
              let (state, allTransformChildren) =
                _getAllChildrenTransform(sceneGameObject, state);
              TransformTool.getRecord(state).parentMap
              |> Obj.magic
              |>
              expect == [|
                          Js.Undefined.empty |> Obj.magic,
                          0,
                          1,
                          0,
                          3,
                          0,
                          0,
                          0,
                        |];
            },
            state^,
          )
        );
      });
      describe("test set data", () =>
        testPromise("test", () =>
          AssembleWDSystemTool.testResult(
            ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
            ((state, sceneGameObject)) =>
              _getAllSortedTransforms(sceneGameObject, state)
              |> Js.Array.map(transform =>
                   TransformAPI.getTransformLocalPosition(transform, state)
                 )
              |>
              expect == [|
                          (0., 0., 0.),
                          (
                            (-1.352329969406128),
                            0.4277220070362091,
                            (-2.98022992950564e-8),
                          ),
                          (0., 0., 0.),
                          (
                            1.432669997215271,
                            0.4277220070362091,
                            (-2.98022992950564e-8),
                          ),
                          (0., 0., 0.),
                          (0., 0., 0.),
                          (0., 0., 0.),
                          (0., 0., 0.),
                        |],
            state^,
          )
        )
      );
      describe("contract check", () =>
        testPromise("shouldn't disposed before", () => {
          TestTool.openContractCheck();
          let (state, gameObject, transform) =
            GameObjectTool.createGameObject(state^);
          let state = TransformTool.dispose(transform, state);

          ConvertGLTFTool.testResult(
            ConvertGLTFTool.buildGLTFJsonOfSingleNode(), data =>
            expect(() =>
              AssembleWDSystem.assemble(data, state)
            )
            |> toThrowMessage("expect not disposed before")
          );
        })
      );
    });
    describe("test customGeometrys", () => {
      open Js.Typed_array;

      describe("test set point data", () => {
        testPromise("test single node gltf", () =>
          AssembleWDSystemTool.testResult(
            ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
            ((state, sceneGameObject)) => {
              let boxGameObject = sceneGameObject;
              let boxCustomGeometry =
                GameObjectAPI.unsafeGetGameObjectCustomGeometryComponent(
                  boxGameObject,
                  state,
                );
              (
                CustomGeometryAPI.getCustomGeometryVertices(
                  boxCustomGeometry,
                  state,
                ),
                CustomGeometryAPI.getCustomGeometryNormals(
                  boxCustomGeometry,
                  state,
                ),
                CustomGeometryAPI.getCustomGeometryTexCoords(
                  boxCustomGeometry,
                  state,
                ),
                CustomGeometryAPI.getCustomGeometryIndices(
                  boxCustomGeometry,
                  state,
                ),
              )
              |>
              expect == (
                          Float32Array.make([|
                            (-0.5),
                            (-0.5),
                            0.5,
                            0.5,
                            (-0.5),
                            0.5,
                            (-0.5),
                            0.5,
                            0.5,
                            0.5,
                            0.5,
                            0.5,
                            0.5,
                            0.5,
                            0.5,
                            0.5,
                            (-0.5),
                            0.5,
                            0.5,
                            0.5,
                            (-0.5),
                            0.5,
                            (-0.5),
                            (-0.5),
                            (-0.5),
                            0.5,
                            0.5,
                            0.5,
                            0.5,
                            0.5,
                            (-0.5),
                            0.5,
                            (-0.5),
                            0.5,
                            0.5,
                            (-0.5),
                            0.5,
                            (-0.5),
                            0.5,
                            (-0.5),
                            (-0.5),
                            0.5,
                            0.5,
                            (-0.5),
                            (-0.5),
                            (-0.5),
                            (-0.5),
                            (-0.5),
                            (-0.5),
                            (-0.5),
                            0.5,
                            (-0.5),
                            0.5,
                            0.5,
                            (-0.5),
                            (-0.5),
                            (-0.5),
                            (-0.5),
                            0.5,
                            (-0.5),
                            (-0.5),
                            (-0.5),
                            (-0.5),
                            (-0.5),
                            0.5,
                            (-0.5),
                            0.5,
                            (-0.5),
                            (-0.5),
                            0.5,
                            0.5,
                            (-0.5),
                          |]),
                          Float32Array.make([|
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            1.,
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.,
                            (-1.),
                          |]),
                          Float32Array.make([|
                            6.,
                            0.,
                            5.,
                            0.,
                            6.,
                            0.9999998807907104,
                            5.,
                            0.9999998807907104,
                            4.,
                            0.,
                            5.,
                            0.,
                            4.,
                            1.,
                            5.,
                            1.,
                            2.,
                            0.,
                            1.,
                            0.,
                            2.,
                            1.,
                            1.,
                            1.,
                            3.,
                            0.,
                            4.,
                            0.,
                            3.,
                            1.,
                            4.,
                            1.,
                            3.,
                            0.,
                            2.,
                            0.,
                            3.,
                            1.,
                            2.,
                            1.,
                            0.,
                            0.,
                            0.,
                            0.9999998807907104,
                            1.,
                            0.,
                            1.,
                            0.9999998807907104,
                          |]),
                          Uint16Array.make([|
                            0,
                            1,
                            2,
                            3,
                            2,
                            1,
                            4,
                            5,
                            6,
                            7,
                            6,
                            5,
                            8,
                            9,
                            10,
                            11,
                            10,
                            9,
                            12,
                            13,
                            14,
                            15,
                            14,
                            13,
                            16,
                            17,
                            18,
                            19,
                            18,
                            17,
                            20,
                            21,
                            22,
                            23,
                            22,
                            21,
                          |]),
                        );
            },
            state^,
          )
        );
        testPromise(
          "test gameObjects which has no cutomGeometry component", () =>
          AssembleWDSystemTool.testResult(
            ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
            ((state, sceneGameObject)) =>
              _getAllSortedTransforms(sceneGameObject, state)
              |> Js.Array.map(transform =>
                   TransformAPI.unsafeGetTransformGameObject(transform, state)
                 )
              |> Js.Array.map(gameObject =>
                   GameObjectAPI.hasGameObjectCustomGeometryComponent(
                     gameObject,
                     state,
                   )
                 )
              |>
              expect == [|false, false, true, false, true, true, true, true|],
            state^,
          )
        );
      });
      describe("contract check", () =>
        testPromise("shouldn't disposed before", () => {
          TestTool.openContractCheck();
          let (state, gameObject, geometry) =
            CustomGeometryTool.createGameObject(state^);
          let state = GameObjectTool.disposeGameObject(gameObject, state);

          ConvertGLTFTool.testResult(
            ConvertGLTFTool.buildGLTFJsonOfSingleNode(), data =>
            expect(() =>
              AssembleWDSystem.assemble(data, state)
            )
            |> toThrowMessage("expect not disposed before")
          );
        })
      );
    });

    describe("test basicCameraViews", () =>
      describe("test add basicCameraView components", () =>
        testPromise("test", () =>
          AssembleWDSystemTool.testResult(
            ConvertGLTFTool.buildGLTFJsonOfCamera(),
            ((state, sceneGameObject)) =>
              _getAllGameObjects(sceneGameObject, state)
              |> Js.Array.map(gameObject =>
                   GameObjectAPI.hasGameObjectBasicCameraViewComponent(
                     gameObject,
                     state,
                   )
                 )
              |> expect == [|true, true, false, true, true|],
            state^,
          )
        )
      )
    );

    describe("test perspectiveCameraProjections", () =>
      describe("test set data", () => {
        let _getAllPerspectiveCameraProjectionComponent =
            (sceneGameObject, state) =>
          _getAllGameObjects(sceneGameObject, state)
          |> Js.Array.filter(gameObject =>
               GameObjectAPI.hasGameObjectPerspectiveCameraProjectionComponent(
                 gameObject,
                 state,
               )
             )
          |> Js.Array.map(gameObject =>
               GameObjectAPI.unsafeGetGameObjectPerspectiveCameraProjectionComponent(
                 gameObject,
                 state,
               )
             );

        testPromise("test set near, fovy", () =>
          AssembleWDSystemTool.testResult(
            ConvertGLTFTool.buildGLTFJsonOfCamera(),
            ((state, sceneGameObject)) =>
              _getAllPerspectiveCameraProjectionComponent(
                sceneGameObject,
                state,
              )
              |> Js.Array.map(cameraProjection =>
                   (
                     PerspectiveCameraProjectionTool.unsafeGetNear(
                       cameraProjection,
                       state,
                     ),
                     PerspectiveCameraProjectionTool.unsafeGetFovy(
                       cameraProjection,
                       state,
                     ),
                   )
                 )
              |> expect == [|(2., 0.5), (1., 0.6), (1., 0.6), (2., 0.5)|],
            state^,
          )
        );

        describe("test set far", () => {
          let _buildGLTFJsonOfCamera = () =>
            ConvertGLTFTool.buildGLTFJson(
              ~nodes=
                {| [
        {
            "mesh": 0,
            "camera": 1,
            "children": [
                1
            ]
        },
        {
            "mesh": 0,
            "camera": 0
        }
    ]|},
              ~cameras=
                {|
[
        {
            "perspective": {
                "aspectRatio": 1.5,
                "yfov": 0.6,
                "znear": 1.0
            },
            "type": "perspective"
        },
        {
            "perspective": {
                "aspectRatio": 2.0,
                "yfov": 0.5,
                "zfar": 1000.0,
                "znear": 2.0
            },
            "type": "perspective"
        }
    ]
        |},
              (),
            );

          testPromise("if no far, set infinite", () =>
            AssembleWDSystemTool.testResult(
              _buildGLTFJsonOfCamera(),
              ((state, sceneGameObject)) =>
                _getAllPerspectiveCameraProjectionComponent(
                  sceneGameObject,
                  state,
                )
                |> Js.Array.map(cameraProjection =>
                     PerspectiveCameraProjectionTool.unsafeGetFar(
                       cameraProjection,
                       state,
                     )
                   )
                |> expect == [|1000., 100000.|],
              state^,
            )
          );
        });

        describe("test set aspect", () => {
          let _buildGLTFJsonOfCamera = () =>
            ConvertGLTFTool.buildGLTFJson(
              ~nodes=
                {| [
        {
            "mesh": 0,
            "camera": 1,
            "children": [
                1
            ]
        },
        {
            "mesh": 0,
            "camera": 0
        }
    ]|},
              ~cameras=
                {|
[
        {
            "perspective": {
                "yfov": 0.6,
                "znear": 1.0
            },
            "type": "perspective"
        },
        {
            "perspective": {
                "aspectRatio": 2.0,
                "yfov": 0.5,
                "zfar": 1000.0,
                "znear": 2.0
            },
            "type": "perspective"
        }
    ]
        |},
              (),
            );

          testPromise("if no aspect, set canvas.width/canvas.height", () => {
            let canvas = {"width": 100., "height": 200.} |> Obj.magic;
            let state = ViewTool.setCanvas(canvas, state^);

            AssembleWDSystemTool.testResult(
              _buildGLTFJsonOfCamera(),
              ((state, sceneGameObject)) =>
                _getAllPerspectiveCameraProjectionComponent(
                  sceneGameObject,
                  state,
                )
                |> Js.Array.map(cameraProjection =>
                     PerspectiveCameraProjectionTool.unsafeGetAspect(
                       cameraProjection,
                       state,
                     )
                   )
                |> expect == [|2., canvas##width /. canvas##height|],
              state,
            );
          });
        });
      })
    );
  });