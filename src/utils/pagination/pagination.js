import * as dbService from "../../db/db.service.js";

const paginate = async ({
  page = 1,
  limit = 10,
  model,
  populate = [],
  filter = {},
  select = "",
  sort = { createdAt: -1 },
}) => {
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  if (isNaN(page) || page < 1) page = parseInt(process.env.PAGE);
  if (isNaN(limit) || limit < 1) limit = parseInt(process.env.LIMIT);

  const skip = (page - 1) * limit;

  const count = await model.countDocuments(filter);

  const data = await dbService.find({
    model,
    filter,
    populate,
    limit,
    skip,
    select,
    sort,
  });

  return { data, page, limit, count };
};

export default paginate;
