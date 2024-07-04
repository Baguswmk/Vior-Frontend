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
        zIndex: 1000,
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {role === "pembeli" && "Buyer"}
          {role === "desainer" && "Designer"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {role === "pembeli" && "A buyer can purchase products and browse available designs on our platform. Buyers do not have access to create new designs."}
          {role === "desainer" && "A designer can create creative designs for products and also browse other designs available on our platform. Designers have the ability to upload their own designs and collaborate with buyers."}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardOnHover;
