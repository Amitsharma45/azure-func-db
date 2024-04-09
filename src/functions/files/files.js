const { app } = require("@azure/functions");
const fileController = require("../../controllers/files.controller");

// Add File endpoint
app.http("addFile", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "files/add",
  handler: fileController.addFile,
});

// Get All Files by Association endpoint
app.http("getAllFilesByAssociation", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "files/{association_id}/{association_type}",
  handler: fileController.getAllFilesByAssociation,
});

// Remove File endpoint
app.http("removeFile", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "files/{id}",
  handler: fileController.removeFile,
});
