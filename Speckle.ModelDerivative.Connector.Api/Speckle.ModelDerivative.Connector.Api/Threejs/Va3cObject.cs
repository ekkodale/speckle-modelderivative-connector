namespace Speckle.ModelDerivative.Connector.Api.Threejs
{
    public class Va3cObject
    {
        public string Uuid { get; set; } = "";
        public double[] Matrix { get; set; } = new double[] { 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 };
        public List<Va3cMesh> Children { get; set; } = new List<Va3cMesh>();

        public List<Va3cProperty> UserData { get; set; } = new List<Va3cProperty>(); // Properties von DB
    }
}
