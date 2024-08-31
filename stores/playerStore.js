import { create } from "zustand";

const usePlayerStore = create((set, get) => ({
    players: [
        {
            id: 1,
            name: "Player 1",
            hand: [],
            points: 0,
            isProtected: false,
        },
        { id: 2, name: "Player 2", hand: [], points: 0, isProtected: false },
    ],
    currentPlayer: 1,
    markCardAsUsed: (playerId, cardId) => {
        set((state) => ({
            players: state.players.map((player) =>
                player.id === playerId
                    ? {
                          ...player,
                          hand: player.hand.map((card) =>
                              card.id === cardId
                                  ? { ...card, used: true }
                                  : card
                          ),
                      }
                    : player
            ),
        }));
    },

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

    // Effet "change": Échanger une carte entre deux joueurs
    changeCard: (fromPlayerId, toPlayerId, cardId) => {
        const fromPlayer = get().players.find(
            (player) => player.id === fromPlayerId
        );
        const toPlayer = get().players.find(
            (player) => player.id === toPlayerId
        );

        const card = fromPlayer.hand.find((c) => c.id === cardId);

        if (!card) return;

        set((state) => ({
            players: state.players.map((player) => {
                if (player.id === fromPlayerId) {
                    return {
                        ...player,
                        hand: player.hand.filter((c) => c.id !== cardId),
                    };
                } else if (player.id === toPlayerId) {
                    return {
                        ...player,
                        hand: [...player.hand, card],
                    };
                }
                return player;
            }),
        }));
    },

    // Effet "vol": Voler une carte à un autre joueur
    stealCard: (fromPlayerId, toPlayerId, cardId) => {
        const fromPlayer = get().players.find(
            (player) => player.id === fromPlayerId
        );
        const toPlayer = get().players.find(
            (player) => player.id === toPlayerId
        );

        if (toPlayer.isProtected) return; // Le joueur est protégé

        const card = fromPlayer.hand.find((c) => c.id === cardId);

        if (!card) return;

        set((state) => ({
            players: state.players.map((player) => {
                if (player.id === fromPlayerId) {
                    return {
                        ...player,
                        hand: player.hand.filter((c) => c.id !== cardId),
                    };
                } else if (player.id === toPlayerId) {
                    return {
                        ...player,
                        hand: [...player.hand, card],
                    };
                }
                return player;
            }),
        }));
    },

    // Effet "garde": Protéger un joueur contre le vol
    protectPlayer: (playerId) => {
        set((state) => ({
            players: state.players.map((player) =>
                player.id === playerId
                    ? { ...player, isProtected: true }
                    : player
            ),
        }));
    },

    // Effet "voit": Voir une carte de l'adversaire
    revealCard: (playerId, cardId) => {
        const player = get().players.find((p) => p.id === playerId);
        const card = player.hand.find((c) => c.id === cardId);

        if (card) {
            // Afficher ou retourner cette carte dans l'interface utilisateur
            console.log(`Carte révélée: ${card.number}`);
        }
    },

    // Logique de début de tour
    startTurn: () => {
        const currentPlayer = get().currentPlayer;
        const player = get().players.find((p) => p.id === currentPlayer);
        const hasSpecialCard = player.hand.some((card) => card.isSingle);

        if (hasSpecialCard) {
            // Demander au joueur s'il veut utiliser une carte spéciale ou jouer normalement
            const userChoice = window.confirm(
                "Voulez-vous utiliser une carte spéciale?"
            );

            if (userChoice) {
                const cardToUse = player.hand.find((card) => card.isSingle);
                switch (cardToUse.number) {
                    case "change":
                        // Logique pour choisir les joueurs et la carte à échanger
                        // Par exemple: get().changeCard(player.id, otherPlayerId, cardId);
                        break;
                    case "vol":
                        // Logique pour choisir la carte à voler
                        // Par exemple: get().stealCard(player.id, otherPlayerId, cardId);
                        break;
                    case "garde":
                        get().protectPlayer(player.id);
                        break;
                    case "voit":
                        // Logique pour choisir la carte à révéler
                        // Par exemple: get().revealCard(otherPlayerId, cardId);
                        break;
                    default:
                        break;
                }
            }
        }

        // Le joueur continue son tour normalement s'il n'a pas utilisé de carte spéciale
    },
}));

export default usePlayerStore;
