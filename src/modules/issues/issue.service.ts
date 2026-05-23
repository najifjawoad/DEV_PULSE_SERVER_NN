import { pool } from "../../db";
import type { IIssue, IssueQuery } from "./issue.interface";


const createIssueIntoDB = async(payload: IIssue & { reporter_id: number }) =>{
    const {title,description,type,reporter_id} = payload;

     const result = await pool.query(
    `
     INSERT INTO issues(title,description,type,reporter_id)
     VALUES($1,$2,$3,$4)
     RETURNING *
    `,
    [title,description,type,reporter_id],
  );

  return result;
}



const getAllIssuesFromDB = async (query: IssueQuery) => {
  const { sort = "newest", type, status } = query;

  let sql = `
    SELECT 
      issues.id,
      issues.title,
      issues.description,
      issues.type,
      issues.status,
      issues.created_at,
      issues.updated_at,

      json_build_object(
        'id', users.id,
        'name', users.name,
        'role', users.role
      ) AS reporter

    FROM issues
    JOIN users ON issues.reporter_id = users.id
  `;

  const conditions: string[] = [];
  const values: any[] = [];

  if (type) {
    values.push(type);
    conditions.push(`issues.type = $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`issues.status = $${values.length}`);
  }

  if (conditions.length > 0) {
    sql += ` WHERE ` + conditions.join(" AND ");
  }

  sql +=
    sort === "oldest"
      ? ` ORDER BY issues.created_at ASC`
      : ` ORDER BY issues.created_at DESC`;

  const result = await pool.query(sql, values);

  return result.rows;
};


const getSingleIssueFromDB = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM issues WHERE id=$1  
        `,
    [id],
  );
  return result;
};

const updateIssueFromDB = async(payload:IIssue,id:string)=>{
  const {title,description,type} = payload;
  
  
  const result = await pool.query(`
     UPDATE issues
    SET 
    title=COALESCE($1,title),
    description=COALESCE($2,description),
    type=COALESCE($3,type)

    WHERE id = $4 RETURNING *
    `,[title,description,type,id])
    return result;
}



const deleteIssueFromDB = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM issues WHERE id=$1  
      `,
    [id],
  );
  return result;
};


export const issueService = {
    createIssueIntoDB,
    getAllIssuesFromDB,
    getSingleIssueFromDB,
    updateIssueFromDB,
    deleteIssueFromDB,
}
