import { create } from "zustand";
const usePlayerStore = create((set) => ({
    players: [
        { id: 1, name: "Player 1", hand: [], points: 0 },
        { id: 2, name: "Player 2", hand: [], points: 0 },
    ],
    currentPlayer: 1,

    addToPlayerHand: (playerId, card) =>
        set((state) => ({
            players: state.players.map((player) =>
                player.id === playerId
                    ? {
                          ...player,
                          hand: [...player.hand, card],
                          points: player.points + card.value,
                      }
                    : player
            ),
        })),

    switchPlayer: () =>
        set((state) => ({
            currentPlayer: state.currentPlayer === 1 ? 2 : 1,
        })),
}));

export default usePlayerStore;
