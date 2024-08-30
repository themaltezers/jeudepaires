"use client";
import styles from "@/styles/components/card.module.scss";
import useDeckStore from "@/stores/deckStore";

const Card = ({ card }) => {
    const flipCard = useDeckStore((state) => state.flipCard);

    const handleClick = () => {
        flipCard(card.id);
    };

    // Appliquer une bordure différente en fonction du joueur qui a sélectionné la carte
    const borderColorClass =
        card.selectedBy === 1
            ? styles.borderRed
            : card.selectedBy === 2
            ? styles.borderBlue
            : "";

    if (card.removed) {
        return <div className={styles.emptySpace}></div>; // Affiche un espace vide si la carte est retirée
    }

    return (
        <div
            className={`${styles.card} ${
                card.revealed ? styles.revealed : ""
            } ${borderColorClass}`}
            onClick={handleClick}
        >
            {card.revealed && (
                <span className={styles.cardContent}>{card.number}</span>
            )}
        </div>
    );
};

export default Card;
