import css from "./Loader.module.css";
import { TailSpin } from 'react-loader-spinner';
export default function Loader() {
    return (
        <div className={css.div}>
            <TailSpin color='#00BFFF' height={80} width={80} />
        </div>
    );
}