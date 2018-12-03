using System;
using System.Runtime.Serialization;

namespace SocNetAnalyzer.Models.Exceptions
{
    public class DatasetNotFoundException : Exception
    {
        public DatasetNotFoundException()
        {
        }

        public DatasetNotFoundException(string message) : base(message)
        {
        }

        public DatasetNotFoundException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected DatasetNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}