using System;
using System.Collections.Generic;
using SocNetAnalyzer.Models.DTOs;

namespace SocNetAnalyzer.Tests
{
    public class TestDataProvider
    {
        public static IEnumerable<object[]> TestCases()
        {
            yield return new object[]
            {
                new[]
                {
                    new Tuple<int, int>(0, 1)
                },
                new DatasetStatistics
                {
                    AverageFriendCount = 1,
                    UniqueUsers = 2
                }
            };

            yield return new object[]
            {
                new[]
                {
                    new Tuple<int, int>(0, 1),
                    new Tuple<int, int>(0, 2),
                    new Tuple<int, int>(0, 3),
                    new Tuple<int, int>(0, 4)
                },
                new DatasetStatistics
                {
                    AverageFriendCount = 1.6,
                    UniqueUsers = 5
                }
            };

            yield return new object[]
            {
                new[]
                {
                    new Tuple<int, int>(0, 1),
                    new Tuple<int, int>(2, 3),
                    new Tuple<int, int>(4, 5),
                    new Tuple<int, int>(6, 7),
                    new Tuple<int, int>(8, 9)
                },
                new DatasetStatistics
                {
                    UniqueUsers = 10,
                    AverageFriendCount = 1
                }
            };

            yield return new object[]
            {
                new[]
                {
                    new Tuple<int, int>(0, 1),
                    new Tuple<int, int>(1, 0),
                    new Tuple<int, int>(2, 3),
                    new Tuple<int, int>(4, 5),
                    new Tuple<int, int>(6, 7),
                    new Tuple<int, int>(8, 9)
                },
                new DatasetStatistics
                {
                    UniqueUsers = 10,
                    AverageFriendCount = 1
                }
            };

            yield return new object[]
            {
                new[]
                {
                    new Tuple<int, int>(0, 1),
                    new Tuple<int, int>(2, 3),
                    new Tuple<int, int>(4, 5),
                    new Tuple<int, int>(6, 7),
                    new Tuple<int, int>(8, 9),
                    new Tuple<int, int>(10, 11),


                    new Tuple<int, int>(0, 2),
                    new Tuple<int, int>(1, 3),
                    new Tuple<int, int>(4, 6),
                    new Tuple<int, int>(5, 7),
                    new Tuple<int, int>(8, 10),
                    new Tuple<int, int>(9, 11)
                },
                new DatasetStatistics
                {
                    AverageFriendCount = 2,
                    UniqueUsers = 12
                }
            };
        }
    }
}