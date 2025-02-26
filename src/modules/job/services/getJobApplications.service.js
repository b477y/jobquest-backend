import ApplicationModel from "../../../db/models/application.model.js";
import JobModel from "../../../db/models/job.model.js";
import asyncHandler from "../../../utils/response/error.response.js";
import successResponse from "../../../utils/response/success.response.js";
import paginate from "../../../utils/pagination/pagination.js";
import * as dbService from "../../../db/db.service.js";

export const getApplicationsForJob = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { jobId } = req.params;
  const { page, limit, sort, order } = req.query;

  const job = await dbService.findOne({
    model: JobModel,
    filter: {
      closed: false,
      _id: jobId,
      addedBy: userId,
    },
    populate: ["companyId"],
  });

  if (!job) {
    return next(new Error("Job not found.", { cause: 404 }));
  }

  const result = await paginate({
    page,
    limit,
    model: ApplicationModel,
    populate: [
      {
        path: "userId",
        select: "firstName lastName email mobileNumber",
      },
    ],
    filter: { jobId },
    sort: { [sort]: order === "asc" ? 1 : -1 },
  });

  return successResponse({
    res,
    status: 200,
    message: "Applications retrieved successfully",
    data: { applications: { ...result } },
  });
});
