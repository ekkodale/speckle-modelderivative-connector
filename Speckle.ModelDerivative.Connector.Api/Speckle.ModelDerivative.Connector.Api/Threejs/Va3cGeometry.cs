namespace Speckle.ModelDerivative.Connector.Api.Threejs
{
    public class Va3cGeometry
    {
        public string Uuid { get; set; } = "";
        public string Type { get; set; } = "Geometry";
        public Va3cGeometryData Data { get; set; } = new Va3cGeometryData();
    }
}
