using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Speckle.Core.Api;

namespace Speckle.ModelDerivative.Connector.Api.Controllers
{
    /// <summary>
    /// REST API Controller for the commands and queries for the class entity
    /// </summary>
    [Route("[controller]")]
    public class SpeckleController : ControllerBase
    {
        private readonly Client _speckleClient;
        /// <summary>
        /// Initializes REST API Controller for the commands and queries for the class entity
        /// </summary>
        public SpeckleController(Client speckleClient)
        {
            _speckleClient = speckleClient;  
        }

        /// <summary>
        /// Get speckle streams available
        /// </summary>
        [HttpGet("streams")]
        [ProducesResponseType(typeof(List<Core.Api.Stream>), 200)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        [ProducesResponseType(typeof(NotFoundResult), 404)]
        [SwaggerOperation(OperationId = "GetStreams", Tags = new[] { "Stream" })]
        public async Task<IActionResult> GetStreams()
        {
            var streamsList = await _speckleClient.StreamsGet(20);

            if (streamsList == null)
                return NotFound();

            return Ok(streamsList);
        }


        /// <summary>
        /// Commits speckle objects
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(OkResult), 200)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        [ProducesResponseType(typeof(NotFoundResult), 404)]
        [ProducesResponseType(typeof(UnauthorizedResult), 401)]
        [SwaggerOperation(OperationId = "CommitObjects", Tags = new[] { "Commit" })]
        public async Task<IActionResult> CommitObjects()
        {
            return Ok();
        }
    }
}
