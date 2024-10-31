import axios from "axios";

// Function to fetch media details from an external API
export const fetchMediaDetails = async (mediaId, mediaType) => {
  let updatedMediaType;
  if (mediaType === "movies") {
    updatedMediaType = "movie";
  } else {
    updatedMediaType = "tv";
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${updatedMediaType}/${mediaId}`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          language: "en-US",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch media details for ID: ${mediaId}`, error);
    throw new Error("Media details could not be fetched");
  }
};
