import paginate from "../../../utils/pagination/pagination.js";
import JobModel from "../../../db/models/job.model.js";
import asyncHandler from "../../../utils/response/error.response.js";
import successResponse from "../../../utils/response/success.response.js";

const filterJobs = asyncHandler(async (req, res) => {
  const {
    page,
    limit,
    sort,
    order,
    workingTime,
    jobLocation,
    seniorityLevel,
    jobTitle,
    technicalSkills,
  } = req.query;

  let filter = { closed: false };

  if (workingTime) filter.workingTime = workingTime.toLowerCase();
  if (jobLocation) filter.jobLocation = jobLocation.toLowerCase();
  if (seniorityLevel) filter.seniorityLevel = seniorityLevel.toLowerCase();
  if (jobTitle) filter.jobTitle = { $regex: jobTitle, $options: "i" };

  if (technicalSkills) {
    let skillsArray = Array.isArray(technicalSkills)
      ? technicalSkills
      : technicalSkills.split(",");
    skillsArray = skillsArray.map((skill) => skill.trim().toLowerCase());
    filter.technicalSkills = { $all: skillsArray };
  }

  const sortField = sort || "createdAt";
  const sortOrder = order === "asc" ? 1 : -1;

  const { data: jobs, count } = await paginate({
    page,
    limit,
    model: JobModel,
    filter,
    sort: { [sortField]: sortOrder },
  });

  return successResponse({
    res,
    status: 200,
    message: "Jobs retrieved successfully",
    data: { jobs, totalCount: count },
  });
});

export default filterJobs;
