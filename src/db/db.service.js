export const create = async ({ model = "", data = {} } = {}) => {
  return await model.create(data);
};

export const find = async ({
  model = "",
  filter = {},
  select = "",
  skip = 0,
  limit = 1000,
  populate = [],
  sort,
} = {}) => {
  return await model
    .find(filter)
    .populate(populate)
    .select(select)
    .skip(skip)
    .limit(limit)
    .sort(sort);
};

export const findOne = async ({
  model = "",
  filter = {},
  select = "",
  populate = [],
} = {}) => {
  return await model.findOne(filter).select(select).populate(populate);
};

export const findById = async ({
  model = "",
  id = "",
  select = "",
  populate = [],
} = {}) => {
  return await model.findById(id).select(select).populate(populate);
};

export const findByIdAndUpdate = async ({
  model = "",
  id = "",
  data = {},
  options = { new: true },
  select = "",
  populate = [],
} = {}) => {
  return await model
    .findByIdAndUpdate(id, data, { new: true, ...options })
    .select(select)
    .populate(populate);
};

export const findOneAndUpdate = async ({
  model,
  filter = {},
  data = {},
  options = {},
  select = "",
  populate = [],
} = {}) => {
  return await model
    .findOneAndUpdate(filter, data, { new: true, ...options })
    .select(select)
    .populate(populate);
};

export const updateOne = async ({
  model,
  filter = {},
  data = {},
  options = {},
} = {}) => {
  return await model.updateOne(filter, data, options);
};

export const updateMany = async ({
  model,
  filter = {},
  data = {},
  options = {},
} = {}) => {
  return await model.updateMany(filter, data, options);
};

export const findByIdAndDelete = async ({
  model,
  id = "",
  select = "",
  populate = [],
} = {}) => {
  return await model.findByIdAndDelete(id).select(select).populate(populate);
};

export const findOneAndDelete = async ({
  model,
  filter = {},
  select = "",
  populate = [],
} = {}) => {
  return await model.findOneAndDelete(filter).select(select).populate(populate);
};

export const deleteOne = async ({ model, filter = {} } = {}) => {
  return await model.deleteOne(filter);
};

export const deleteMany = async ({ model, filter = {} } = {}) => {
  return await model.deleteMany(filter);
};
