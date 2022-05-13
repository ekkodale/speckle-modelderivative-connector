using Speckle.Core.Models;
using Speckle.ModelDerivative.Connector.Api.Threejs;
using Objects;
using Objects.Other;

namespace Speckle.ModelDerivative.Connector.Api.Services
{
    public class ModelService : IModelService
    {
        public async Task<Base> ConvertToSpeckle(List<Va3cObject> threeObjects)
        {
            Base rootObject = new ();
            List<Base> speckleObjects = new List<Base>();
            foreach(var obj in threeObjects)
            {
                Base speckleObj =  new ();
                
                Objects.Geometry.Mesh displayValue = new ();

                displayValue.faces = obj.Geometry.Data.Faces;
                displayValue.vertices = obj.Geometry.Data.Vertices;
                displayValue.colors = obj.Geometry.Data.Colors;
                
                speckleObj["displayValue"] = displayValue;


                RenderMaterial renderMaterial = new ();
                renderMaterial.emissive = obj.Material.emissive;
                renderMaterial.diffuse = obj.Material.color;
                renderMaterial.opacity = obj.Material.opacity;
                renderMaterial.metalness = obj.Material.shininess;
                
                speckleObj["renderMaterial"] = renderMaterial;

                speckleObj.applicationId = obj.Uuid;

                speckleObj["parameters"] = new Dictionary<string, string>();

                speckleObjects.Add(speckleObj);
            }

            rootObject["@data"] = speckleObjects;

           

            return rootObject;
        }
    }
}
