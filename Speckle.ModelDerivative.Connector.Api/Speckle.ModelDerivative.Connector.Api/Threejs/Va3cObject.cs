namespace Speckle.ModelDerivative.Connector.Api.Threejs
{
    public class Va3cObject
    {
        public string Uuid { get; set; } // ExternalId
        public string Name { get; set; }
        public string Type { get; set; } // Object3D
        public double[] Matrix { get; set; } = new double[] { 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 };
        public List<Va3cObject> Children { get; set; } // Fragments
        public Va3cGeometry Geometry { get; set; } 
        public Va3cMaterial Material { get; set; }
        public Dictionary<string, string> UserData { get; set; } // Properties von DB
    }
}
