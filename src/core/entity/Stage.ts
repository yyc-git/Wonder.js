/// <reference path="../../definitions.d.ts"/>
module dy {
    export class Stage extends GameObject{
        public static create() {
            var obj = new this();

            return obj;
        }

        get ambientLight():GameObject {
            return this._lightManager.ambientLight;
        }

        get directionLights(): dyCb.Collection<GameObject>{
            return this._lightManager.directionLights;
        }

        get pointLights(): dyCb.Collection<GameObject>{
            return this._lightManager.pointLights;
        }

        public camera:GameObject = null;
        //public lights:dyCb.Hash<any> = dyCb.Hash.create<any>();

        private _lightManager:LightManager = LightManager.create();

        public init(){
            this.addComponent(TopCollider.create());

            super.init();
        }

        public addChild(child:GameObject):GameObject{
            if(this._isCamera(child)){
                this.camera = child;
            }
            else if(this._isLight(child)){
                this._lightManager.addChild(child);
            }

            return super.addChild(child);
        }

        public render(renderer:Renderer) {
            dyCb.Log.error(!this.camera, "stage must add camera");

            super.render(renderer, this.camera);
        }

        private _isCamera(child:GameObject){
            return child.hasComponent(Camera);
        }

        private _isLight(child:GameObject){
            return child.hasComponent(Light);
        }
    }
}
