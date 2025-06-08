import { useState, useLayoutEffect } from "react";
import styles from "./Ripple.module.css";
import { getRippleColor } from "../../../theme/rippleTheme";

/**
 * Componente Ripple con soporte para variantes de color
 * @param {string} variant - Variante de color (primary, secondary, light, dark, etc)
 * @param {string} color - Color personalizado (opcional, anula la variante)
 * @param {number} duration - Duración de la animación en ms
 */
function Ripple({ variant = "primary", color, duration = 850 }) {
  const [rippleArray, setRippleArray] = useState([]);

  // Determinar el color final (personalizado o de tema)
  const rippleColor = color || getRippleColor(variant);

  useLayoutEffect(() => {
    if (rippleArray.length > 0) {
      const timer = setTimeout(() => {
        setRippleArray([]);
      }, duration * 2);

      return () => clearTimeout(timer);
    }
  }, [rippleArray.length, duration]);

  const handleRipple = (event) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();

    const size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height;

    // Posición del clic relativa al contenedor
    const x = event.clientX - rippleContainer.left - size / 2;
    const y = event.clientY - rippleContainer.top - size / 2;

    // Crear nuevo ripple con posición, tamaño y tiempo
    const newRipple = {
      x,
      y,
      size,
      id: new Date().getTime(),
    };

    // Actualizar el array de ripples
    setRippleArray([...rippleArray, newRipple]);
  };

  return {
    handleRipple,
    ripples: rippleArray.map((ripple) => (
      <span
        key={ripple.id}
        className={styles.ripple}
        style={{
          top: ripple.y,
          left: ripple.x,
          width: ripple.size,
          height: ripple.size,
          background: rippleColor,
          animationDuration: `${duration}ms`,
        }}
      />
    )),
  };
}

export default Ripple;
