export type Presence = {
    username: string;
    utcOffset: number;
    country: string;
    gameMode: number;
    action: number;
    infoText: string;
    beatmapMd5: string;
    beatmapId: number;
    mods: number;
    spectatorHostSessionId: string | null;
    awayMessage: string | null;
    multiplayerMatchId: number | null;
    lastNpBeatmapId: number | null;
    primary: boolean;
};

export type OsuSession = {
    sessionId: string;
    accountId: string;
    presence: Presence;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
};
