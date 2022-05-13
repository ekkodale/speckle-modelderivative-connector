namespace Speckle.ModelDerivative.Connector.Api.Threejs
{
    public class Va3cObject
    {
        public string Uuid { get; set; }
        public string Name { get; set; }
        public string Type { get; set; } // Object3D
        public double[] matrix { get; set; } = new double[] { 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 };
        public List<Va3cObject> children { get; set; }
        public string Geometry { get; set; }
        public string Material { get; set; }
        public Dictionary<string, string> userData { get; set; }
    }
}
