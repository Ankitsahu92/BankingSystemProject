using BankingSystem.Entity.Context;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankingSystem.Entity.Helpers
{
    public static class SqlHelpers
    {
        public static DataSet ExecuteProcedure(this BankingSystemContext db, string SpName, List<SqlParameter> param)
        {
            DataSet ds = new();
            using (SqlConnection con = new(db.Database.GetConnectionString()))
            {
                using SqlCommand cmd = new(SpName, con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddRange(param.ToArray());
                SqlDataAdapter da = new(cmd);
                da.Fill(ds);
            }
            return ds;
        }
        public static DataSet ExecuteProcedure(this BankingSystemContext db, string SpName, SqlParameter[] param)
        {
            DataSet ds = new();
            using (SqlConnection con = new(db.Database.GetConnectionString()))
            {
                using SqlCommand cmd = new(SpName, con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddRange(param);
                SqlDataAdapter da = new(cmd);
                da.Fill(ds);
            }
            return ds;
        }
    }
}
