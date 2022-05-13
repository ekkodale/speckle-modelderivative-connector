import {
  Client,
  OkResult,
  Va3cGeometry,
  Va3cGeometryData,
  Va3cMaterial,
  Va3cObject,
} from "../api/client";
import Config from "../Config";
import { MeshExtensionHelper } from "./MeshExtensionHelper";

export class MeshExtension extends Autodesk.Viewing.Extension {
  constructor(viewer: any, options: any) {
    super(viewer, options);
    Autodesk.Viewing.Extension.call(this, viewer, options);
    const s1 = MeshExtensionHelper.getInstance();
    s1.addExtension(this);
  }

  load(): boolean {
    console.log("ModelUrnExtension loaded!");
    return true;
  }

  unload(): boolean {
    return true;
  }

  commitFunc(streamID: string) {
    const client: Client = new Client(Config.BaseURL);
    const models: Autodesk.Viewing.Model[] = this.viewer.getAllModels();
    const model: Autodesk.Viewing.Model = models[0];
    let instanceTree = model.getData().instanceTree;
    let fragIds: Array<any> = [];
    let va3cObjectList: Va3cObject[] = [];

    instanceTree.fragList.fragments.fragId2dbId.forEach((dbId: number) => {
      instanceTree.enumNodeFragments(dbId, function (fragId: any) {
        fragIds.push(fragId);
      });
    });

    fragIds.forEach((fragId: number) => {
      let renderProxy = this.viewer.impl.getRenderProxy(model, fragId);
      let renderProxyGeometry = renderProxy.geometry;
      let renderProxyMaterial = renderProxy.material;
      let renderProxyMatrix = renderProxy.matrix;

      // Init Vac3Object
      let vac3Object: Va3cObject = new Va3cObject();

      vac3Object.geometry = new Va3cGeometry();
      vac3Object.geometry.data = new Va3cGeometryData();

      vac3Object.material = new Va3cMaterial();

      vac3Object.matrix = [];

      // Assign geometry
      vac3Object.geometry.data.faces = renderProxyGeometry.ib;
      vac3Object.geometry.data.vertices = renderProxyGeometry.vb;

      // Assign material
      vac3Object.material.uuid = renderProxyMaterial.uuid;
      vac3Object.material.name = renderProxyMaterial.name;
      vac3Object.material.type = renderProxyMaterial.type;
      vac3Object.material.color = renderProxyMaterial.color;
      vac3Object.material.ambient = renderProxyMaterial.ambient;
      vac3Object.material.emissive = renderProxyMaterial.emissive;
      vac3Object.material.specular = renderProxyMaterial.specular;
      vac3Object.material.shininess = renderProxyMaterial.shininess;
      vac3Object.material.opacity = renderProxyMaterial.opacity;
      vac3Object.material.transparent = renderProxyMaterial.transparent;
      vac3Object.material.wireframe = renderProxyMaterial.wireframe;

      // Assign matrix
      vac3Object.matrix = renderProxyMatrix;

      va3cObjectList.push(vac3Object);
    });

    console.log("START COMMIT");
    console.log(va3cObjectList);

    client
      .commits(streamID, va3cObjectList)
      .then((response: OkResult) => {
        console.log("Commited successfully!");
        console.log(response);
      })
      .catch((error: any) => {
        console.log("Something went wrong with the commit: " + error);
      });
  }
}
