using System;
using SocNetAnalyzer.Models.Enums;

namespace SocNetAnalyzer.Models.DTOs
{
    public class Dataset
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime DateCreated { get; set; }

        public DatasetStatus Status { get; set; }
    }
}