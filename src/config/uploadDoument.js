const { BlobServiceClient } = require("@azure/storage-blob");

const connStr = process.env.AzureBlobConnectionString;
const containerName = process.env.containerName;

const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

async function uploadToBlobStorage({ content }) {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = "a.pdf";
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(
      content,
      content.length
    );
    return {
      requestId: uploadBlobResponse.requestId,
      status: "success",
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
}

module.exports = uploadToBlobStorage;
