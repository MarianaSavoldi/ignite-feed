/* eslint-disable react/jsx-key */
import {PropTypes} from 'prop-types'
import {format, formatDistanceToNow} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css'
import { useState } from 'react';

export function Post({author, postContent, publishedAt}) {
  const [comments, setComments] = useState(['Post bacana, hein?!']);
  const [newCommentText, setNewCommentText] = useState('')
//  Formatação da data usando Intl
  // const publishedDateFormat = new Intl.DateTimeFormat('pt-br', {
  //   day: '2-digit',
  //   month: 'long',
  //   hour: '2-digit',
  //   minute: '2-digit',
  // }).format(publishedAt)

// Formatação da data usando date-fns
  const publishedDateFormat = format(publishedAt, "dd 'de' LLLL 'às' HH'h'mm", {locale: ptBR});

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const isNewCommentEmpty = newCommentText.length === 0;

  const handleCreateNewComment = (e) => {
    e.preventDefault()
    setComments([...comments, newCommentText])
    setNewCommentText('')
  };

  const handleNewCommentChange = (e) => {
    e.target.setCustomValidity('')
    setNewCommentText(e.target.value)
  }

  const handleInvalidComment = (e) => {
    e.target.setCustomValidity('Esse campo é obrigatório')
  }

  const deleteComment = (commentToDelete) => {
    const newCommentsList = comments.filter(comment => comment !== commentToDelete)
    setComments(newCommentsList)
  }

  return (
    <>
      <article className={styles.post}>
        <header>
          <div className={styles.author}>
            <Avatar src={author.avatarUrl} alt="Author's avatar"/>
            <div className={styles.authorInfo}>
              <strong>{author.name}</strong>
              <span>{author.role}</span>
            </div>
          </div>

          <time title={publishedDateFormat} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
        </header>

        <div className={styles.content}>
          {postContent.map(line => {
            if (line.type === 'paragraph') {
              return <p key={line.content}>{line.content}</p>
            } else if (line.type === 'link') {
              return <p key={line.content}><a href="#">{line.content}</a></p>
            }
          })}
        </div>

        <form onSubmit={(e) => handleCreateNewComment(e)} className={styles.commentForm}>
          <strong>Deixe seu feedback</strong>
          <textarea 
            name='comment'
            placeholder='Deixe um comentário'
            value={newCommentText}
            onChange={(e) => handleNewCommentChange(e)}
            onInvalid={(e) => handleInvalidComment(e)}
            required
          />
          <footer>
            <button
              type='submit'
              disabled={isNewCommentEmpty}
            >
              Publicar
            </button>
          </footer>
        </form>

        <div className={styles.commentList}>
          {comments.map(comment => {
            return (
              <Comment
                key={comment}
                content={comment}
                onDeleteComment={deleteComment}
              />
            )
          })}
        </div>

      </article>
    </>
  )
}

Post.propTypes = {
  author: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }),
  postContent: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    content: PropTypes.string,
  })),
  publishedAt: PropTypes.instanceOf(Date),
}
