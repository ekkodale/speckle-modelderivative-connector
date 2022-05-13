namespace Speckle.ModelDerivative.Connector.Api.Threejs
{
    public class Va3cObject
    {
        public string Uuid { get; set; } // ExternalId
        public double[] Matrix { get; set; } = new double[] { 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 };
        public List<Va3cMesh> Children { get; set; } // Fragments
        public Dictionary<string, string> UserData { get; set; } // Properties von DB
    }
}
