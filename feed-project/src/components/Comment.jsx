import {ThumbsUp, Trash} from '@phosphor-icons/react'
import styles from './Comment.module.css'

export function Comment() {
  return (
    <div className={styles.comment}>
      <img src="https://github.com/MarianaSavoldi.png" alt="User's avatar" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Mari Savoldi</strong>
              <time title="24 de Janeiro às 20h14" dateTime="2024-01-24 20:14:00">Cerca de 1h atrás</time>
            </div>

            <button title='Deletar comentário'>
              <Trash />
            </button>
          </header>
          <p>Muito bom Devon, parabéns!! 👏👏</p>
        </div>
        <footer>
          <ThumbsUp />
          Aplaudir <span>20</span>
        </footer>
      </div>
    </div>
  )
}