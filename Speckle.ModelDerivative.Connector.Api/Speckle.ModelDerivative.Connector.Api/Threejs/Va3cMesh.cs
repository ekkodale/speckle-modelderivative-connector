namespace Speckle.ModelDerivative.Connector.Api.Threejs
{
    public class Va3cMesh
    {
        public string Uuid { get; set; } = "";
        public Va3cGeometry Geometry { get; set; } = new Va3cGeometry();

        public Va3cMaterial Material { get; set; } = new Va3cMaterial();
    }
}
