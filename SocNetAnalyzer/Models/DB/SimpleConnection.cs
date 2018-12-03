namespace SocNetAnalyzer.Models.DB
{
    public class SimpleConnection
    {
        public long Id { get; set; }

        public int DatasetId { get; set; }

        public Dataset Dataset { get; set; }
        public int Id1 { get; set; }
        public int Id2 { get; set; }
    }
}