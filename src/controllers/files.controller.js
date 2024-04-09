const fileService = require("../services/files.service");

// Controller to add a file
const addFile = async (request, context) => {
  try {
    const body = await request.json();

    const { uploaded_by, association_id, association_type, title, type } = body;

    return await fileService.addFile({
      uploaded_by,
      association_id,
      association_type,
      title,
      type,
    });
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

// Controller to get all files associated with a specific association
const getAllFilesByAssociation = async (request, context) => {
  try {
    const { association_id, association_type } = request.params;

    return await fileService.getAllFilesByAssociation({
      association_id,
      association_type,
    });
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

// Controller to remove a file
const removeFile = async (request, context) => {
  try {
    const { id } = request.params;

    return await fileService.removeFile(id);
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
