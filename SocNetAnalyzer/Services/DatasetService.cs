using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SocNetAnalyzer.Models.DTOs;
using SocNetAnalyzer.Models.Enums;
using SocNetAnalyzer.Repositories;

namespace SocNetAnalyzer.Services
{
    public interface IDatasetService
    {
        Task<Dataset> CreateDataset(string name);

        Task ImportDataset(int datasetId, string connectionsText);
        Task ImportDataset(int datasetId, IEnumerable<Tuple<int, int>> connections);

        DatasetStatistics GetDatasetStatistics(int datasetId);

        DatasetConnections GetDatasetConnections(int datasetId);

        Task DeleteDataset(int datasetId);

        IList<Dataset> GetDatasets();
    }

    public class DatasetService : IDatasetService
    {
        private readonly IDatasetRepository datasetRepository;

        public DatasetService(IDatasetRepository datasetRepository)
        {
            this.datasetRepository = datasetRepository;
        }

        public async Task<Dataset> CreateDataset(string name)
        {
            var result = await this.datasetRepository.CreateDataset(name);
            return this.MapDbDatasetToDto(result);
        }

        public async Task ImportDataset(int datasetId, string connectionsText)
        {
            var connections = this.GetConnectionsFromText(connectionsText);
            await this.ImportDataset(datasetId, connections);
        }

        public async Task ImportDataset(int datasetId, IEnumerable<Tuple<int, int>> connections)
        {
            await this.datasetRepository.ImportDataset(datasetId, connections);
            await this.datasetRepository.UpdateDatasetStatus(datasetId, DatasetStatus.Imported);
        }

        public DatasetStatistics GetDatasetStatistics(int datasetId)
        {
            return new DatasetStatistics
            {
                AverageFriendCount = this.datasetRepository.GetAverageFriendCountInDataset(datasetId),
                UniqueUsers = this.datasetRepository.GetUniqueUserCountInDataset(datasetId),
                SampleSize = this.datasetRepository.GetDatasetConnectionCount(datasetId),
            };
        }

        public DatasetConnections GetDatasetConnections(int datasetId)
        {
            return new DatasetConnections
            {
                Ids = this.datasetRepository.GetUniqueUsersInDataset(datasetId),
                Links = this.datasetRepository.GetConnections(datasetId)
            };
        }

        public async Task DeleteDataset(int datasetId)
        {
            await this.datasetRepository.DeleteDataset(datasetId);
        }

        public IList<Dataset> GetDatasets()
        {
            return this.datasetRepository.GetDatasets()
                .Select(this.MapDbDatasetToDto)
                .ToList();
        }

        private Dataset MapDbDatasetToDto(Models.DB.Dataset d)
        {
            return new Dataset
            {
                DateCreated = d.DateCreated,
                Id = d.Id,
                Name = d.Name,
                Status = d.Status
            };
        }

        private Tuple<int, int> MapRow(string connection)
        {
            var ids = connection.Split();

            if (ids.Length != 2)
            {
                throw new Exception("Invalid row format");
            }

            try
            {
                return new Tuple<int, int>(Convert.ToInt32(ids[0]), Convert.ToInt32(ids[1]));
            }
            catch (Exception e)
            {
                throw new Exception("Invalid row format", e);
            }
        }

        private IEnumerable<Tuple<int, int>> GetConnectionsFromText(string connectionsText)
        {
            return connectionsText.Trim().Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None).Select(this.MapRow);
        }
    }
}