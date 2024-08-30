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

//Decks
const cards = [
    { id: 0, number: "Vt", value: 5, revealed: false },
    { id: 1, number: "Dt", value: 10, revealed: false },
    { id: 2, number: "Rt", value: 15, revealed: false },
    { id: 3, number: "At", value: 20, revealed: false },
    { id: 4, number: "Vc", value: 5, revealed: false },
    { id: 5, number: "Dc", value: 10, revealed: false },
    { id: 6, number: "Rc", value: 15, revealed: false },
    { id: 7, number: "Ac", value: 20, revealed: false },
    { id: 8, number: "Vt", value: 5, revealed: false },
    { id: 9, number: "Dt", value: 10, revealed: false },
    { id: 10, number: "Rt", value: 15, revealed: false },
    { id: 11, number: "At", value: 20, revealed: false },
    { id: 12, number: "Vc", value: 5, revealed: false },
    { id: 13, number: "Dc", value: 10, revealed: false },
    { id: 14, number: "Rc", value: 15, revealed: false },
    { id: 15, number: "Ac", value: 20, revealed: false },
    {
        id: 16,
        number: "change",
        effect: ["change", "changeR"],
        revealed: false,
    },
    { id: 17, number: "vol", effect: ["vol", "volR"], revealed: false },
    { id: 18, number: "garde", effect: ["garde", "gardeR"], revealed: false },
    { id: 19, number: "voit", effect: ["voit", "voitR"], revealed: false },
];

//Mélange les cartes
const shuffledCards = shuffleArray([...cards]);

//Store du deck
const useDeckStore = create((set, get) => ({
    cards: shuffledCards,
    flippedCards: [],

    flipCard: (id) => {
        const { cards, flippedCards } = get();
        const card = cards.find((card) => card.id === id);
        const { currentPlayer, addToPlayerHand, switchPlayer } =
            usePlayerStore.getState();

        if (!card.revealed && flippedCards.length < 2) {
            set((state) => ({
                cards: state.cards.map((card) =>
                    card.id === id ? { ...card, revealed: true } : card
                ),
                flippedCards: [...state.flippedCards, id],
            }));

            if (get().flippedCards.length === 2) {
                setTimeout(() => {
                    const [firstCardId, secondCardId] = get().flippedCards;
                    const firstCard = cards.find((c) => c.id === firstCardId);
                    const secondCard = cards.find((c) => c.id === secondCardId);

                    if (firstCard.number === secondCard.number) {
                        // Ajouter les cartes à la main du joueur actuel
                        addToPlayerHand(currentPlayer, firstCard);
                        addToPlayerHand(currentPlayer, secondCard);
                    } else {
                        // Retourner les cartes si elles ne correspondent pas
                        set((state) => ({
                            cards: state.cards.map((card) =>
                                card.id === firstCardId ||
                                card.id === secondCardId
                                    ? { ...card, revealed: false }
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
            cards: state.cards.map((card) => ({ ...card, revealed: false })),
            flippedCards: [],
        })),
}));
export default useDeckStore;
