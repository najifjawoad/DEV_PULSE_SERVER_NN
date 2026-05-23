
   import type { Request, Response } from "express";
import { issueService } from "./issue.service";
import sendResponse from "../../utility/sendResponse";

const createIssue = async (req: Request, res: Response) => {
  try {
    const payload = {
      ...req.body,
      reporter_id: req.user?.id,
    };

    const result = await issueService.createIssueIntoDB(payload);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue Created successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      data: error,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getAllIssuesFromDB(
      req.query as Record<string, string>
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issues retrieved successfully!",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Failed to retrieve issues",
      data: error,
    });
  }
};

const getSingleIssue = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await issueService.getSingleIssueFromDB(id as string);

    if (result.rows.length === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Issue Not found!",
        data: {},
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue retrieved successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      data: error,
    });
  }
};

const updateIssue = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = req.user;

    const issue = await issueService.getSingleIssueFromDB(id as string);

    if (issue.rows.length === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Issue not found",
        data: {},
      });
    }

    const existingIssue = issue.rows[0];

    // maintainer can update any issue
    if (user?.role !== "maintainer") {
      // contributor can update only own issue
      if (existingIssue.reporter_id !== user?.id) {
        return sendResponse(res, {
          statusCode: 403,
          success: false,
          message: "Forbidden Access",
          data: {},
        });
      }

      // contributor can update only open issue
      if (existingIssue.status !== "open") {
        return sendResponse(res, {
          statusCode: 403,
          success: false,
          message: "You can only update open issues",
          data: {},
        });
      }
    }

    const result = await issueService.updateIssueFromDB(
      req.body,
      id as string
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue updated successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      data: error,
    });
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (req.user?.role !== "maintainer") {
      return sendResponse(res, {
        statusCode: 403,
        success: false,
        message: "Only maintainer can delete issues",
        data: {},
      });
    }

    const result = await issueService.deleteIssueFromDB(id as string);

    if (result.rowCount === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Issue Not found!",
        data: {},
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue deleted successfully!",
      data: {},
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      data: error,
    });
  }
};

export const issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};