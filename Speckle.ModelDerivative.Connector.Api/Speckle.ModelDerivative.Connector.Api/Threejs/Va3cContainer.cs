namespace Speckle.ModelDerivative.Connector.Api.Threejs
{
    /// <summary>
    /// three.js object class, successor of Va3cScene.
    /// The structure and properties defined here were
    /// reverse engineered from JSON files exported 
    /// by the three.js and vA3C editors.
    /// </summary>
    public class Va3cContainer
    {

        public Metadata metadata { get; set; }

        public Va3cObject @object { get; set; } 
  
        public List<Va3cGeometry> geometries;

        public List<Va3cMaterial> materials;
    }
}
