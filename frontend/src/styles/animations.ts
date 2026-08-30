import { keyframes } from 'styled-components'

/** O comprovante "sai da impressora": revela de cima para baixo. */
export const printOut = keyframes`
  from {
    clip-path: inset(0 0 100% 0);
    transform: translateY(-14px);
  }
  to {
    clip-path: inset(0 0 0 0);
    transform: translateY(0);
  }
`

export const riseIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

/** Carimbo batendo no papel: vem de cima, grande, e assenta torto. */
export const stampDown = keyframes`
  0% {
    opacity: 0;
    transform: rotate(-26deg) scale(2.6);
  }
  55% {
    opacity: 1;
    transform: rotate(-6deg) scale(0.92);
  }
  75% {
    transform: rotate(-9deg) scale(1.04);
  }
  100% {
    opacity: 1;
    transform: rotate(-8deg) scale(1);
  }
`

/** Sacode o papel no instante em que o carimbo bate. */
export const paperKick = keyframes`
  0%, 100% { transform: translate(0, 0); }
  22% { transform: translate(-2px, 2px); }
  44% { transform: translate(2px, -1px); }
  66% { transform: translate(-1px, 1px); }
`

export const blink = keyframes`
  0%, 45% { opacity: 1; }
  55%, 100% { opacity: 0.18; }
`

export const alertPulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
`

/** Varredura do leitor sobre o QR Code. */
export const scanSweep = keyframes`
  0% { transform: translateY(-110%); opacity: 0; }
  12% { opacity: 1; }
  88% { opacity: 1; }
  100% { transform: translateY(110%); opacity: 0; }
`

export const spin = keyframes`
  to { transform: rotate(360deg); }
`

export const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`
