"use client";
import React from "react";
import styles from "@/styles/components/player.module.scss";
import Hand from "./Hand";
import usePlayerStore from "@/stores/playerStore"; // Assurez-vous que le chemin est correct

const Player = ({ playerId }) => {
    const player = usePlayerStore((state) =>
        state.players.find((p) => p.id === parseInt(playerId))
    );
    const currentPlayer = usePlayerStore((state) => state.currentPlayer);

    // Si le joueur n'existe pas, retourne un message d'erreur
    if (!player) {
        return <div className={styles.player}>Player not found</div>;
    }

    // Si la main du joueur n'est pas définie, éviter l'erreur
    if (!player.hand) {
        return (
            <div className={styles.player}>Main du joueur non disponible</div>
        );
    }

    return (
        <div className={styles.player}>
            <h2>Player: {player.name}</h2>
            <p>Points: {player.points}</p>
            <Hand playerId={player.id} cards={player.hand} />
        </div>
    );
};

export default Player;
