"use client";
import useDeckStore from "@/stores/deckStore";
import styles from "@/styles/components/board.module.scss";
import Card from "../Card";

const Board = () => {
    const deck = useDeckStore((state) => state.cards);

    return (
        <div className={styles.board}>
            {deck.map((card) => (
                <Card key={card.id} card={card}></Card>
            ))}
        </div>
    );
};

export default Board;
