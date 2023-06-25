import { type Stats } from "../interfaces/stats";
import type { Success, Failure } from "../interfaces/api";

// TODO: implement retry logic

const deserializeSuccessResponse = (responseData: any): Success<Stats> => {
  return {
    status: "success",
    data: {
      accountId: responseData.data.account_id,
      gameMode: responseData.data.game_mode,
      totalScore: responseData.data.total_score,
      rankedScore: responseData.data.ranked_score,
      performancePoints: responseData.data.performance_points,
      playCount: responseData.data.play_count,
      playTime: responseData.data.play_time,
      accuracy: responseData.data.accuracy,
      highestCombo: responseData.data.highest_combo,
      totalHits: responseData.data.total_hits,
      replayViews: responseData.data.replay_views,
      xhCount: responseData.data.xh_count,
      xCount: responseData.data.x_count,
      shCount: responseData.data.sh_count,
      sCount: responseData.data.s_count,
      aCount: responseData.data.a_count,
    },
    meta: {
      page: responseData.meta.page,
      pageSize: responseData.meta.page_size,
      total: responseData.meta.total,
    },
  };
};

const deserializeFailureResponse = (responseData: any): Failure => {
  return {
    status: "error",
    error: responseData.error,
    message: responseData.message,
  };
};

export const fetchOne = async (
  accountId: number,
  gameMode: number
): Promise<Success<Stats> | Failure> => {
  try {
    const response = await fetch(
      `http://localhost:10000/v1/stats/${accountId}/${gameMode}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "User-Agent": "basic-frontend/v0.0.1",
        },
      }
    );
    const responseData: Success<Stats> | Failure = await response.json();
    if (!response.ok || responseData.status !== "success") {
      console.error(
        "An error occurred while processing the response.",
        responseData
      );
      return deserializeFailureResponse(responseData);
    }
    return deserializeSuccessResponse(responseData);
  } catch (error) {
    console.error("An error occurred while fetching the account.", error);
    return {
      status: "error",
      error: "internal_server_error",
      message: "An error occurred while fetching the account.",
    };
  }
};

export const fetchMany = async (
  page: number,
  pageSize: number
): Promise<Success<Stats[]> | Failure> => {
  try {
    const response = await fetch(
      `http://localhost:10000/v1/stats?page=${page}&page_size=${pageSize}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "User-Agent": "basic-frontend/v0.0.1",
        },
      }
    );
    const responseData: Success<Stats[]> | Failure = await response.json();
    if (!response.ok || responseData.status !== "success") {
      console.error(
        "An error occurred while processing the response.",
        responseData
      );
      return deserializeFailureResponse(responseData);
    }
    return {
      status: "success",
      data: responseData.data.map((stats: any) => {
        return {
          accountId: stats.account_id,
          gameMode: stats.game_mode,
          totalScore: stats.total_score,
          rankedScore: stats.ranked_score,
          performancePoints: stats.performance_points,
          playCount: stats.play_count,
          playTime: stats.play_time,
          accuracy: stats.accuracy,
          highestCombo: stats.highest_combo,
          totalHits: stats.total_hits,
          replayViews: stats.replay_views,
          xhCount: stats.xh_count,
          xCount: stats.x_count,
          shCount: stats.sh_count,
          sCount: stats.s_count,
          aCount: stats.a_count,
        };
      }),
      meta: {
        page: responseData.meta.page,
        pageSize: responseData.meta.page_size,
        total: responseData.meta.total,
      },
    };
  } catch (error) {
    console.error("An error occurred while fetching the accounts.", error);
    return {
      status: "error",
      error: "internal_server_error",
      message: "An error occurred while fetching the accounts.",
    };
  }
};
