namespace Speckle.ModelDerivative.Connector.Api.Threejs
{
 
        /// <summary>
        /// Based on MeshPhongMaterial obtained by 
        /// exporting a cube from the three.js editor.
        /// </summary>
        public class Va3cMaterial
        {
            public string uuid { get; set; }
            public string name { get; set; }
            public string type { get; set; } // MeshPhongMaterial
            public int color { get; set; } // 16777215
            public int ambient { get; set; } //16777215
            public int emissive { get; set; } // 1
            public int specular { get; set; } //1118481
            public int shininess { get; set; } // 30
            public double opacity { get; set; } // 1
            public bool transparent { get; set; } // false
            public bool wireframe { get; set; } // false
        }
    }

