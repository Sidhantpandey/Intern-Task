import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { validationResult } from "express-validator";
import db from "../models/index.js";
import { Op } from "sequelize";

const School = db.School;

// Controller to addSchools
export const addSchools = async (req, res) => {
  // Handling Validations
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = ApiError.validationError(
      "There are validation errors with phone and 1 more field",
      errors.array()
    );

    return res.status(err.statusCode).json({
      errors: {
        type: err.type,
        message: err.message,
        fields: err.fields,
      },
    });
  }

  const { name, address, latitude, longitude } = req.body;

  try {
    const existing = await School.findOne({ where: { name, address } });
    if (existing) {
      return res.status(409).json({
        message: "School already exists with the same name and address",
      });
    }
    const newSchool = await School.create({
      name,
      address,
      latitude,
      longitude,
    });
    const response = ApiResponse.success(newSchool, {
      message: "Record Saved Successfully",
    });
    return res.status(response.statusCode).json(response.body);
  } catch (error) {
    console.log(error);
    const internalError = ApiError.error(
      "Internal Server Error",
      error.message
    );
    return res.status(internalError.statusCode).json({
      errors: {
        type: internalError.type,
        message: internalError.message,
      },
    });
  }
};

// Calculating distance by haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
};

//Controller to list all Schools
export const listSchools = async (req, res) => {
  // Handling Validations
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = ApiError.validationError(
      "There are validation errors with phone and 1 more field",
      errors.array()
    );

    return res.status(err.statusCode).json({
      errors: {
        type: err.type,
        message: err.message,
        fields: err.fields,
      },
    });
  }

  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  try {
    const schools = await School.findAll();

    const schoolsWithDistance = schools.map((school) => {
      const distance = calculateDistance(
        userLat,
        userLon,
        school.latitude,
        school.longitude
      );
      return { ...school.toJSON(), distance };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    const response = ApiResponse.success(schoolsWithDistance, {
      message: "Record Fetched Successfully",
    });

    return res.status(response.statusCode).json(response.body);
  } catch (error) {
    const internalError = ApiError.error(
      "Internal Server Error",
      error.message
    );
    return res.status(internalError.statusCode).json({
      errors: {
        type: internalError.type,
        message: internalError.message,
      },
    });
  }
};
