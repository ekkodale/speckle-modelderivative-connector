namespace Speckle.ModelDerivative.Connector.Api.Threejs
{
    public class Va3cGeometryData
    {
        public List<double> Vertices { get; set; } // millimetres
                                                  
        public List<double> Normals { get; set; }

        public List<int> Colors { get; set; }

        public List<double> Uvs { get; set; }
        public List<int> Faces { get; set; } // indices into Vertices + Materials
        public double Scale { get; set; }
        public bool Visible { get; set; }
        public bool CastShadow { get; set; }
        public bool ReceiveShadow { get; set; }
        public bool DoubleSided { get; set; }
    }

}
