export const UserRole = Object.freeze({
  ADMIN: "admin",
  USER: "user",
});

export const TokenType = Object.freeze({
  ACCESS: "access",
  REFRESH: "refresh",
});

export const AuthProviders = Object.freeze({
  GOOGLE: "google",
  SYSTEM: "system",
});

export const Genders = Object.freeze({
  MALE: "male",
  FEMALE: "female",
});

export const OtpTypes = Object.freeze({
  CONFIRM_EMAIL: "confirm-email",
  FORGET_PASSWORD: "forget-password",
});

export const JobLocation = Object.freeze({
  ONSITE: "onsite",
  REMOTE: "remote",
  HYBRID: "hybrid",
});

export const WorkingTime = Object.freeze({
  PART_TIME: "part-time",
  FULL_TIME: "full-time",
});

export const SeniorityLevel = Object.freeze({
  FRESH: "fresh",
  JUNIOR: "junior",
  MID_LEVEL: "mid-level",
  SENIOR: "senior",
  TEAM_LEAD: "team-lead",
  CTO: "cto",
});

export const ApplicationStatus = Object.freeze({
  PENDING: "pending",
  ACCEPTED: "accepted",
  VIEWED: "viewed",
  IN_CONSIDERATION: "in consideration",
  REJECTED: "rejected",
});
