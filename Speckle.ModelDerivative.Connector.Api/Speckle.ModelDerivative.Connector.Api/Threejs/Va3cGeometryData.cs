namespace Speckle.ModelDerivative.Connector.Api.Threejs
{
    public class Va3cGeometryData
    {
        public List<double> Vertices { get; set; } = new List<double>(); // millimetres

        public List<int> Colors { get; set; } = new List<int>();

        public List<int> Faces { get; set; } = new List<int>(); // indices into Vertices + Materials

    }

}
