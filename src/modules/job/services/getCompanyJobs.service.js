import asyncHandler from "../../../utils/response/error.response.js";
import successResponse from "../../../utils/response/success.response.js";
import JobModel from "../../../db/models/job.model.js";
import CompanyModel from "../../../db/models/company.model.js";
import paginate from "../../../utils/pagination/pagination.js";

const getCompanyJobs = asyncHandler(async (req, res, next) => {
  const { companyId, jobId } = req.params;
  const { name, page, limit, sort, order } = req.query;

  let filter = { closed: false };

  if (companyId) {
    filter.companyId = companyId;
  }

  if (name) {
    const company = await CompanyModel.findOne({
      companyName: { $regex: name, $options: "i" },
    });

    if (!company) {
      return next(new Error("Company not found", { cause: 404 }));
    }

    filter.companyId = company._id;
  }

  if (jobId) {
    const job = await JobModel.findOne(filter);
    if (!job) {
      return next(new Error("Job not found", { cause: 404 }));
    }

    return successResponse({
      res,
      status: 200,
      message: "Job retrieved successfully",
      data: { job },
    });
  }

  const { data: jobs, count } = await paginate({
    page,
    limit,
    model: JobModel,
    filter,
    sort: { [sort]: order === "asc" ? 1 : -1 },
  });

  return successResponse({
    res,
    status: 200,
    message: "Jobs retrieved successfully",
    data: { jobs, totalCount: count },
  });
});

export default getCompanyJobs;
