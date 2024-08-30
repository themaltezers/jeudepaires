import { create } from "zustand";
import usePlayerStore from "./playerStore";

// Fonction de mélange
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const createPairCard = (firstCard, secondCard) => ({
    id: `${firstCard.id}-${secondCard.id}`, // Identifiant unique pour la paire
    type: "pair", // Indicateur que c'est une carte de paire
    number: `${firstCard.number}`, // Numéros des cartes associées
    value: firstCard.value, // Valeur combinée des deux cartes
    cards: firstCard, // Référence aux cartes originales
});

//Decks
const cards = [
    {
        id: 0,
        number: "Vt",
        value: 5,
        revealed: false,
        removed: false,
        selectedBy: null,
    },
    {
        id: 1,
        number: "Dt",
        value: 10,
        revealed: false,
        removed: false,
        selectedBy: null,
    },
    {
        id: 2,
        number: "Rt",
        value: 15,
        revealed: false,
        removed: false,
        selectedBy: null,
    },
    {
        id: 3,
        number: "At",
        value: 20,
        revealed: false,
        removed: false,
        selectedBy: null,
    },
    {
        id: 4,
        number: "Vc",
        value: 5,
        revealed: false,
        removed: false,
        selectedBy: null,
    },
    {
        id: 5,
        number: "Dc",
        value: 10,
        revealed: false,
        removed: false,
        selectedBy: null,
    },
    {
        id: 6,
        number: "Rc",
        value: 15,
        revealed: false,
        removed: false,
        selectedBy: null,
    },
    {
        id: 7,
        number: "Ac",
        value: 20,
        revealed: false,
        removed: false,
        selectedBy: null,
    },
    {
        id: 8,
        number: "Vt",
        value: 5,
        revealed: false,
        removed: false,
        selectedBy: null,
    },
    {
        id: 9,
        number: "Dt",
        value: 10,
        revealed: false,
        removed: false,
        selectedBy: null,
    },
    {
        id: 10,
        number: "Rt",
        value: 15,
        revealed: false,
        removed: false,
        selectedBy: null,
    },
    {
        id: 11,
        number: "At",
        value: 20,
        revealed: false,
        removed: false,
        selectedBy: null,
    },
    {
        id: 12,
        number: "Vc",
        value: 5,
        revealed: false,
        removed: false,
        selectedBy: null,
    },
    {
        id: 13,
        number: "Dc",
        value: 10,
        revealed: false,
        removed: false,
        selectedBy: null,
    },
    {
        id: 14,
        number: "Rc",
        value: 15,
        revealed: false,
        removed: false,
        selectedBy: null,
    },
    {
        id: 15,
        number: "Ac",
        value: 20,
        revealed: false,
        removed: false,
        selectedBy: null,
    },
    {
        id: 16,
        number: "change",
        effect: ["change", "changeR"],
        revealed: false,
        removed: false,
        selectedBy: null,
    },
    {
        id: 17,
        number: "vol",
        effect: ["vol", "volR"],
        revealed: false,
        removed: false,
        selectedBy: null,
    },
    {
        id: 18,
        number: "garde",
        effect: ["garde", "gardeR"],
        revealed: false,
        removed: false,
        selectedBy: null,
    },
    {
        id: 19,
        number: "voit",
        effect: ["voit", "voitR"],
        revealed: false,
        removed: false,
        selectedBy: null,
    },
];

//Mélange les cartes
const shuffledCards = shuffleArray([...cards]);

//Store du deck
const useDeckStore = create((set, get) => ({
    cards: shuffleArray([...cards]),
    flippedCards: [],

    flipCard: (id) => {
        const { cards, flippedCards } = get();
        const card = cards.find((card) => card.id === id);
        const { currentPlayer, addToPlayerHand, switchPlayer } =
            usePlayerStore.getState();

        if (!card.revealed && flippedCards.length < 2 && !card.removed) {
            set((state) => ({
                cards: state.cards.map((card) =>
                    card.id === id
                        ? { ...card, revealed: true, selectedBy: currentPlayer }
                        : card
                ),
                flippedCards: [...state.flippedCards, id],
            }));

            if (get().flippedCards.length === 2) {
                setTimeout(() => {
                    const [firstCardId, secondCardId] = get().flippedCards;
                    const firstCard = cards.find((c) => c.id === firstCardId);
                    const secondCard = cards.find((c) => c.id === secondCardId);

                    if (firstCard.number === secondCard.number) {
                        // Créer une carte de paire et ajouter à la main du joueur
                        const pairCard = createPairCard(firstCard, secondCard);
                        addToPlayerHand(currentPlayer, pairCard);

                        // Marquer les cartes comme retirées
                        set((state) => ({
                            cards: state.cards.map((card) =>
                                card.id === firstCardId ||
                                card.id === secondCardId
                                    ? { ...card, removed: true }
                                    : card
                            ),
                        }));
                    } else {
                        // Retourner les cartes si elles ne correspondent pas
                        set((state) => ({
                            cards: state.cards.map((card) =>
                                card.id === firstCardId ||
                                card.id === secondCardId
                                    ? {
                                          ...card,
                                          revealed: false,
                                          selectedBy: null,
                                      }
                                    : card
                            ),
                        }));
                    }

                    get().resetFlippedCards();
                    switchPlayer(); // Passer au joueur suivant
                }, 1000);
            }
        }
    },

    resetFlippedCards: () => {
        set({ flippedCards: [] });
    },

    resetCards: () =>
        set((state) => ({
            cards: state.cards.map((card) => ({
                ...card,
                revealed: false,
                removed: false,
                selectedBy: null,
            })),
            flippedCards: [],
        })),
}));

export default useDeckStore;
