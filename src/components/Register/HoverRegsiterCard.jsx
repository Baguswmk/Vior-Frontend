import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const CardOnHover = ({ role, position, visible }) => {
  if (!visible) return null;

  return (
    <Card
      sx={{
        maxWidth: 345,
        position: "fixed",
        left: position.x,
        top: position.y,
        opacity: role ? 1 : 0,
        pointerEvents: "none", 
        transform: "translate(0, -100%)",
        transition: "opacity 0.3s",
        zIndex: 1000 
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {role === "pembeli" && "Pembeli"}
          {role === "desainer" && "Desainer"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {role === "pembeli" && "Seorang pembeli dapat melakukan pembelian produk dan melihat-lihat desain yang tersedia di platform kami. Pembeli tidak memiliki akses untuk membuat desain baru."}
          {role === "desainer" && "Seorang desainer dapat membuat desain kreatif untuk produk dan juga melihat-lihat desain lainnya yang ada di platform kami. Desainer memiliki kemampuan untuk mengunggah desain mereka sendiri dan berkolaborasi dengan pembeli."}
        </Typography>
      </CardContent>
    </Card>
  );
};



export default CardOnHover;
