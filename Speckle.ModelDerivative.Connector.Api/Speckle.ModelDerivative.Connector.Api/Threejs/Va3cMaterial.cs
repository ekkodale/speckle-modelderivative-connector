namespace Speckle.ModelDerivative.Connector.Api.Threejs
{
 
        /// <summary>
        /// Based on MeshPhongMaterial obtained by 
        /// exporting a cube from the three.js editor.
        /// </summary>
        public class Va3cMaterial
        {
        public string Uuid { get; set; } = "";
        public string Name { get; set; } = "";
        public string Type { get; set; } = "MeshPhongMaterial";
        public int Color { get; set; } = 16777215;
        public int Ambient { get; set; } = 16777215;
        public int Emissive { get; set; } = 0;
        public int Specular { get; set; } = 1155126;
        public int Shininess { get; set; } = 30;
        public double Opacity { get; set; } = 1;
        public bool Transparent { get; set; } = false;
        public bool Wireframe { get; set; } = false;
        }
    }

