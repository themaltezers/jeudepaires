import styles from "@/styles/pages/home.module.scss";
import Board from "@/components/Board";
import Player from "@/components/Player";

export default function Home() {
    return (
        <main className={styles.main}>
            <Player playerId="1"></Player>
            <Board></Board>
            <Player playerId="2"></Player>
        </main>
    );
}
