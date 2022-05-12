using Speckle.Core.Models;

namespace Speckle.ModelDerivative.Connector.Api.Services
{
    /// <summary>
    /// Model conversion service which convert ThreeJS models to speckle objects
    /// </summary>
    public interface IModelService
    {
        /// <summary>
        /// Converts given ThreeJS objects to speckle objects
        /// </summary>
        /// <returns></returns>
        Task<Base> ConvertToSpeckle();
    }
}
