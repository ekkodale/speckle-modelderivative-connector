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

                    
                    RenderMaterial renderMaterial = new();
                    renderMaterial.emissive = child.Material.Emissive;
                    renderMaterial.diffuse = child.Material.Color;
                    renderMaterial.opacity = child.Material.Opacity;
                    renderMaterial.metalness = child.Material.Shininess;

                    displayValue["@renderMaterial"] = renderMaterial;

                    displayValues.Add(displayValue);
       

                }
                speckleObj["@displayValue"] = displayValues;

                speckleObj.applicationId = obj.Uuid;
                speckleObj.id = obj.Uuid;

                //speckleObj["@parameters"] = obj.UserData;

                speckleObjects.Add(speckleObj);
            }

            rootObject["@data"] = speckleObjects;

            rootObject.totalChildrenCount = speckleObjects.Count;

            rootObject.applicationId = "abcd";
            rootObject.id = "abcdefg";

            return rootObject;
        }
    }
}
