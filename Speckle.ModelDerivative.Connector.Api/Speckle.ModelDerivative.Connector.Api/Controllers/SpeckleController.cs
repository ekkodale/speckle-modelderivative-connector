using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Speckle.Core.Api;
using Speckle.Core.Transports;
using Speckle.Core.Models;
using Speckle.ModelDerivative.Connector.Api.Services;
using Speckle.ModelDerivative.Connector.Api.Threejs;

namespace Speckle.ModelDerivative.Connector.Api.Controllers
{
    /// <summary>
    /// REST API Controller for the commands and queries for the class entity
    /// </summary>
    [Route("[controller]")]
    public class SpeckleController : ControllerBase
    {
        private readonly Client _speckleClient;
        private readonly IModelService _modelService;
        /// <summary>
        /// Initializes REST API Controller for the commands and queries for the class entity
        /// </summary>
        public SpeckleController(Client speckleClient, IModelService modelService)
        {
            _speckleClient = speckleClient;
            _modelService = modelService;
        }

        /// <summary>
        /// Get speckle streams available
        /// </summary>
        [HttpGet("streams")]
        [ProducesResponseType(typeof(List<Core.Api.Stream>), 200)]
        [SwaggerOperation(OperationId = "GetStreams", Tags = new[] { "Stream" })]
        public async Task<IActionResult> GetStreams()
        {
            var streamsList = await _speckleClient.StreamsGet(20);

            if(streamsList == null)
            {
                return NotFound();
            }

            return Ok(streamsList);
        }


        /// <summary>
        /// Commits speckle objects
        /// </summary>
        [HttpPost("commits")]
        [ProducesResponseType(typeof(OkResult), 200)]
        [ProducesResponseType(typeof(BadRequestResult), 400)]
        [ProducesResponseType(typeof(NotFoundResult), 404)]
        [SwaggerOperation(OperationId = "CommitObjects", Tags = new[] { "Commit" })]
        public async Task<IActionResult> CommitObjects(string streamId, [FromBody] List<Va3cObject> va3cObjects)
        {
            if (string.IsNullOrEmpty(streamId))
            {
                return BadRequest();
            }

            var serverTransport = new ServerTransport(_speckleClient.Account, streamId);

            var commitObject = await _modelService.ConvertToSpeckle(va3cObjects);

            //=============================================================================
            string objectId = await Operations.Send(commitObject, new List<ITransport>() { serverTransport }, false);

            var commitCreateInput = new CommitCreateInput
            {
                streamId = streamId,
                branchName = "main",
                objectId = objectId,
                message = "Model sent",
                sourceApplication = "Forge",
                totalChildrenCount = va3cObjects.Count
            };

            string commitId = await _speckleClient.CommitCreate(commitCreateInput);

            if (commitId == null)
                return BadRequest();

            return Ok(commitId);
        }
    }
}
