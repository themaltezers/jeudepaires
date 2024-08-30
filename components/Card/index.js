"use client";
import styles from "@/styles/components/card.module.scss";
import useDeckStore from "@/stores/deckStore";

const Card = ({ card }) => {
    const { flipCard } = useDeckStore();
    const show = card.revealed;

    const handleClick = () => {
        if (!show) {
            flipCard(card.id);
        }
    };

    return (
        <div
            className={`${styles.card} ${show ? styles.revealed : ""}`}
            onClick={handleClick}
            aria-pressed={show}
        >
            {show && <span className={styles.cardContent}>{card.number}</span>}
        </div>
    );
};

export default Card;
