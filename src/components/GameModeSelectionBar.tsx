import { Button, Stack } from "@mui/material";
import { ClientGameMode, RelaxMode, isRealGameMode } from "../gameModes";

export const GameModeSelectionBar = ({
  gameMode,
  relaxMode,
  setGameMode,
  setRelaxMode,
}: {
  gameMode: ClientGameMode;
  relaxMode: RelaxMode;
  setGameMode: (gameMode: ClientGameMode) => void;
  setRelaxMode: (relaxMode: RelaxMode) => void;
}): JSX.Element => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            disabled={!isRealGameMode(ClientGameMode.Standard, relaxMode)}
            onClick={() => setGameMode(ClientGameMode.Standard)}
          >
            Standard
          </Button>
          <Button
            variant="contained"
            disabled={!isRealGameMode(ClientGameMode.Taiko, relaxMode)}
            onClick={() => setGameMode(ClientGameMode.Taiko)}
          >
            Taiko
          </Button>
          <Button
            variant="contained"
            disabled={!isRealGameMode(ClientGameMode.Catch, relaxMode)}
            onClick={() => setGameMode(ClientGameMode.Catch)}
          >
            Catch The Beat
          </Button>
          <Button
            variant="contained"
            disabled={!isRealGameMode(ClientGameMode.Mania, relaxMode)}
            onClick={() => setGameMode(ClientGameMode.Mania)}
          >
            Mania
          </Button>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            disabled={!isRealGameMode(gameMode, RelaxMode.Vanilla)}
            onClick={() => setRelaxMode(RelaxMode.Vanilla)}
          >
            Vanilla
          </Button>
          <Button
            variant="contained"
            disabled={!isRealGameMode(gameMode, RelaxMode.Relax)}
            onClick={() => setRelaxMode(RelaxMode.Relax)}
          >
            Relax
          </Button>
          <Button
            variant="contained"
            disabled={!isRealGameMode(gameMode, RelaxMode.Autopilot)}
            onClick={() => setRelaxMode(RelaxMode.Autopilot)}
          >
            Autopilot
          </Button>
        </Stack>
      </Stack>
    </>
  );
};
