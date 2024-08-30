"use client";
import styles from "@/styles/components/card.module.scss";
import useDeckStore from "@/stores/deckStore";

const Card = ({ card }) => {
    const flipCard = useDeckStore((state) => state.flipCard);

    const handleClick = () => {
        flipCard(card.id);
    };

    if (card.removed) {
        return <div className={styles.emptySpace}></div>; // Affiche un espace vide si la carte est retirée
    }

    return (
        <div
            className={`${styles.card} ${card.revealed ? styles.revealed : ""}`}
            onClick={handleClick}
        >
            {card.revealed && (
                <span className={styles.cardContent}>{card.number}</span>
            )}
        </div>
    );
};

export default Card;
