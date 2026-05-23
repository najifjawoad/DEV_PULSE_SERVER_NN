export interface IIssue {
    title : string;
    description: string;
    type: string;
      
}

export interface IssueQuery {
  sort?: string;
  type?: string;
  status?: string;
  role?:string;
}



