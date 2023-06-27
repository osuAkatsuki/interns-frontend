import { type OsuSession } from "../interfaces/osuSessions";
import type { Success, Failure } from "../interfaces/api";

const mapToSuccessModel = (responseData: any): Success<OsuSession> => {
  return {
    status: "success",
    data: {
      sessionId: responseData.data.session_id,
      accountId: responseData.data.account_id,
      presence: {
        username: responseData.data.presence.username,
        utcOffset: responseData.data.presence.utcOffset,
        country: responseData.data.presence.country,
        gameMode: responseData.data.presence.game_mode,
        action: responseData.data.presence.action,
        infoText: responseData.data.presence.info_text,
        beatmapMd5: responseData.data.presence.beatmap_md5,
        beatmapId: responseData.data.presence.beatmap_id,
        mods: responseData.data.presence.mods,
        spectatorHostSessionId:
          responseData.data.presence.spectator_host_session_id,
        awayMessage: responseData.data.presence.away_message,
        multiplayerMatchId: responseData.data.presence.multiplayer_match_id,
        lastNpBeatmapId: responseData.data.presence.last_np_beatmap_id,
        primary: responseData.data.presence.primary,
      },
      expiresAt: new Date(responseData.data.expires_at),
      createdAt: new Date(responseData.data.created_at),
      updatedAt: new Date(responseData.data.updated_at),
    },
    meta: {
      page: responseData.meta.page,
      pageSize: responseData.meta.page_size,
      total: responseData.meta.total,
    },
  };
};

const mapToFailureModel = (responseData: any): Failure => {
  return {
    status: "error",
    error: responseData.error,
    message: responseData.message,
  };
};

export const fetchOneOsuSession = async (
  sessionId: string
): Promise<Success<OsuSession> | Failure> => {
  try {
    const response = await fetch(
      `http://localhost:10000/v1/sessions/${sessionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "basic-frontend/v0.0.1",
        },
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      console.error(
        "An error occurred while processing the response.",
        responseData
      );
      return {
        status: "error",
        error: (responseData as Failure).error,
        message: (responseData as Failure).message,
      };
    }
    if (responseData.status === "success") {
      return mapToSuccessModel(responseData);
    } else {
      return mapToFailureModel(responseData);
    }
  } catch (error) {
    return {
      status: "error",
      error: "internal_server_error",
      message: "An unhandled error occurred while processing the response.",
    };
  }
};

export const fetchManyOsuSessions = async (page: number, pageSize: number) => {
  try {
    const response = await fetch(
      `http://localhost:10000/v1/sessions?page=${page}&page_size=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "basic-frontend/v0.0.1",
        },
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      console.error(
        "An error occurred while processing the response.",
        responseData
      );
      return {
        status: "error",
        error: (responseData as Failure).error,
        message: (responseData as Failure).message,
      };
    }
    if (responseData.status === "success") {
      return {
        status: "success",
        data: responseData.data.map((osuSession: any) => {
          return {
            sessionId: osuSession.session_id,
            accountId: osuSession.account_id,
            presence: {
              username: osuSession.presence.username,
              utcOffset: osuSession.presence.utcOffset,
              country: osuSession.presence.country,
              gameMode: osuSession.presence.game_mode,
              action: osuSession.presence.action,
              infoText: osuSession.presence.info_text,
              beatmapMd5: osuSession.presence.beatmap_md5,
              beatmapId: osuSession.presence.beatmap_id,
              mods: osuSession.presence.mods,
              spectatorHostSessionId:
                osuSession.presence.spectator_host_session_id,
              awayMessage: osuSession.presence.away_message,
              multiplayerMatchId: osuSession.presence.multiplayer_match_id,
              lastNpBeatmapId: osuSession.presence.last_np_beatmap_id,
              primary: osuSession.presence.primary,
            },
            expiresAt: new Date(osuSession.expires_at),
            createdAt: new Date(osuSession.created_at),
            updatedAt: new Date(osuSession.updated_at),
          };
        }),
        meta: {
          page: responseData.meta.page,
          pageSize: responseData.meta.page_size,
          total: responseData.meta.total,
        },
      };
    }
    return {
      status: "error",
      error: responseData.error,
    };
  } catch (error) {
    return {
      status: "error",
      error: "internal_server_error",
      message: "An unhandled error occurred while processing the response.",
    };
  }
};
