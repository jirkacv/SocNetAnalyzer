namespace SocNetAnalyzer.Models.Configuration
{
    public class DbConfiguration
    {
        public string ConnectionString { get; set; }
        public int MaxBatchSize { get; set; } = 20000;
    }
}