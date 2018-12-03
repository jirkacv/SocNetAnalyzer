using System;
using System.ComponentModel.DataAnnotations.Schema;
using SocNetAnalyzer.Models.Enums;

namespace SocNetAnalyzer.Models.DB
{
    public class Dataset
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime DateCreated { get; set; } = DateTime.Now;

        public DatasetStatus Status { get; set; } = DatasetStatus.Created;
    }
}