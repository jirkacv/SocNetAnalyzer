using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using SocNetAnalyzer.Models.Configuration;
using SocNetAnalyzer.Models.DB;
using SocNetAnalyzer.Models.DTOs;
using SocNetAnalyzer.Models.Enums;
using SocNetAnalyzer.Repositories;
using SocNetAnalyzer.Services;
using Xunit;

namespace SocNetAnalyzer.Tests
{
    public class DatasetTests : IDisposable
    {
        private readonly DatasetService datasetService;
        private readonly SocNetContext db;

        public DatasetTests()
        {
            var dbOptions = new DbContextOptionsBuilder<SocNetContext>().UseSqlite("Data Source=tests.db").Options;
            this.db = new SocNetContext(dbOptions);
            this.db.Database.EnsureCreated();

            var repository = new DatasetRepository(this.db, new DbConfiguration());

            this.datasetService = new DatasetService(repository);
        }

        public void Dispose()
        {
            this.db.Database.EnsureDeleted();
            this.db.Dispose();
        }


        [Theory]
        [MemberData(nameof(TestDataProvider.TestCases), MemberType = typeof(TestDataProvider))]
        public async void IntegrationTest(IEnumerable<Tuple<int, int>> data, DatasetStatistics expectedStatistics)
        {
            var datasets = this.datasetService.GetDatasets();
            Assert.False(EnumerableExtensions.Any(datasets), "There should be no dataset when starting");

            var datasetId = (await this.datasetService.CreateDataset("Test")).Id;
            datasets = this.datasetService.GetDatasets();
            Assert.Equal(1, datasets.Count);
            var dataset = datasets.SingleOrDefault(d => d.Id == datasetId);
            Assert.NotNull(dataset);
            Assert.Equal(DatasetStatus.Created, dataset.Status);

            await this.datasetService.ImportDataset(datasetId, data);
            datasets = this.datasetService.GetDatasets();
            Assert.Equal(1, datasets.Count);
            dataset = datasets.SingleOrDefault(d => d.Id == datasetId);
            Assert.NotNull(dataset);
            Assert.Equal(DatasetStatus.Imported, dataset.Status);

            var stats = this.datasetService.GetDatasetStatistics(datasetId);
            Assert.Equal(expectedStatistics.AverageFriendCount, stats.AverageFriendCount);
            Assert.Equal(expectedStatistics.UniqueUsers, stats.UniqueUsers);

            await this.datasetService.DeleteDataset(datasetId);
            datasets = this.datasetService.GetDatasets();
            Assert.False(EnumerableExtensions.Any(datasets),
                "There should be no dataset after we deleted ours");
        }
    }
}