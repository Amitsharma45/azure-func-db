const db = require("../config/db.config");
const connection = db.getConnection();

// Create a new community
const createCommunity = async (request, context) => {
  try {
    const { owner_id } = request;

    // Create the community
    const community = await connection.communities.create({
      owner_id,
    });

    return {
      status: 201,
      jsonBody: {
        status: 201,
        message: "Community created successfully",
        community,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
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

// Get a single community by ID
const getCommunityById = async (request, context) => {
  try {
    const { id } = request.params;

    const community = await connection.communities.findOne({
      where: { id },
    });

    if (!community) {
      return {
        status: 404,
        jsonBody: {
          status: 404,
          message: "Community not found",
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Community retrieved successfully",
        community,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
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

// Get a single community by owner ID
const getCommunityByOwnerId = async (request, context) => {
  try {
    const { ownerId } = request.params;

    const community = await connection.communities.findOne({
      where: { owner_id: ownerId },
    });

    if (!community) {
      return {
        status: 404,
        jsonBody: {
          status: 404,
          message: "Community not found for the provided owner ID",
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Community retrieved successfully",
        community,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
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

// Get all communities
const getAllCommunities = async (request, context) => {
  try {
    const communities = await connection.communities.findAll();

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Communities retrieved successfully",
        communities,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
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

// Update an existing community by ID
const updateCommunity = async (request, context) => {
  try {
    const { id } = request.params;
    const body = await request.json();

    const community = await connection.communities.findOne({
      where: { id },
    });

    if (!community) {
      return {
        status: 404,
        jsonBody: {
          status: 404,
          message: "Community not found",
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    await community.update(body);

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Community updated successfully",
        community,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
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
  createCommunity,
  getCommunityById,
  getCommunityByOwnerId,
  getAllCommunities,
  updateCommunity,
};
