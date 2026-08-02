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
    <div className="flex items-center justify-center py-10 sm:py-14 lg:py-20 px-4">
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
          /* Fixed 580x342.4px pehle sirf width shrink hone deta tha (screen
             chhoti hone par) lekin height wahi 342.4px reh jaati thi — isliye
             card "square" ban jaata tha aur front/back image crop ho jaati thi.
             Ab width fluid hai (100% up to 580px max) aur height CSS
             aspect-ratio se auto-derive hoti hai, so ratio hamesha 580:342.4
             (≈1.694) fixed rehta hai chahe screen kitni bhi chhoti ho. */
          width: 100%;
          max-width: 580px;
          aspect-ratio: 580 / 342.4;
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