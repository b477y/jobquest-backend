import ApplicationModel from "../../../db/models/application.model.js";
import asyncHandler from "../../../utils/response/error.response.js";
import successResponse from "../../../utils/response/success.response.js";
import { ApplicationStatus } from "../../../utils/enum/enum.js";
import { emailEvent } from "../../../utils/events/email.event.js";
import CompanyModel from "../../../db/models/company.model.js";
import * as dbService from "../../../db/db.service.js";

export const updateApplicationStatus = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { applicationId } = req.params;
  const { status } = req.body;

  if (
    ![ApplicationStatus.ACCEPTED, ApplicationStatus.REJECTED].includes(status)
  ) {
    return next(
      new Error("Invalid status. Must be 'accepted' or 'rejected'.", {
        cause: 400,
      })
    );
  }

  const application = await dbService.findById({
    model: ApplicationModel,
    id: applicationId,
    populate: ["userId", "jobId"],
  });

  const { companyId } = application.jobId;

  const hrExists = await dbService.findOne({
    model: CompanyModel,
    filter: {
      _id: companyId,
      HRs: { $in: [userId] },
    },
  });

  if (!hrExists) {
    return next(
      new Error("Unauthorized. Only HRs can update the application status.", {
        cause: 403,
      })
    );
  }
  if (!application) {
    return next(new Error("Application not found.", { cause: 404 }));
  }

  if (application.status === status) {
    return next(new Error(`Application already ${status}.`, { cause: 400 }));
  }

  application.status = status;
  await application.save();

  if (status === ApplicationStatus.REJECTED) {
    await emailEvent.emit("applicationRejected", {
      email: application.userId.email,
    });
  } else if (status === ApplicationStatus.ACCEPTED) {
    await emailEvent.emit("applicationAccepted", {
      email: application.userId.email,
    });
  }

  return successResponse({
    res,
    status: 200,
    message: `Application ${status}.`,
    data: { applicationId, status },
  });
});
