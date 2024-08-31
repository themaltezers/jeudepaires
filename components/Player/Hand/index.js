"use client";
import styles from "@/styles/components/hand.module.scss";
import usePlayerStore from "@/stores/playerStore";

const Hand = ({ playerId, cards }) => {
    const player = usePlayerStore((state) =>
        state.players.find((p) => p.id === parseInt(playerId))
    );

    // Vérification que le joueur existe et que la main est définie
    if (!player || !player.hand) {
        return <div className={styles.hand}>Main du joueur non disponible</div>;
    }

    const handleCardClick = (card) => {
        if (card.isSingle && !card.used) {
            // Déclencher l'effet et marquer la carte comme utilisée
            switch (card.number) {
                case "change":
                    alert("Effet 'Change' activé !");
                    break;
                case "vol":
                    alert("Effet 'Vol' activé !");
                    break;
                case "garde":
                    usePlayerStore.getState().protectPlayer(playerId);
                    alert("Effet 'Garde' activé !");
                    break;
                case "voit":
                    alert("Effet 'Voit' activé !");
                    break;
                default:
                    break;
            }

            // Mettre à jour l'état de la carte pour indiquer qu'elle a été utilisée
            usePlayerStore.getState().markCardAsUsed(playerId, card.id);
        } else {
            alert("Cette carte a déjà été utilisée.");
        }
    };

    return (
        <div className={styles.hand}>
            {player.hand.map((card) => (
                <div
                    key={card.id}
                    className={styles.card}
                    onClick={() => handleCardClick(card)}
                >
                    {card.isSingle ? (
                        <span className={styles.special}>{card.number}*</span>
                    ) : (
                        <span>{card.number}</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Hand;
