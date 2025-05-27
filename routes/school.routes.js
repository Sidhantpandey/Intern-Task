import { Router } from "express";
import * as schoolController from "../controllers/schools.controllers.js";
import { body, query } from "express-validator";

const router = Router();

// Validations for the school Route

const validateAddSchool = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name must be under 100 characters"),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ max: 200 })
    .withMessage("Address must be under 200 characters"),

  body("latitude")
    .notEmpty()
    .withMessage("Latitude is required")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be a valid float between -90 and 90"),

  body("longitude")
    .notEmpty()
    .withMessage("Longitude is required")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be a valid float between -180 and 180"),
];

const validateListSchools = [
  query("latitude")
    .notEmpty()
    .withMessage("Latitude is required")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be between -90 and 90"),

  query("longitude")
    .notEmpty()
    .withMessage("Longitude is required")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be between -180 and 180"),
];

// Route to add School banners
router.route("/addSchool").post(validateAddSchool, schoolController.addSchools);

//Route to get all Schools 
router
  .route("/listSchools")
  .get(validateListSchools, schoolController.listSchools);

export default router;
