using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SocNetAnalyzer.Models.Configuration;
using SocNetAnalyzer.Models.DB;
using SocNetAnalyzer.Models.Enums;
using SocNetAnalyzer.Models.Exceptions;

namespace SocNetAnalyzer.Repositories
{
    public interface IDatasetRepository
    {
        Task<Dataset> CreateDataset(string name);
        Task ImportDataset(int datasetId, IEnumerable<Tuple<int, int>> connections);

        int GetUniqueUsersInDataset(int datasetId);
        double GetAverageFriendCountInDataset(int datasetId);
        int GetDatasetConnectionCount(int datasetId);

        Task DeleteDataset(int datasetId);

        Task UpdateDatasetStatus(int datasetId, DatasetStatus status);

        IList<Dataset> GetDatasets();
    }

    public class DatasetRepository : IDatasetRepository
    {
        private readonly SocNetContext db;
        private readonly DbConfiguration dbConfig;

        public DatasetRepository(SocNetContext socNetContext, DbConfiguration dbConfig)
        {
            this.db = socNetContext;
            this.dbConfig = dbConfig;
        }

        public async Task<Dataset> CreateDataset(string name)
        {
            var dataset = await this.db.Datasets.AddAsync(new Dataset {Name = name});
            await this.db.SaveChangesAsync();

            return dataset.Entity;
        }


        public async Task ImportDataset(int datasetId, IEnumerable<Tuple<int, int>> connections)
        {
            using (var transaction = this.db.Database.BeginTransaction())
            {
                this.db.ChangeTracker.AutoDetectChangesEnabled = false;
                try
                {
                    var count = 0;

                    foreach (var con in connections)
                    {
                        await this.db.SimpleConnections.AddAsync(new SimpleConnection
                            {DatasetId = datasetId, Id1 = con.Item1, Id2 = con.Item2});
                        count++;

                        if (count == this.dbConfig.MaxBatchSize - 1)
                        {
                            await this.db.SaveChangesAsync();
                            count = 0;
                        }
                    }

                    await this.db.SaveChangesAsync();

                    transaction.Commit();
                }
                catch
                {
                    transaction.Rollback();
                    await this.UpdateDatasetStatus(datasetId, DatasetStatus.Error);
                }
                finally
                {
                    this.db.ChangeTracker.AutoDetectChangesEnabled = true;
                }
            }
        }

        public int GetUniqueUsersInDataset(int datasetId)
        {
            var datasetData = this.GetDatasetData(datasetId);

            return datasetData.Select(d => d.Id1).Union(datasetData.Select(d => d.Id2)).Distinct().Count();
        }

        public double GetAverageFriendCountInDataset(int datasetId)
        {
            var datasetData = this.GetDatasetData(datasetId);

            // group by still doesn't work properly in Core, so I have to materialize it here and do it locally
            var fullConnections = datasetData.Select(d => Tuple.Create(d.Id1, d.Id2))
                .Union(datasetData.Select(d => Tuple.Create(d.Id2, d.Id1))).ToList();
            var grouped = fullConnections.GroupBy(f => f.Item1);
            
            var result = grouped.Select(g => new {Id = g.Key, Count = g.Count()})
                .Average(c => c.Count);

            return result;
        }

        public int GetDatasetConnectionCount(int datasetId)
        {
            return this.GetDatasetData(datasetId).Count();
        }

        public async Task DeleteDataset(int datasetId)
        {
            await this.UpdateDatasetStatus(datasetId, DatasetStatus.Deleting);

            var connections = this.db.SimpleConnections.Where(s => s.DatasetId == datasetId);
            using (var transaction = this.db.Database.BeginTransaction())
            {
                this.db.ChangeTracker.AutoDetectChangesEnabled = false;
                try
                {
                    var count = 0;

                    foreach (var con in connections)
                    {
                        this.db.SimpleConnections.Remove(con);
                        count++;

                        if (count == this.dbConfig.MaxBatchSize - 1)
                        {
                            await this.db.SaveChangesAsync();
                            count = 0;
                        }
                    }
                    
                    this.db.Datasets.Remove(this.db.Datasets.Find(datasetId));
                    await this.db.SaveChangesAsync();

                    transaction.Commit();
                }
                catch
                {
                    transaction.Rollback();
                }
                finally
                {
                    this.db.ChangeTracker.AutoDetectChangesEnabled = true;
                }
            }
        }

        public async Task UpdateDatasetStatus(int datasetId, DatasetStatus status)
        {
            this.db.Datasets.Find(datasetId).Status = status;
            await this.db.SaveChangesAsync();
        }

        public IList<Dataset> GetDatasets()
        {
            return this.db.Datasets.ToList();
        }

        private IQueryable<SimpleConnection> GetDatasetData(int datasetId)
        {
            var datasetData = this.db.SimpleConnections.Where(s => s.DatasetId == datasetId);

            if (!datasetData.Any())
            {
                throw new DatasetNotFoundException();
            }

            return datasetData;
        }
    }
}