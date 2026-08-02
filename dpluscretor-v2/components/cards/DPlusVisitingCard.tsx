"use client"
import React, { useState } from 'react'

export function DPlusVisitingCard() {
  const [isHovering, setIsHovering] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  const isWobbling = !isHovering
  const isStill = isHovering

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setIsFlipped(false)
  }

  const handleClick = () => {
    if (isStill) {
      setIsFlipped((prev) => !prev)
    }
  }

  return (
    <div className="flex items-center justify-center py-20">
      <div
        className="card-scene"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div
          className={[
            'card-inner',
            isWobbling ? 'card-wobbling' : 'card-still',
            isFlipped ? 'card-flipped' : '',
          ].join(' ')}
        >
          <div
            className="card-face card-front"
            style={{ backgroundImage: 'url(/assets/cards/card-front.png)' }}
          />
          <div
            className="card-face card-back"
            style={{ backgroundImage: 'url(/assets/cards/card-back.png)' }}
          />
        </div>
      </div>

      <style jsx>{`
        .card-scene {
          width: 580px;
          height: 342.4px;
          perspective: 1200px;
          cursor: pointer;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
        }

        // .card-wobbling {
        //   animation: wobble 3.2s ease-in-out infinite;
        // }

        .card-still {
          animation: none;
          transform: rotate(0deg);
        }

        .card-still.card-flipped {
          transform: rotateY(180deg);
        }

        .card-face {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background-size: cover;
          background-position: center;
          backface-visibility: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
        }

        .card-front {
          transform: rotateY(0deg);
        }

        .card-back {
          transform: rotateY(180deg);
        }

        @keyframes wobble {
          0% {
            transform: rotate(-3deg);
          }
          25% {
            transform: rotate(2deg);
          }
          50% {
            transform: rotate(-2deg);
          }
          75% {
            transform: rotate(3deg);
          }
          100% {
            transform: rotate(-3deg);
          }
        }
      `}</style>
    </div>
  )
}