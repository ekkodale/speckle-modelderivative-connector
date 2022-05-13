namespace Speckle.ModelDerivative.Connector.Api.Threejs
{
    public class Va3cGeometry
    {
        public string Uuid { get; set; }
        public string Type { get; set; } // "Geometry"
        public Va3cGeometryData Data { get; set; }
        public List<Va3cMaterial> Materials { get; set; }
    }
}
