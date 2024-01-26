declare module '/wired-card' {
  // Define las propiedades y tipos necesarios para wired-card
  interface WiredCardProps {
    // Propiedades del componente, por ejemplo:
    title: string;
    content: string;
  }

  // Define el componente
  const WiredCard: React.FC<WiredCardProps>;

  // Exporta el componente
  export default WiredCard;
}