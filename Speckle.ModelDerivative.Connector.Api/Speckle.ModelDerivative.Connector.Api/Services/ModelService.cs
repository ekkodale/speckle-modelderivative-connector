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
                List <Objects.Geometry.Mesh> displayValues  = new List<Objects.Geometry.Mesh> ();
                List<RenderMaterial> renderMaterials = new List<Objects.Other.RenderMaterial> ();
                foreach (var child in obj.Children)
                {
                    Objects.Geometry.Mesh displayValue = new();

                    displayValue.faces = child.Geometry.Data.Faces;
                    displayValue.vertices = child.Geometry.Data.Vertices;
                    displayValue.colors = child.Geometry.Data.Colors;

                    displayValues.Add(displayValue);
                    


                    RenderMaterial renderMaterial = new();
                    renderMaterial.emissive = child.Material.Emissive;
                    renderMaterial.diffuse = child.Material.Color;
                    renderMaterial.opacity = child.Material.Opacity;
                    renderMaterial.metalness = child.Material.Shininess;

                    renderMaterials.Add(renderMaterial);

                }
                speckleObj["displayValue"] = displayValues;
                speckleObj["renderMaterial"] = renderMaterials;

                speckleObj.applicationId = obj.Uuid;

                speckleObj["parameters"] = obj.UserData;

                speckleObjects.Add(speckleObj);
            }

            rootObject["@data"] = speckleObjects;

           

            return rootObject;
        }
    }
}
