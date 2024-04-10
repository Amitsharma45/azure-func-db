const { BlobServiceClient } = require("@azure/storage-blob");
const { Readable } = require("stream");

const connStr = process.env.AzureBlobConnectionString;
const containerName = process.env.containerName;
const StorageAccountName = process.env.StorageAccountName;

const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

async function uploadToBlobStorage({ fileContent, fileName, fileType }) {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const timestamp = new Date().toISOString().replace(/:/g, "-");
    const blobName = `${timestamp}_${fileName}`;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // TO DO: Directly send stream from frontend to backend

    const buff = Buffer.from(fileContent, "base64");
    const stream = Readable.from(buff);
    const streamLength = buff.length;

    const uploadBlobResponse = await blockBlobClient.uploadStream(
      stream,
      streamLength,
      5
    );

    return {
      requestId: uploadBlobResponse.requestId,
      fileUrl: `https://${StorageAccountName}.blob.core.windows.net/${containerName}/${blobName}`,
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
