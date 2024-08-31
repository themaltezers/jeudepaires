"use client";
import useDeckStore from "@/stores/deckStore";
import usePlayerStore from "@/stores/playerStore";
import styles from "@/styles/components/board.module.scss";
import Card from "../Card";
import { useEffect } from "react";

const Board = () => {
    const deck = useDeckStore((state) => state.cards);
    const startTurn = usePlayerStore((state) => state.startTurn);

    useEffect(() => {
        // Appeler startTurn au début du tour
        startTurn();
    }, []);

    return (
        <div className={styles.board}>
            {deck.map((card) => (
                <Card key={card.id} card={card}></Card>
            ))}
        </div>
    );
};

export default Board;
