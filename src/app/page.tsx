import styles from "./page.module.css";
import Banner from '@/components/Banner';
import CardPanel from '@/components/CardPanel';
import ServicePanel from "@/components/ServicePanel";

export default function Home() {

    return (
        <main className={styles.main}>
            <div>
                <Banner/>
                <ServicePanel/>
                <CardPanel/>
            </div>
        </main>
    );
}
