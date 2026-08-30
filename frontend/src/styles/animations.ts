import { keyframes } from 'styled-components'

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

export const riseIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

/** Confirmacao: o selo assenta com um leve overshoot, sem estardalhaco. */
export const popIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.82);
  }
  60% {
    opacity: 1;
    transform: scale(1.04);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`

export const blink = keyframes`
  0%, 45% { opacity: 1; }
  55%, 100% { opacity: 0.2; }
`

/** Batimento discreto do indicador de consulta ao banco. */
export const softPulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
`

export const spin = keyframes`
  to { transform: rotate(360deg); }
`
