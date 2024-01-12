const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;
  const errors = [];

  if (!firstname) {
    errors.push({ field: "firstname", message: "First name is required" });
  } else if (firstname.length >= 255) {
    errors.push({
      field: "firstname",
      message: "First name should contain less than 255 characters",
    });
  }

  if (!lastname) {
    errors.push({ field: "lastname", message: "Last name is required" });
  } else if (lastname.length >= 255) {
    errors.push({
      field: "lastname",
      message: "Last name should contain less than 255 characters",
    });
  }

  if (!email) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (email.length >= 255) {
    errors.push({
      field: "email",
      message: "Email should contain less than 255 characters",
    });
  }

  if (errors.length > 0) {
    return res.status(422).json({ validationErrors: errors });
  }

  next();
};

module.exports = validateUser;
