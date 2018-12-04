using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocNetAnalyzer.Models.DTOs;
using SocNetAnalyzer.Models.Requests;
using SocNetAnalyzer.Services;

namespace SocNetAnalyzer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatasetController : ControllerBase
    {
        private readonly IDatasetService datasetService;

        public DatasetController(IDatasetService datasetService)
        {
            this.datasetService = datasetService;
        }

        [HttpGet("list")]
        public IList<Dataset> GetDatasets()
        {
            return this.datasetService.GetDatasets();
        }

        [HttpGet("connections")]
        public DatasetConnections GetDatasetConnections(int datasetId)
        {
            return this.datasetService.GetDatasetConnections(datasetId);
        }

        [HttpDelete("delete")]
        public async Task Delete(int datasetId)
        {
            await this.datasetService.DeleteDataset(datasetId);
        }

        [HttpPost("create")]
        public async Task<Dataset> CreateDataset([FromBody] CreateDataset request)
        {
            return await this.datasetService.CreateDataset(request.Name);
        }

        [HttpPost("import")]
        public async Task<IActionResult> Post(IFormFile formFile, [FromForm] int datasetId)
        {
            if (formFile.Length == 0)
            {
                return this.BadRequest("File cannot be empty");
            }

            using (var s = new StreamReader(formFile.OpenReadStream()))
            {
                var text = await s.ReadToEndAsync();
                await this.datasetService.ImportDataset(datasetId, text);
            }

            return this.Ok();
        }

        [HttpGet("statistics")]
        public DatasetStatistics GetStatistics(int datasetId)
        {
            return this.datasetService.GetDatasetStatistics(datasetId);
        }
    }
}