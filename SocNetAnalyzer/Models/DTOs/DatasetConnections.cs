using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetAnalyzer.Models.DTOs
{
    public class DatasetConnections
    {
        public List<int> Ids { get; set; }
        public List<Tuple<int, int>> Links { get; set; }
    }
}
