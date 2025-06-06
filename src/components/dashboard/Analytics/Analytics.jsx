import { useState } from "react";
import styles from "./Analytics.module.css";

function Analytics() {
  const [timeRange, setTimeRange] = useState("week");

  const handleRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.analyticsHeader}>
        <h2>Análisis de Rendimiento</h2>
        <div className={styles.timeFilter}>
          <label htmlFor="timeRange">Período: </label>
          <select id="timeRange" value={timeRange} onChange={handleRangeChange}>
            <option value="day">Hoy</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="year">Este año</option>
          </select>
        </div>
      </div>

      <div className={styles.chartsContainer}>
        <div className={styles.chartCard}>
          <h3>Citas por Servicio</h3>
          <div className={styles.chartPlaceholder}>
            <p>Gráfico de barras aquí</p>
            <div className={styles.mockChart}>
              <div className={styles.mockBar} style={{ height: "60px" }}></div>
              <div className={styles.mockBar} style={{ height: "80px" }}></div>
              <div className={styles.mockBar} style={{ height: "40px" }}></div>
              <div className={styles.mockBar} style={{ height: "90px" }}></div>
            </div>
          </div>
        </div>

        <div className={styles.chartCard}>
          <h3>Ingresos</h3>
          <div className={styles.chartPlaceholder}>
            <p>Gráfico de línea aquí</p>
            <div className={styles.mockLineChart}>
              <div className={styles.lineBase}>
                <div className={styles.linePoint} style={{ left: "0%" }}></div>
                <div className={styles.linePoint} style={{ left: "30%" }}></div>
                <div className={styles.linePoint} style={{ left: "60%" }}></div>
                <div
                  className={styles.linePoint}
                  style={{ left: "100%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.statsSummary}>
        <h3>
          Resumen de{" "}
          {timeRange === "day"
            ? "Hoy"
            : timeRange === "week"
            ? "Esta Semana"
            : timeRange === "month"
            ? "Este Mes"
            : "Este Año"}
        </h3>
        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <h4>Total Citas</h4>
            <p>
              {timeRange === "day"
                ? "8"
                : timeRange === "week"
                ? "32"
                : timeRange === "month"
                ? "125"
                : "1,450"}
            </p>
          </div>
          <div className={styles.statBox}>
            <h4>Ingresos</h4>
            <p>
              {timeRange === "day"
                ? "€480"
                : timeRange === "week"
                ? "€1,920"
                : timeRange === "month"
                ? "€7,500"
                : "€87,000"}
            </p>
          </div>
          <div className={styles.statBox}>
            <h4>Clientes Nuevos</h4>
            <p>
              {timeRange === "day"
                ? "2"
                : timeRange === "week"
                ? "8"
                : timeRange === "month"
                ? "25"
                : "290"}
            </p>
          </div>
          <div className={styles.statBox}>
            <h4>Tasa de Cancelación</h4>
            <p>
              {timeRange === "day"
                ? "5%"
                : timeRange === "week"
                ? "8%"
                : timeRange === "month"
                ? "10%"
                : "12%"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
