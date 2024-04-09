const db = require("../config/db.config");
const connection = db.getConnection();

// Function to add a file
const addFile = async (request, context) => {
  try {
    const { uploaded_by, association_id, association_type, title, type } =
      request;

    const file = await connection.files.create({
      uploaded_by,
      association_id,
      association_type,
      title,
      type,
    });

    return {
      status: 201,
      jsonBody: {
        status: 201,
        message: "File added successfully",
        file,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("Error adding file:", error);
    return {
      status: 500,
      jsonBody: {
        status: 500,
        message: "Internal Server Error",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

// Function to get all files associated with a specific association
const getAllFilesByAssociation = async (request, context) => {
  try {
    const { association_id, association_type } = request;

    const files = await connection.files.findAll({
      where: { association_id, association_type },
    });

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Files retrieved successfully",
        files,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("Error getting files by association:", error);
    return {
      status: 500,
      jsonBody: {
        status: 500,
        message: "Internal Server Error",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

// Function to remove a file
const removeFile = async (id, context) => {
  try {
    const file = await connection.files.findByPk(id);
    if (!file) {
      return {
        status: 404,
        jsonBody: {
          status: 404,
          message: "File not found",
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    await file.destroy();
    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "File removed successfully",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("Error removing file:", error);
    return {
      status: 500,
      jsonBody: {
        status: 500,
        message: "Internal Server Error",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

module.exports = {
  addFile,
  getAllFilesByAssociation,
  removeFile,
};
