import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";

// Skapar schema för inputfälten
const stringSchema = z.string();
const numberSchema = z.number();

// Error meddelande för inputfälten om man skriver fel
const formSchema = z.object({
  name: z.string(),

  lastname: z.string(),

  adress: z
    .string()
    .min(2, { message: "Address must be at least 2 characters long" }),

  zipcode: z.coerce
    .number()
    .min(5, { message: "Zipcode must be at least 5 digits long" }),

  city: z
    .string()
    .min(2, { message: "City must be at least 2 characters long" }),

  email: z.string().email({ message: "Invalid email format" }),

  phone: z.coerce
    .number()
    .min(10, { message: "Phone number must be at least 10 digits long" }),
});

// Hantering av inputfält och formulärdata
export default function InputPayment() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    address: "",
    zipcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const router = useRouter();

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(true);

  // Hantera ändringar i inmatningsfälten
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  //Tillfällig if sats, ska vara context sen
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationResult = formSchema.safeParse(formData);
    // Om valideringen lyckas, fortsätt till confirmation sidan
    if (validationResult.success) {
      setIsFormValid(true);
      console.log("Form submitted successfully!");
    } else {
      // Om valideringen misslyckas, visa felmeddelanden
      setIsFormValid(false);
      const errors: Record<string, string> = {};
      validationResult.error.errors.forEach((error) => {
        errors[error.path[0]] = error.message;
      });
      setFormErrors(errors);
      console.log("Form submission failed:", errors);
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        padding: "20px",
        maxWidth: "500px",
        margin: "0 auto",
        marginBottom: "20px",
        marginTop: "20px",
      }}
    >
      {/* Rubrik och icon för inputfälten */}
      <Typography variant="h6" gutterBottom>
        <LocalShippingIcon sx={{ marginRight: "8px" }} />
        Shipping Address
      </Typography>

      <form data-cy="customer-form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {/* Input för namn */}
            <TextField
              data-cy="customer-name-error, customer-name"
              inputProps={{ "data-cy": "customer-name" }}
              error={!!formErrors["name"]}
              id="outlined-error"
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleInputChange}
              helperText={formErrors["name"] || ""}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            {/* Input för efternamn */}
            <TextField
              error={!!formErrors["lastname"]}
              id="outlined-error"
              name="lastname"
              label="Lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              helperText={formErrors["lastname"] || ""}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            {/* Input för address */}
            <TextField
              inputProps={{ "data-cy": "customer-address" }}
              data-cy="customer-address-error"
              id="filled-error"
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleInputChange}
              helperText={formErrors["address"] || ""}
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            {/* Input för zipcode */}
            <TextField
              data-cy="customer-zipcode-error"
              inputProps={{ "data-cy": "customer-zipcode" }}
              error={!!formErrors["zipcode"]}
              id="outlined-error-helper-text"
              name="zipcode"
              label="Zip"
              value={formData.zipcode}
              onChange={handleInputChange}
              helperText={formErrors["zipcode"] || ""}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            {/* Input för för stad */}
            <TextField
              data-cy="customer-city-error"
              inputProps={{ "data-cy": "customer-city" }}
              error={!!formErrors["city"]}
              id="filled-error-helper-text"
              name="city"
              label="City"
              value={formData.city}
              onChange={handleInputChange}
              helperText={formErrors["city"] || ""}
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            {/* Input för email */}
            <TextField
              data-cy="customer-email-error"
              inputProps={{ "data-cy": "customer-email" }}
              error={!!formErrors["email"]}
              id="standard-error"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleInputChange}
              helperText={formErrors["email"] || ""}
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            {/* Input för mobil */}
            <TextField
              data-cy="customer-phone-error"
              inputProps={{ "data-cy": "customer-phone" }}
              error={!!formErrors["phone"]}
              id="standard-error-helper-text"
              name="phone"
              label="Mobile"
              value={formData.phone}
              onChange={handleInputChange}
              helperText={formErrors["phone"] || ""}
              variant="standard"
              fullWidth
            />
          </Grid>
        </Grid>
        {/* -----Knapparna cancel och continue-------- */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button
            component={Link}
            href="/"
            variant="contained"
            color="primary"
            sx={{
              width: "30%",
              backgroundColor: "white",
              color: "black",
              "&:hover": {
                backgroundColor: "darkgrey",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            // component={Link}
            // href="/confirmation"
            // onClick={() => router.push("/confirmation")}
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              width: "30%",
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "darkgrey",
              },
            }}
          >
            Continue
          </Button>
        </Box>
      </form>
    </Box>
  );
}
