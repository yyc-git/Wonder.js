describe("LODController", function() {
    var sandbox = null;
    var lod = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        lod = wd.LODController.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("integration test", function(){
        var director;
        var camera;

        beforeEach(function(){
            director = wd.Director.getInstance();

            camera = testTool.createCamera(wd.Vector3.create(0,0,0));

            director.scene.addChild(camera);
        });

        describe("select level geometry by range-base", function(){
            var model;
            var geo;
            var renderer;
            var geoLevel1,geoLevel2;

            function createLevelGeo(){
                var geoLevel1 = wd.SphereGeometry.create();

                var matLevel1 = wd.LightMaterial.create();

                geoLevel1.material = matLevel1;

                return geoLevel1;
            }

            function judgeSelectGeometry(callCount, geo){
                expect(renderer.render.getCall(callCount).args[1]).toEqual(geo);
            }

            function setCameraPos(pos){
                camera.transform.position = pos;
            }


            beforeEach(function(){
                model = prepareTool.createSphere();
                geo = model.getComponent(wd.Geometry);
                renderer = model.getComponent(wd.MeshRenderer);
                sandbox.stub(renderer, "render");

                geoLevel1 = createLevelGeo();

                geoLevel2 = createLevelGeo();

                lod.addGeometryLevel(15, geoLevel1);
                lod.addGeometryLevel(30, geoLevel2);

                model.addComponent(lod);


                director.scene.addChild(model);

                director._init();
            });

            it("defaultly, select object->geometry", function () {
                director._run(1);

                judgeSelectGeometry(0, geo);
            });
            it("if distance of camera->position to object->position >= level1 distance, use level1 geometry", function () {
                setCameraPos(wd.Vector3.create(15, 0, 0));

                director._run(1);

                judgeSelectGeometry(0, geoLevel1);
            });
            it("if distance of camera->position to object->position >= level2 distance, use level2 geometry", function () {
                setCameraPos(wd.Vector3.create(30, 0, 0));

                director._run(1);

                judgeSelectGeometry(0, geoLevel2);
            });
            it("if distance of camera->position to object->position < level1 distance, use object->geometry", function () {
                setCameraPos(wd.Vector3.create(10, 0, 0));

                director._run(1);

                judgeSelectGeometry(0, geo);
            });
            
            describe("test special case", function() {
                beforeEach(function () {
                });

                it("if distance of camera->position to object->position >= level2 distance happen multi times, it should always use level2 geometry", function () {
                    setCameraPos(wd.Vector3.create(30, 0, 0));

                    director._run(1);

                    judgeSelectGeometry(0, geoLevel2);


                    setCameraPos(wd.Vector3.create(30, 0, 0));

                    director._run(2);

                    judgeSelectGeometry(1, geoLevel2);
                });
            });
        });
    });

    describe("init", function(){
        beforeEach(function(){

        });

        it("", function(){

        });
    });

    describe("update", function(){
        beforeEach(function(){

        });

        it("", function(){

        });
    });
});

