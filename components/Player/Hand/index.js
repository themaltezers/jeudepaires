"use client";
import React from "react";
import styles from "@/styles/components/hand.module.scss";

const Hand = ({ cards }) => {
    return (
        <div className={styles.hand}>
            {cards.map((card) => (
                <div key={card.id} className={styles.card}>
                    {card.type === "pair" ? (
                        <div className={styles.pairCard}>
                            <span>{card.number}</span>
                        </div>
                    ) : (
                        <span>{card.number}</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Hand;
