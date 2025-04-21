/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div
      css={css`
        text-align: center;
        margin-top: 5em;
      `}
    >
      <h1
        css={css`
          font-size: 3rem;
          font-weight: 700;
          color: #111827;
        `}
      >
        Bienvenido a PayMock
      </h1>
      <p
        css={css`
          font-size: 1.125rem;
          color: #6b7280;
        `}
      >
        Una maqueta estilo PayPal con React + Emotion
      </p>
      <Link
        to="/login"
        css={css`
          display: inline-block;
          padding: 0.75em 1.5em;
          font-size: 1.125rem;
          font-weight: 600;
          background-color: #3b82f6;
          color: white;
          border-radius: 4px;
          text-decoration: none;
          transition: background-color 0.3s;
          &:hover {
            background-color: #2563eb;
          }
        `}
      >
        Iniciar sesión
      </Link>
    </div>
  )
}
